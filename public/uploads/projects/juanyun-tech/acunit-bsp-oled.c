#include "bsp_oled.h"
#include <string.h>

extern I2C_HandleTypeDef hi2c1;

#define OLED_I2C_ADDR   (0x3C << 1)
#define OLED_WIDTH      128
#define OLED_HEIGHT     64

static uint8_t oled_buf[OLED_WIDTH * OLED_HEIGHT / 8];
static uint8_t oled_tx_page[129];
static char oled_line_cache[4][24];
static uint8_t oled_cache_valid = 0U;

typedef struct
{
    char c;
    uint8_t d[5];
} font5x7_t;

/* 只放当前 UI 用得到的普通英文/数字/符号。
   小写字母会自动转大写。 */
static const font5x7_t font_table[] =
{
    {' ', {0x00,0x00,0x00,0x00,0x00}},
    {'%', {0x63,0x13,0x08,0x64,0x63}},
    {'-', {0x08,0x08,0x08,0x08,0x08}},
    {'.', {0x00,0x60,0x60,0x00,0x00}},
    {'/', {0x20,0x10,0x08,0x04,0x02}},
    {'0', {0x3E,0x51,0x49,0x45,0x3E}},
    {'1', {0x00,0x42,0x7F,0x40,0x00}},
    {'2', {0x42,0x61,0x51,0x49,0x46}},
    {'3', {0x21,0x41,0x45,0x4B,0x31}},
    {'4', {0x18,0x14,0x12,0x7F,0x10}},
    {'5', {0x27,0x45,0x45,0x45,0x39}},
    {'6', {0x3C,0x4A,0x49,0x49,0x30}},
    {'7', {0x01,0x71,0x09,0x05,0x03}},
    {'8', {0x36,0x49,0x49,0x49,0x36}},
    {'9', {0x06,0x49,0x49,0x29,0x1E}},
    {':', {0x00,0x36,0x36,0x00,0x00}},
    {'>', {0x08,0x14,0x22,0x41,0x00}},
    {'A', {0x7E,0x11,0x11,0x11,0x7E}},
    {'B', {0x7F,0x49,0x49,0x49,0x36}},
    {'C', {0x3E,0x41,0x41,0x41,0x22}},
    {'D', {0x7F,0x41,0x41,0x22,0x1C}},
    {'E', {0x7F,0x49,0x49,0x49,0x41}},
    {'F', {0x7F,0x09,0x09,0x09,0x01}},
    {'G', {0x3E,0x41,0x49,0x49,0x7A}},
    {'H', {0x7F,0x08,0x08,0x08,0x7F}},
    {'I', {0x00,0x41,0x7F,0x41,0x00}},
    {'J', {0x20,0x40,0x41,0x3F,0x01}},
    {'K', {0x7F,0x08,0x14,0x22,0x41}},
    {'L', {0x7F,0x40,0x40,0x40,0x40}},
    {'M', {0x7F,0x02,0x04,0x02,0x7F}},
    {'N', {0x7F,0x04,0x08,0x10,0x7F}},
    {'O', {0x3E,0x41,0x41,0x41,0x3E}},
    {'P', {0x7F,0x09,0x09,0x09,0x06}},
    {'Q', {0x3E,0x41,0x51,0x21,0x5E}},
    {'R', {0x7F,0x09,0x19,0x29,0x46}},
    {'S', {0x46,0x49,0x49,0x49,0x31}},
    {'T', {0x01,0x01,0x7F,0x01,0x01}},
    {'U', {0x3F,0x40,0x40,0x40,0x3F}},
    {'V', {0x1F,0x20,0x40,0x20,0x1F}},
    {'W', {0x3F,0x40,0x38,0x40,0x3F}},
    {'X', {0x63,0x14,0x08,0x14,0x63}},
    {'Y', {0x07,0x08,0x70,0x08,0x07}},
    {'Z', {0x61,0x51,0x49,0x45,0x43}},
};

static const uint8_t blank_glyph[5] = {0,0,0,0,0};

static const uint8_t* font_get(char ch)
{
    if (ch >= 'a' && ch <= 'z')
    {
        ch = (char)(ch - 'a' + 'A');
    }

    for (uint32_t i = 0; i < sizeof(font_table)/sizeof(font_table[0]); i++)
    {
        if (font_table[i].c == ch)
        {
            return font_table[i].d;
        }
    }

    return blank_glyph;
}

static void oled_write_cmd(uint8_t cmd)
{
    uint8_t buf[2];
    buf[0] = 0x00;
    buf[1] = cmd;
    HAL_I2C_Master_Transmit(&hi2c1, OLED_I2C_ADDR, buf, 2, HAL_MAX_DELAY);
}

static void oled_write_data_page(uint8_t page, const uint8_t *data)
{
    oled_tx_page[0] = 0x40;
    memcpy(&oled_tx_page[1], data, 128);
    HAL_I2C_Master_Transmit(&hi2c1, OLED_I2C_ADDR, oled_tx_page, 129, HAL_MAX_DELAY);
    (void)page;
}

