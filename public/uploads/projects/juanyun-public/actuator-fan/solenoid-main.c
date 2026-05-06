/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2026 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */
/* Includes ------------------------------------------------------------------*/
#include "main.h"
#include "tim.h"
#include "usart.h"
#include "gpio.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include "valve.h"
#include "atk_oled.h"
#include "delay.h"
#include "atk_encoder.h"
#include "enc_btn.h"
#include "key.h"

#include <string.h>

/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define ENC_COUNTS_PER_STEP   4    // 旋钮一个“卡点”对应多少计数：常见 2 或 4，不对就改这里
#define ENC_DIR_SIGN          (+1) // 顺时针开度变大；如果实际反了就改成 (-1)

/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/

/* USER CODE BEGIN PV */

/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
static void OLED_ShowSplash_CirroTech(void)
{
    const char *s = "Cirro Tech";

    // 你这个库一般支持 12/16/24；24 基本就是最大号了
    uint8_t font = 24;

    // 字符宽度通常 = font/2（16->8像素，24->12像素）
    uint8_t char_w = font / 2;

    // 居中显示
    uint8_t x = (uint8_t)((128 - (uint8_t)strlen(s) * char_w) / 2);
    uint8_t y = (uint8_t)((64  - font) / 2);

    atk_oled_clear();
    atk_oled_show_string(x, y, (char*)s, font);
    atk_oled_refresh_gram();
}

static void format_u500(uint16_t u500, uint16_t *ip, uint16_t *frac)
{
    // u500: 0..500 => 0.0..100.0, step=0.2
    *ip   = u500 / 5;
    *frac = (u500 % 5) * 2; // 0,2,4,6,8
}

static void oled_draw_ui(uint16_t set_u500, uint16_t act_u500,
                         int has_m1, uint16_t m1_u500,
                         int has_m2, uint16_t m2_u500)
{
    uint16_t ip, frac;

    // Line1: SET: xxx.x%
    atk_oled_show_string(0, 0, "SET:", 16);
    format_u500(set_u500, &ip, &frac);
    atk_oled_show_num(40, 0, ip, 3, 16);
    atk_oled_show_char(40 + 3*8, 0, '.', 16, 1);
    atk_oled_show_num(40 + 3*8 + 8, 0, frac, 1, 16);
    atk_oled_show_char(40 + 3*8 + 16, 0, '%', 16, 1);

    // Line2: ACT: xxx.x%
    atk_oled_show_string(0, 16, "ACT:", 16);
    format_u500(act_u500, &ip, &frac);
    atk_oled_show_num(40, 16, ip, 3, 16);
    atk_oled_show_char(40 + 3*8, 16, '.', 16, 1);
    atk_oled_show_num(40 + 3*8 + 8, 16, frac, 1, 16);
    atk_oled_show_char(40 + 3*8 + 16, 16, '%', 16, 1);

    // Line3: M1: N/A or xxx.x%
    atk_oled_show_string(0, 32, "M1:", 16);
    if (!has_m1) {
        atk_oled_show_string(40, 32, "N/A   ", 16);
    } else {
        format_u500(m1_u500, &ip, &frac);
        atk_oled_show_num(40, 32, ip, 3, 16);
        atk_oled_show_char(40 + 3*8, 32, '.', 16, 1);
        atk_oled_show_num(40 + 3*8 + 8, 32, frac, 1, 16);
        atk_oled_show_char(40 + 3*8 + 16, 32, '%', 16, 1);
        atk_oled_show_string(40 + 3*8 + 24, 32, " ", 16);
    }

    // Line4: M2
    atk_oled_show_string(0, 48, "M2:", 16);
    if (!has_m2) {
        atk_oled_show_string(40, 48, "N/A   ", 16);
    } else {
        format_u500(m2_u500, &ip, &frac);
        atk_oled_show_num(40, 48, ip, 3, 16);
        atk_oled_show_char(40 + 3*8, 48, '.', 16, 1);
        atk_oled_show_num(40 + 3*8 + 8, 48, frac, 1, 16);
        atk_oled_show_char(40 + 3*8 + 16, 48, '%', 16, 1);
        atk_oled_show_string(40 + 3*8 + 24, 48, " ", 16);
    }
}

