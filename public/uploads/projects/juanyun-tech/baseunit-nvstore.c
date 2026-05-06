#include "nvstore.h"
#include "stm32f1xx_hal.h"
#include <stddef.h>

extern uint32_t __nvm_flash_start__;
extern uint32_t __nvm_flash_end__;

#define NVM_PAGE_SIZE_BYTES      1024U
#define NVM_PAGE_COUNT           2U
#define NVM_PAGE_HEADER_WORDS    4U
#define NVM_PAGE_HEADER_SIZE     (NVM_PAGE_HEADER_WORDS * 4U)
#define NVM_ENTRY_SIZE           16U

#define NVM_ERASED_WORD          0xFFFFFFFFUL
#define NVM_PAGE_MAGIC           0x4E564D31UL /* "NVM1" */
#define NVM_PAGE_COMMIT          0xC0DEC0DEUL
#define NVM_ENTRY_COMMIT         0xA55AA55AUL
#define NVM_VALUE_TAG            0x5AA50000UL

typedef struct {
    uint8_t valid;
    uint32_t page_seq;
    uint32_t start;
    uint32_t end;
    uint32_t next_addr;
    uint8_t has_entry;
    uint32_t last_entry_seq;
    uint8_t last_fan;
} NvmPageInfo;

static NvmPageInfo s_pages[NVM_PAGE_COUNT];
static uint8_t s_ready = 0;
static uint8_t s_active_page = 0;
static uint8_t s_last_valid = 0;
static uint8_t s_last_fan = 0;
static uint32_t s_last_seq = 0;

static uint32_t nvm_crc32_bytes(const uint8_t *data, size_t len)
{
    uint32_t crc = 0xFFFFFFFFUL;
    for (size_t i = 0; i < len; i++) {
        crc ^= data[i];
        for (int j = 0; j < 8; j++) {
            uint32_t mask = (uint32_t)(-(int32_t)(crc & 1UL));
            crc = (crc >> 1) ^ (0xEDB88320UL & mask);
        }
    }
    return ~crc;
}

static uint32_t nvm_crc32_words2(uint32_t w0, uint32_t w1)
{
    uint32_t words[2] = {w0, w1};
    return nvm_crc32_bytes((const uint8_t *)words, sizeof(words));
}

static inline uint32_t nvm_rd32(uint32_t addr)
{
    return *(volatile const uint32_t *)addr;
}

static bool nvm_prog_word(uint32_t addr, uint32_t data)
{
    if (HAL_FLASH_Program(FLASH_TYPEPROGRAM_WORD, addr, data) != HAL_OK) {
        return false;
    }
    return nvm_rd32(addr) == data;
}

static bool nvm_erase_page(uint32_t addr)
{
    FLASH_EraseInitTypeDef erase = {0};
    uint32_t page_error = 0;
    erase.TypeErase = FLASH_TYPEERASE_PAGES;
    erase.PageAddress = addr;
    erase.NbPages = 1;
    if (HAL_FLASHEx_Erase(&erase, &page_error) != HAL_OK) {
        return false;
    }
    return (nvm_rd32(addr) == NVM_ERASED_WORD);
}

static uint32_t nvm_make_payload(uint8_t fan)
{
    uint32_t inv = (uint32_t)((uint8_t)~fan);
    return NVM_VALUE_TAG | (inv << 8) | fan;
}

static bool nvm_parse_payload(uint32_t payload, uint8_t *fan)
{
    if ((payload & 0xFFFF0000UL) != NVM_VALUE_TAG) return false;
    uint8_t v = (uint8_t)(payload & 0xFFU);
    uint8_t inv = (uint8_t)((payload >> 8) & 0xFFU);
    if ((uint8_t)~v != inv) return false;
    if (v > 100U) return false;
    *fan = v;
    return true;
}

static bool nvm_header_is_valid(uint32_t base, uint32_t *page_seq)
{
    uint32_t magic = nvm_rd32(base + 0U);
    uint32_t seq = nvm_rd32(base + 4U);
    uint32_t crc = nvm_rd32(base + 8U);
    uint32_t commit = nvm_rd32(base + 12U);
    if (magic != NVM_PAGE_MAGIC) return false;
    if (commit != NVM_PAGE_COMMIT) return false;
    if (crc != nvm_crc32_words2(magic, seq)) return false;
    *page_seq = seq;
    return true;
}