static uint8_t oled_copy_line_if_changed(char *cache, const char *src)
{
    uint32_t i = 0U;
    uint8_t changed = 0U;

    while (i < 23U)
    {
        char ch = src[i];

        if (cache[i] != ch)
        {
            cache[i] = ch;
            changed = 1U;
        }

        if (ch == '\0')
        {
            return changed;
        }

        i++;
    }

    if (cache[23] != '\0')
    {
        cache[23] = '\0';
        changed = 1U;
    }

    return changed;
}

void BSP_OLED_Init(void)
{
    HAL_Delay(50);
    memset(oled_line_cache, 0, sizeof(oled_line_cache));
    oled_cache_valid = 0U;

    oled_write_cmd(0xAE); // display off
    oled_write_cmd(0x20); // memory mode
    oled_write_cmd(0x00); // horizontal addressing
    oled_write_cmd(0xB0);
    oled_write_cmd(0xC8);
    oled_write_cmd(0x00);
    oled_write_cmd(0x10);
    oled_write_cmd(0x40);
    oled_write_cmd(0x81);
    oled_write_cmd(0x7F);
    oled_write_cmd(0xA1);
    oled_write_cmd(0xA6);
    oled_write_cmd(0xA8);
    oled_write_cmd(0x3F);
    oled_write_cmd(0xA4);
    oled_write_cmd(0xD3);
    oled_write_cmd(0x00);
    oled_write_cmd(0xD5);
    oled_write_cmd(0x80);
    oled_write_cmd(0xD9);
    oled_write_cmd(0xF1);
    oled_write_cmd(0xDA);
    oled_write_cmd(0x12);
    oled_write_cmd(0xDB);
    oled_write_cmd(0x20);
    oled_write_cmd(0x8D);
    oled_write_cmd(0x14);
    oled_write_cmd(0xAF); // display on

    BSP_OLED_Clear();
    BSP_OLED_Update();
}

void BSP_OLED_Clear(void)
{
    memset(oled_buf, 0, sizeof(oled_buf));
}

void BSP_OLED_DrawPixel(uint8_t x, uint8_t y, uint8_t color)
{
    if (x >= OLED_WIDTH || y >= OLED_HEIGHT) return;

    if (color)
    {
        oled_buf[x + (y / 8) * OLED_WIDTH] |= (1U << (y % 8));
    }
    else
    {
        oled_buf[x + (y / 8) * OLED_WIDTH] &= ~(1U << (y % 8));
    }
}

void BSP_OLED_DrawChar(uint8_t x, uint8_t y, char ch)
{
    const uint8_t *glyph = font_get(ch);

    for (uint8_t col = 0; col < 5; col++)
    {
        for (uint8_t row = 0; row < 7; row++)
        {
            uint8_t pixel = (glyph[col] >> row) & 0x01U;
            BSP_OLED_DrawPixel(x + col, y + row, pixel);
        }
    }

    for (uint8_t row = 0; row < 7; row++)
    {
        BSP_OLED_DrawPixel(x + 5, y + row, 0);
    }
}

void BSP_OLED_DrawString(uint8_t x, uint8_t y, const char *str)
{
    while (*str)
    {
        BSP_OLED_DrawChar(x, y, *str++);
        x += 6;
        if (x > 122) break;
    }
}

void BSP_OLED_Update(void)
{
    for (uint8_t page = 0; page < 8; page++)
    {
        oled_write_cmd((uint8_t)(0xB0 + page));
        oled_write_cmd(0x00);
        oled_write_cmd(0x10);
        oled_write_data_page(page, &oled_buf[OLED_WIDTH * page]);
    }
}

void BSP_OLED_Draw4Lines(const char *l0, const char *l1, const char *l2, const char *l3)
{
    uint8_t changed = 0U;

    if (oled_cache_valid)
    {
        changed |= oled_copy_line_if_changed(oled_line_cache[0], l0);
        changed |= oled_copy_line_if_changed(oled_line_cache[1], l1);
        changed |= oled_copy_line_if_changed(oled_line_cache[2], l2);
        changed |= oled_copy_line_if_changed(oled_line_cache[3], l3);

        if (!changed)
        {
            return;
        }
    }
    else
    {
        oled_copy_line_if_changed(oled_line_cache[0], l0);
        oled_copy_line_if_changed(oled_line_cache[1], l1);
        oled_copy_line_if_changed(oled_line_cache[2], l2);
        oled_copy_line_if_changed(oled_line_cache[3], l3);
        oled_cache_valid = 1U;
    }

    BSP_OLED_Clear();
    BSP_OLED_DrawString(0,  0, l0);
    BSP_OLED_DrawString(0, 16, l1);
    BSP_OLED_DrawString(0, 32, l2);
    BSP_OLED_DrawString(0, 48, l3);
    BSP_OLED_Update();
}
