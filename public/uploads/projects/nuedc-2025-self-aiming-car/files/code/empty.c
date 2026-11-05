/*
 * Copyright (c) 2021, Texas Instruments Incorporated
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * *  Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * *  Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * *  Neither the name of Texas Instruments Incorporated nor the names of
 *    its contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#include "ti_msp_dl_config.h"

#include "bsp_debugtimer.h"
#include "bsp_systick.h"
#include "bsp_oled.h"
#include "bsp_siic.h"
#include "balance.h"
#include "bsp_printf.h"

//#include "bluetooth.h"
#include "show.h"
#include "MPU6050.h"
//extern uint8_t Flag_Stop;
extern int Turn1;
extern int Velocity1;
//编码器全局变量
volatile short g_EncoderACount = 0;
volatile short g_EncoderBCount = 0;
int x=0,y=0,gy=0;
//用于检查 5ms 任务频率是否正确
pRtosDebugInterface_t mainTaskFreqCheck = &RTOSTaskDebug;
RtosDebugPrivateVar mainFreqPriv = { 0 };
uint8_t mainTaskFreq = 0;
float xunji(void);
int xuanti=1;
float m6050init=0;
//用于检查 5ms 任务总体运行的时间
RtosDebugPrivateVar mainUseTimePriv = { 0 };
float mainTaskUseTime = 0;
int i=0,KEY0=1,HD0=0,HD1=0,HD2=0,HD3=0,HD4=0,HD5=0,HD6=0,HD7=0,fx=0,state6050=0;
	int time=0;  
int main(void)
{
    SYSCFG_DL_init();

    //启动调试定时器,可用于检查代码执行频率,检查代码执行时间等
    DL_TimerG_startCounter(DebugTimer_INST);
  
    //OLED初始化
    pOLEDInterface_t oled = &UserOLED;
    oled->init();

	//硬件iic初始化
	pIICInterface_t siic = &User_sIICDev;
	siic->init();

	//蓝牙串口初始化
//	BT_DAMConfig();
         
	//串口1调试中断
		NVIC_ClearPendingIRQ(UART_0_INST_INT_IRQN);
	  NVIC_EnableIRQ(UART_0_INST_INT_IRQN);
	
	  NVIC_ClearPendingIRQ(UART_2_INST_INT_IRQN);
    NVIC_EnableIRQ(UART_2_INST_INT_IRQN);
	//启动PWM定时器
	DL_TimerA_startCounter(PWM_0_INST);

	//使能编码器中断+MPU6050中断
	NVIC_EnableIRQ(Encoder1_INT_IRQN);
	NVIC_EnableIRQ(GPIO_MULTIPLE_GPIOA_INT_IRQN);
	
	//启动ADC中断
	NVIC_EnableIRQ(ADC12_0_INST_INT_IRQN);

	oled->ShowString(0,0,"dmp init...");
	oled->RefreshGram();

	//使用软件iic时,dmp读取速率不够,将会影响编码器中断
	MPU6050_initialize();           //MPU6050初始化	
	DMP_Init();                     //初始化DMP 	
	oled->Clear();

	uint32_t LEDTick = 0;
		Turn1=0;
Velocity1=0;

while (1) {

		//蓝牙数据解析处理
//		BTBufferHandler();
//OLED显示
	if((xuanti==1||xuanti==2||xuanti==3||xuanti==4||xuanti==5)&&Flag_Stop == 0)
	{
		Turn1=-1+xunji();
		Velocity1=8 ;
	}
	if(time>1000 && state6050==0)
	{
		state6050=1;
		m6050init=mpu6050.yaw;
	}
			
			
        //100ms翻转LED,检测系统是否正常运行
		if( ((LEDTick-Systick_getTick())&SysTickMAX_COUNT) >= SysTick_MS(100))
		{
			HD6=DL_GPIO_readPins(GPIO_GRP_0_HDPIN_6_PORT, GPIO_GRP_0_HDPIN_6_PIN);
			time++;
			
			KEY0=DL_GPIO_readPins(GPIO_GRP_0_KEY0_PORT, GPIO_GRP_0_KEY0_PIN);
			oled_show();
//			LEDTick = Systick_getTick();
			DL_GPIO_togglePins(LED_PORT,LED_UserLED_PIN);
		}
				if(HD6!=0)Flag_Stop = 0,delay_ms(1000);
        if(KEY0==0)xuanti++,delay_ms(1000);
				if(xuanti>5)xuanti=1;
		if(gy>=xuanti*4)Flag_Stop=1;
//		Flag_Stop = 0,
    }
}

//外部中断：编码器、dmp相关内容
void GROUP1_IRQHandler(void)//Group1的中断服务函数
{
    uint32_t portE1_intp = DL_GPIO_getEnabledInterruptStatus(Encoder1_PORT,Encoder1_E1A_PIN|Encoder1_E1B_PIN);
	uint32_t portE2_intp = DL_GPIO_getEnabledInterruptStatus(Encoder2_PORT,Encoder2_E2A_PIN|Encoder2_E2B_PIN|MPU6050_INT_PIN_PIN);

	//编码器1,2倍频
	if( (portE1_intp&Encoder1_E1A_PIN)==Encoder1_E1A_PIN )
	{
		if(DL_GPIO_readPins(Encoder1_PORT,Encoder1_E1B_PIN)>0)
		{
			g_EncoderACount--;
		}
		else {
			g_EncoderACount++;
		}

		DL_GPIO_clearInterruptStatus(Encoder1_PORT,Encoder1_E1A_PIN);
	}

	else if( (portE1_intp&Encoder1_E1B_PIN)==Encoder1_E1B_PIN )
	{
		if(DL_GPIO_readPins(Encoder1_PORT,Encoder1_E1A_PIN)>0)
		{
			g_EncoderACount++;
		}
		else {
			g_EncoderACount--;
		}
		DL_GPIO_clearInterruptStatus(Encoder1_PORT,Encoder1_E1B_PIN);
	}

	//编码器2,2倍频
	if( (portE2_intp&Encoder2_E2A_PIN)==Encoder2_E2A_PIN )
	{
		if(DL_GPIO_readPins(Encoder2_PORT,Encoder2_E2B_PIN)>0)
		{
			g_EncoderBCount++;
		}
		else {
			g_EncoderBCount--;
		}

		DL_GPIO_clearInterruptStatus(Encoder2_PORT,Encoder2_E2A_PIN);
	}

	else if( (portE2_intp&Encoder2_E2B_PIN)==Encoder2_E2B_PIN )
	{
		if(DL_GPIO_readPins(Encoder2_PORT,Encoder2_E2A_PIN)>0)
		{
			g_EncoderBCount--;
		}
		else {
			g_EncoderBCount++;
		}
		DL_GPIO_clearInterruptStatus(Encoder2_PORT,Encoder2_E2B_PIN);
	}

	//MPU6050下降沿中断,频率可以通过DMP配置,默认200Hz
	if( (portE2_intp&MPU6050_INT_PIN_PIN)==MPU6050_INT_PIN_PIN )
	{
		mainTaskFreqCheck->TickStart(&mainUseTimePriv);//从此处开始计时
		Read_DMP();
		mpu6050.pitch = Roll;
		mpu6050.roll = Pitch;
		mpu6050.yaw = Yaw;
		mpu6050.gyro.x=gyro[0];
		mpu6050.gyro.y=gyro[1];
		mpu6050.gyro.z=gyro[2];
		mpu6050.accel.x=accel[0];
		mpu6050.accel.y=accel[0];
		mpu6050.accel.z=accel[0];

		//5ms执行1次控制
		BalanceControlTask();

		//清空标志位
		DL_GPIO_clearInterruptStatus(Encoder2_PORT,MPU6050_INT_PIN_PIN);

		//计算中断的频率,频率正确 mainTaskFreq 应该等于200
		mainTaskFreq = mainTaskFreqCheck->UpdateFreq(&mainFreqPriv);

		//计算运行到此处的耗时,单位ms
		mainTaskUseTime = mainTaskFreqCheck->UpdateUsedTime(&mainUseTimePriv);
	}
}

//串口0,用于调试
void UART_0_INST_IRQHandler(void)
{
    switch (DL_UART_Main_getPendingInterrupt(UART_0_INST)) 
    {
        case DL_UART_IIDX_RX:
            DL_UART_transmitData(UART_0_INST,DL_UART_Main_receiveData(UART_0_INST));
            break;
        default:
            break;
    }
		
}
int ii=0;
int openmv[10];
int state = 0;
void K210_Receive_Data(int8_t data)//接收K210传过来的数据
{
	int j;

		
	if(state==0&&data==35)
	{
		state = 1;
		openmv[0] = data;
	}
	else if(state==1&&data==42)
	{
		state = 2;
		openmv[1] = data-48;
	}
	else if(state==2)
	{
		state = 3;
		openmv[2] = data-48;
	}
	else if(state==3)
	{
		state = 4;
		openmv[3] = data-48;
	}
	else if(state==4)
	{
		state = 5;
		openmv[4] = data-48;
	}
	else if(state==5)
	{
		state = 6;
		openmv[5] = data-48;
	}
	else if(state==6)
	{
		state = 7;
		openmv[6] = data-48;
	}
	else if(state==7)
	{
		state = 8;
		openmv[7] = data-48;
	}
	else if(state==8 && data==42)
	{
		state = 9;
		openmv[8] = data-48;
	}
	else if(state==9 )
	{
			if(data == 38)
			{
			state = 0;
			openmv[9] = data;
		
			x=openmv[2]*100+openmv[3]*10+openmv[4];
			y=openmv[5]*100+openmv[6]*10+openmv[7];
			}
			else
			{
				state = 0;
				for(j=0;j<10;j++)
				{
				openmv[j] = 0;
				}
			}
	}
	else
	{
		state = 0;
		for(j=0;j<10;j++)
		{
			openmv[j] = 0;
		}
	}
	if(data==38)
	{
		state=0;
		for(j=0;j<10;j++)
		{
			openmv[j] = 0;
		}
	}
}
	int16_t data1;
void UART_2_INST_IRQHandler(void)
{
	int data;
	switch (DL_UART_Main_getPendingInterrupt(UART_2_INST)) 
    {
		
        case DL_UART_IIDX_RX:
				    data=DL_UART_Main_receiveData(UART_2_INST);
						data1=data;
					  K210_Receive_Data(data);
//						DL_GPIO_togglePins(LED_PORT,LED_UserLED_PIN);
						
            break;
        default:
            break;
    }

}
	int gyst=0;
float xunji(void)
{
	float score=0;

	if(Flag_Stop == 0)
			{
				
				HD0=DL_GPIO_readPins(GPIO_GRP_0_HDPIN_0_PORT, GPIO_GRP_0_HDPIN_0_PIN);
				HD1=DL_GPIO_readPins(GPIO_GRP_0_HDPIN_1_PORT, GPIO_GRP_0_HDPIN_1_PIN);
				HD2=DL_GPIO_readPins(GPIO_GRP_0_HDPIN_2_PORT, GPIO_GRP_0_HDPIN_2_PIN);
				HD3=DL_GPIO_readPins(GPIO_GRP_0_HDPIN_3_PORT, GPIO_GRP_0_HDPIN_3_PIN);
				HD4=DL_GPIO_readPins(GPIO_GRP_0_HDPIN_4_PORT, GPIO_GRP_0_HDPIN_4_PIN);
				HD5=DL_GPIO_readPins(GPIO_GRP_0_HDPIN_5_PORT, GPIO_GRP_0_HDPIN_5_PIN);
			}
			if(HD5>0 && gyst==0)gyst=1;
			if(HD5==0 && gyst!=0)
			{
				
				gy+=1,gyst=0;
				while(1)
				{
						HD1=DL_GPIO_readPins(GPIO_GRP_0_HDPIN_1_PORT, GPIO_GRP_0_HDPIN_1_PIN);
					if(HD1>0)break;
					Turn1=-60;
				}
			}
	if (HD0> 0)//按键按下
		{
			score+=25;
		}
		
	if (HD1 > 0)//按键按下
		{
			score+=14;
		}
	if (HD2 > 0)//按键按下
		{
			score+=6;
		}
	if (HD3 > 0)//按键按下
		{
			score+=-6;
		}
	
	////////////////////////////////////////////////////////////////////	
		if (HD4 > 0)//按键按下
		{
			score+=-14;
		}
		
	if (HD5 > 0)//按键按下
		{
			score+=-25;
		}

	
	
	return score;
}