/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{

  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */
  delay_init(HAL_RCC_GetHCLKFreq() / 1000000);

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_USART1_UART_Init();
  //MX_TIM3_Init();
  /* USER CODE BEGIN 2 */

  // OLED
  atk_oled_init();
  // 上电先显示 Cirro Tech
  OLED_ShowSplash_CirroTech();

  // 编码器（TIM3, PA6/PA7）+ 旋钮按键（PA5）
  atk_encoder_timx_init(0xFFFF, 0);
  atk_encoder_key_init();
  enc_btn_init();

  // K1/K2
  Key_Init();

  // 阀门
  Valve_Init(70);              // 提高响应速度（30~90）
  Valve_SetFullOpenSteps(530);
  Valve_HomeBlocking();

  // Home 完成后：清屏并绘制四行 UI
  atk_oled_clear();

  uint16_t set_u500 = 0;      // 旋钮设定值
  uint16_t act_u500 = 0;      // 阀门实际值（你用 blocking 到位后就等于设定值）
  uint16_t m1_u500 = 0, m2_u500 = 0;
  int has_m1 = 0, has_m2 = 0;

  int32_t last_cnt = atk_encoder_get_count();
  int32_t acc = 0;

  uint8_t ui_dirty = 1;
  uint32_t last_refresh = 0;

  oled_draw_ui(set_u500, act_u500, has_m1, m1_u500, has_m2, m2_u500);
  atk_oled_refresh_gram();

  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
	  // ===== 1) 旋钮：只改 set_u500（不驱动阀）=====
	      int32_t cnt = atk_encoder_get_count();
	      int32_t diff = cnt - last_cnt;
	      last_cnt = cnt;

	      if (diff != 0) {
	          acc += diff * ENC_DIR_SIGN;

	          while (acc >= ENC_COUNTS_PER_STEP) {
	              acc -= ENC_COUNTS_PER_STEP;
	              if (set_u500 < 500) set_u500++;
	              ui_dirty = 1;
	          }
	          while (acc <= -ENC_COUNTS_PER_STEP) {
	              acc += ENC_COUNTS_PER_STEP;
	              if (set_u500 > 0) set_u500--;
	              ui_dirty = 1;
	          }
	      }

	      // ===== 2) 编码器按键：单击执行 / 双击归零（软归零+30）=====
	      enc_btn_evt_t evt = enc_btn_scan();

	      if (evt == ENC_BTN_EVT_SHORT)
	      {
	          // 短按：执行到 SET
	          Valve_MoveToUnit500Blocking(set_u500);
	          act_u500 = set_u500;

	          // 执行期间编码器计数可能积累，回来后重置基线避免跳变
	          acc = 0;
	          last_cnt = atk_encoder_get_count();

	          ui_dirty = 1;
	      }
	      else if (evt == ENC_BTN_EVT_LONG)
	      {
	          // 长按：归零（软归零：回 act_u500 + 额外30 pulse）
	          Valve_SoftHomeByU500Blocking(act_u500, 30);

	          set_u500 = 0;
	          act_u500 = 0;

	          acc = 0;
	          last_cnt = atk_encoder_get_count();

	          ui_dirty = 1;
	      }

	      // ===== 3) K1/K2：短按记录 SET，长按跳转并执行（阀门转到该值）=====
	      Key_Task();
	      for (;;)
	      {
	          key_event_t e = Key_GetEvent();
	          if (e == KEY_EVT_NONE) break;

	          if (e == KEY_EVT_K1_SHORT) {
	              // 记录你当前“设定值”SET；如果你想记录实际值 ACT，把 set_u500 改成 act_u500
	              has_m1 = 1;
	              m1_u500 = set_u500;
	              ui_dirty = 1;
	          }
	          else if (e == KEY_EVT_K2_SHORT) {
	              has_m2 = 1;
	              m2_u500 = set_u500;
	              ui_dirty = 1;
	          }
	          else if (e == KEY_EVT_K1_LONG) {
	              if (has_m1) {
	                  set_u500 = m1_u500;                 // 旋钮状态跟随
	                  ui_dirty = 1;

	                  // 执行到该设定值（阻塞是允许的，因为这是你主动触发的“跳转”）
	                  Valve_MoveToUnit500Blocking(set_u500);
	                  act_u500 = set_u500;

	                  // 执行期间编码器计数可能积累，回来后重置基线避免跳变
	                  acc = 0;
	                  last_cnt = atk_encoder_get_count();

	                  ui_dirty = 1;
	              }
	          }
	          else if (e == KEY_EVT_K2_LONG) {
	              if (has_m2) {
	                  set_u500 = m2_u500;
	                  ui_dirty = 1;

	                  Valve_MoveToUnit500Blocking(set_u500);
	                  act_u500 = set_u500;

	                  acc = 0;
	                  last_cnt = atk_encoder_get_count();

	                  ui_dirty = 1;
	              }
	          }
	      }

	      // ===== 4) OLED：限频刷新（避免刷屏卡主循环）=====
	      uint32_t now = HAL_GetTick();
	      if (ui_dirty && (now - last_refresh) >= 30) { // 30ms 一次
	          oled_draw_ui(set_u500, act_u500, has_m1, m1_u500, has_m2, m2_u500);
	          atk_oled_refresh_gram();
	          last_refresh = now;
	          ui_dirty = 0;
	      }

	      delay_ms(2);

    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
  RCC_OscInitStruct.HSEState = RCC_HSE_ON;
  RCC_OscInitStruct.HSEPredivValue = RCC_HSE_PREDIV_DIV1;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
  RCC_OscInitStruct.PLL.PLLMUL = RCC_PLL_MUL9;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV2;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_2) != HAL_OK)
  {
    Error_Handler();
  }
}

/* USER CODE BEGIN 4 */

/* USER CODE END 4 */

/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}
#ifdef USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */
