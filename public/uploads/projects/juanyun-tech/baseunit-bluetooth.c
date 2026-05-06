#include "bluetooth.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

static UART_HandleTypeDef *s_huart = NULL;
static volatile uint8_t s_tx_busy = 0;
static uint8_t s_tx_buf[96];
static uint8_t s_pending_buf[96];
static uint16_t s_pending_len = 0;
static volatile uint8_t s_pending_valid = 0;

static uint32_t bt_lock(void)
{
    uint32_t primask = __get_PRIMASK();
    __disable_irq();
    return primask;
}

static void bt_unlock(uint32_t primask)
{
    if (primask == 0U) {
        __enable_irq();
    }
}

static void ftoa_1(char *buf, size_t n, float x)
{
    int32_t v = (int32_t)(x * 10.0f + (x >= 0 ? 0.5f : -0.5f));
    int32_t ip = v / 10;
    int32_t fp = llabs((long long)(v % 10));
    snprintf(buf, n, "%ld.%ld", (long)ip, (long)fp);
}

static uint16_t bt_clip_len(int n)
{
    if (n <= 0) return 0;
    if (n >= (int)sizeof(s_tx_buf)) return (uint16_t)(sizeof(s_tx_buf) - 1U);
    return (uint16_t)n;
}

static void bt_try_start_dma(void)
{
    if (s_huart == NULL) return;

    uint16_t len = 0;
    uint32_t key = bt_lock();
    if (!s_tx_busy && s_pending_valid) {
        len = s_pending_len;
        memcpy(s_tx_buf, s_pending_buf, len);
        s_pending_valid = 0;
        s_tx_busy = 1;
    }
    bt_unlock(key);

    if (len == 0) return;

    if (HAL_UART_Transmit_DMA(s_huart, s_tx_buf, len) != HAL_OK) {
        key = bt_lock();
        s_tx_busy = 0;
        memcpy(s_pending_buf, s_tx_buf, len);
        s_pending_len = len;
        s_pending_valid = 1;
        bt_unlock(key);
    }
}

void BT_Init(UART_HandleTypeDef *huart)
{
    s_huart = huart;
    s_tx_busy = 0;
    s_pending_valid = 0;
    s_pending_len = 0;
}

void BT_Report(float envT, float envH, float outT, float outH, uint8_t fan)
{
    (void)envH;
    (void)outH;

    char t1[16], t2[16];
    ftoa_1(t1, sizeof(t1), envT);
    ftoa_1(t2, sizeof(t2), outT);

    char line[96];
    int n = snprintf(line, sizeof(line),
                     "DATA:%s,%s,%u\r\n",
                     t1, t2, fan);

    uint16_t tx_len = bt_clip_len(n);
    if (tx_len == 0) return;

    uint32_t key = bt_lock();
    memcpy(s_pending_buf, line, tx_len);
    s_pending_len = tx_len;
    s_pending_valid = 1;
    bt_unlock(key);

    bt_try_start_dma();
}

void HAL_UART_TxCpltCallback(UART_HandleTypeDef *huart)
{
    if (huart != s_huart) return;

    uint32_t key = bt_lock();
    s_tx_busy = 0;
    bt_unlock(key);

    bt_try_start_dma();
}

void HAL_UART_ErrorCallback(UART_HandleTypeDef *huart)
{
    if (huart != s_huart) return;

    uint32_t key = bt_lock();
    s_tx_busy = 0;
    bt_unlock(key);

    bt_try_start_dma();
}