static void nvm_scan_page(NvmPageInfo *pi)
{
    pi->valid = 0;
    pi->has_entry = 0;
    pi->last_entry_seq = 0;
    pi->last_fan = 0;
    pi->next_addr = pi->start + NVM_PAGE_HEADER_SIZE;

    uint32_t seq = 0;
    if (!nvm_header_is_valid(pi->start, &seq)) {
        return;
    }
    pi->valid = 1;
    pi->page_seq = seq;

    uint32_t addr = pi->start + NVM_PAGE_HEADER_SIZE;
    while ((addr + NVM_ENTRY_SIZE) <= pi->end) {
        uint32_t commit = nvm_rd32(addr + 12U);
        if (commit == NVM_ERASED_WORD) {
            pi->next_addr = addr;
            return;
        }
        if (commit != NVM_ENTRY_COMMIT) {
            pi->next_addr = addr;
            return;
        }

        uint32_t entry_seq = nvm_rd32(addr + 0U);
        uint32_t payload = nvm_rd32(addr + 4U);
        uint32_t crc = nvm_rd32(addr + 8U);
        uint8_t fan = 0;

        if ((crc == nvm_crc32_words2(entry_seq, payload)) &&
            nvm_parse_payload(payload, &fan)) {
            if (!pi->has_entry || entry_seq > pi->last_entry_seq) {
                pi->has_entry = 1;
                pi->last_entry_seq = entry_seq;
                pi->last_fan = fan;
            }
        }
        addr += NVM_ENTRY_SIZE;
    }
    pi->next_addr = pi->end;
}

static bool nvm_page_has_room(const NvmPageInfo *pi)
{
    return (pi->next_addr + NVM_ENTRY_SIZE) <= pi->end;
}

static bool nvm_write_page_header(uint32_t page_addr, uint32_t page_seq)
{
    uint32_t crc = nvm_crc32_words2(NVM_PAGE_MAGIC, page_seq);
    if (!nvm_prog_word(page_addr + 0U, NVM_PAGE_MAGIC)) return false;
    if (!nvm_prog_word(page_addr + 4U, page_seq)) return false;
    if (!nvm_prog_word(page_addr + 8U, crc)) return false;
    if (!nvm_prog_word(page_addr + 12U, NVM_PAGE_COMMIT)) return false;
    return true;
}

static bool nvm_write_entry(uint32_t addr, uint32_t entry_seq, uint8_t fan)
{
    uint32_t payload = nvm_make_payload(fan);
    uint32_t crc = nvm_crc32_words2(entry_seq, payload);

    if (!nvm_prog_word(addr + 0U, entry_seq)) return false;
    if (!nvm_prog_word(addr + 4U, payload)) return false;
    if (!nvm_prog_word(addr + 8U, crc)) return false;
    if (!nvm_prog_word(addr + 12U, NVM_ENTRY_COMMIT)) return false;
    return true;
}

static void nvm_rebuild_state_from_scan(void)
{
    s_last_valid = 0;
    s_last_seq = 0;
    s_last_fan = 0;

    uint8_t have_active = 0;
    for (uint8_t i = 0; i < NVM_PAGE_COUNT; i++) {
        if (s_pages[i].valid) {
            if (!have_active || s_pages[i].page_seq > s_pages[s_active_page].page_seq) {
                s_active_page = i;
                have_active = 1;
            }
        }
        if (s_pages[i].has_entry) {
            if (!s_last_valid || s_pages[i].last_entry_seq > s_last_seq) {
                s_last_valid = 1;
                s_last_seq = s_pages[i].last_entry_seq;
                s_last_fan = s_pages[i].last_fan;
            }
        }
    }
    if (!have_active) {
        s_active_page = 0;
    }
}

bool NVM_Init(void)
{
    uint32_t nvm_start = (uint32_t)&__nvm_flash_start__;
    uint32_t nvm_end = (uint32_t)&__nvm_flash_end__;
    if ((nvm_end - nvm_start) < (NVM_PAGE_SIZE_BYTES * NVM_PAGE_COUNT)) {
        s_ready = 0;
        return false;
    }

    s_pages[0].start = nvm_start;
    s_pages[0].end = nvm_start + NVM_PAGE_SIZE_BYTES;
    s_pages[1].start = nvm_start + NVM_PAGE_SIZE_BYTES;
    s_pages[1].end = nvm_start + NVM_PAGE_SIZE_BYTES * 2U;

    nvm_scan_page(&s_pages[0]);
    nvm_scan_page(&s_pages[1]);
    nvm_rebuild_state_from_scan();

    if (!s_pages[0].valid && !s_pages[1].valid) {
        if (HAL_FLASH_Unlock() != HAL_OK) return false;
        bool ok = nvm_erase_page(s_pages[0].start) &&
                  nvm_erase_page(s_pages[1].start) &&
                  nvm_write_page_header(s_pages[0].start, 1U);
        (void)HAL_FLASH_Lock();
        if (!ok) {
            s_ready = 0;
            return false;
        }

        nvm_scan_page(&s_pages[0]);
        nvm_scan_page(&s_pages[1]);
        nvm_rebuild_state_from_scan();
    }

    s_ready = 1;
    return true;
}

bool NVM_LoadFanSet(uint8_t *fan_set)
{
    if (fan_set == NULL) return false;
    if (!s_ready && !NVM_Init()) return false;
    if (!s_last_valid) return false;
    *fan_set = s_last_fan;
    return true;
}

bool NVM_SaveFanSet(uint8_t fan_set)
{
    if (fan_set > 100U) fan_set = 100U;
    if (!s_ready && !NVM_Init()) return false;

    if (s_last_valid && (s_last_fan == fan_set)) {
        return true;
    }

    uint32_t new_seq = s_last_valid ? (s_last_seq + 1U) : 1U;
    uint8_t active = s_active_page;
    uint8_t target = (uint8_t)(1U - active);
    bool need_transfer = !nvm_page_has_room(&s_pages[active]);

    if (HAL_FLASH_Unlock() != HAL_OK) {
        return false;
    }

    bool ok = true;

    if (!need_transfer) {
        ok = nvm_write_entry(s_pages[active].next_addr, new_seq, fan_set);
        if (ok) {
            s_pages[active].next_addr += NVM_ENTRY_SIZE;
        }
    } else {
        uint32_t new_page_seq = s_pages[active].page_seq + 1U;
        ok = nvm_erase_page(s_pages[target].start) &&
             nvm_write_page_header(s_pages[target].start, new_page_seq);
        if (ok) {
            s_pages[target].valid = 1;
            s_pages[target].page_seq = new_page_seq;
            s_pages[target].has_entry = 0;
            s_pages[target].next_addr = s_pages[target].start + NVM_PAGE_HEADER_SIZE;

            ok = nvm_write_entry(s_pages[target].next_addr, new_seq, fan_set);
            if (ok) {
                s_pages[target].has_entry = 1;
                s_pages[target].last_entry_seq = new_seq;
                s_pages[target].last_fan = fan_set;
                s_pages[target].next_addr += NVM_ENTRY_SIZE;

                (void)nvm_erase_page(s_pages[active].start);
                s_pages[active].valid = 0;
                s_pages[active].has_entry = 0;
                s_pages[active].next_addr = s_pages[active].start + NVM_PAGE_HEADER_SIZE;
                s_active_page = target;
            }
        }
    }

    (void)HAL_FLASH_Lock();

    if (!ok) {
        return false;
    }

    s_last_valid = 1;
    s_last_fan = fan_set;
    s_last_seq = new_seq;
    if (s_pages[s_active_page].has_entry == 0) {
        s_pages[s_active_page].has_entry = 1;
    }
    s_pages[s_active_page].last_entry_seq = new_seq;
    s_pages[s_active_page].last_fan = fan_set;
    return true;
}

