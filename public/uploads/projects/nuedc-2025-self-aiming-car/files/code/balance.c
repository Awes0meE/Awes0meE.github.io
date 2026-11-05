#include "balance.h"
#include "bsp_siic.h"
#include "bsp_debugtimer.h"
#include "bsp_key.h"
#include "bsp_debugtimer.h"
#include "MPU6050.h"

//编码器值
extern volatile short g_EncoderACount;
extern volatile short g_EncoderBCount;
int Turn1=0;
int Velocity1=0;
//小车标志位,1停止,0启动
	uint8_t Flag_Stop = 1;


//车轮速度,仅用于OLED显示
float Velocity_Left,Velocity_Right;

//左右电机PWM值
int Motor_Left,Motor_Right; 

//蓝牙遥控相关的标志位
uint8_t Flag_front,Flag_back,Flag_Left,Flag_Right,Flag_velocity=2;

//小车PID参数
//float Balance_Kp=28305,Balance_Kd=150,Velocity_Kp=25215,Velocity_Ki=125,Turn_Kp=4662,Turn_Kd=66;
float Balance_Kp=0,Balance_Kd=0,Velocity_Kp=-20,Velocity_Ki=1,Turn_Kp=15,Turn_Kd=2;

//机械中值
short MiddleAngle = 3;

//小车电池电压
float robotVol=0;

uint8_t getVolFlag = 0;

//控制任务,此函数放置于外部中断内执行,5ms控制1次
	int Encoder_Left,Encoder_Right;
	int controlFlag = 0;
	int flag=0;
void BalanceControlTask(void)
{

	static int Balance_Pwm=0,Velocity_Pwm_R=0,Velocity_Pwm_L=0,Turn_Pwm=0;

	//控制频率,降低为100hz

	//按键检测
	pKeyInterface_t key = &UserKey;
	UserKeyState_t keystate = key->getKeyState(200);

	//通过单击按键启动/关闭平衡小车
	if( keystate == USEKEY_single_click ) Flag_Stop = !Flag_Stop;

	//计算电池电压
	robotVol = (float)Get_Vol()*3.3f*11.0f/4096.0f;
 flag+=1;
	controlFlag=!controlFlag;
	if(controlFlag==0 )
	{
		flag=0;
		
		//读取编码器数值
		Encoder_Left = g_EncoderACount;
		Encoder_Right = g_EncoderBCount;
		
	g_EncoderACount=0,g_EncoderBCount=0;
		//通过编码器值计算车轮速度
		Get_Velocity_Form_Encoder(Encoder_Left,Encoder_Right);



		Velocity_Pwm_L+=Velocity2(Velocity1,Encoder_Left+Encoder_Right); 
		Velocity_Pwm_R+=Velocity2(Velocity1,Encoder_Right); 
	
		Turn_Pwm=+Turn2(Turn1,Encoder_Left-Encoder_Right);	

		Motor_Left=  Velocity_Pwm_L+ Turn_Pwm;
		Motor_Right= Velocity_Pwm_L-Turn_Pwm ; 

		Motor_Left=PWM_Limit(Motor_Left,7666,-7666);
		Motor_Right=PWM_Limit(Motor_Right,7666,-7666);

		if( Flag_Stop == 0 )set_pwm(Motor_Left,Motor_Right); 

		else
		{
			Motor_Left=0;
			Motor_Right=0;
			Velocity_Pwm_L=0;
			set_pwm(0,0); 
		}
		
//		if( fabs(mpu6050.roll) > 50 || robotVol<9.5f ) Flag_Stop = 1;

	}
}

static uint16_t Get_Vol(void)
{
	static uint16_t adcVal = 0;
	static uint8_t startflag = 0;

	//转换未开始时,软件触发使能
	if( startflag == 0 )
	{
		startflag=1;
		DL_ADC12_startConversion(ADC12_0_INST);
	}
		
	if( getVolFlag )
	{
		getVolFlag = 0;
		adcVal = DL_ADC12_getMemResult(ADC12_0_INST,DL_ADC12_MEM_IDX_0);
		DL_ADC12_startConversion(ADC12_0_INST);
		DL_ADC12_enableConversions(ADC12_0_INST);
	}

	return adcVal;
}

//ADC电压值获取完毕中断
void ADC12_0_INST_IRQHandler(void)
{
	switch(DL_ADC12_getPendingInterrupt(ADC12_0_INST))
	{
		case DL_ADC12_IIDX_MEM0_RESULT_LOADED:
			getVolFlag = 1;
			break;
		default:
			break;
	}
}


static void set_pwm(int left,int right)
{
	if(left>0)
	{
		DL_GPIO_setPins(MOTOR_DIR_PORT,MOTOR_DIR_AIN1_PIN);
		DL_GPIO_clearPins(MOTOR_DIR_PORT,MOTOR_DIR_AIN2_PIN);
	} 
	else 
	{
		DL_GPIO_clearPins(MOTOR_DIR_PORT,MOTOR_DIR_AIN1_PIN);
		DL_GPIO_setPins(MOTOR_DIR_PORT,MOTOR_DIR_AIN2_PIN);
	}

	if(right>0)
	{
		DL_GPIO_setPins(MOTOR_DIR_PORT,MOTOR_DIR_BIN1_PIN);
		DL_GPIO_clearPins(MOTOR_DIR_PORT,MOTOR_DIR_BIN2_PIN);
	} 
	else 
	{
		DL_GPIO_clearPins(MOTOR_DIR_PORT,MOTOR_DIR_BIN1_PIN);
		DL_GPIO_setPins(MOTOR_DIR_PORT,MOTOR_DIR_BIN2_PIN);
	}

	DL_TimerA_setCaptureCompareValue(PWM_0_INST,abs(right),GPIO_PWM_0_C0_IDX);
	DL_TimerA_setCaptureCompareValue(PWM_0_INST,abs(left),GPIO_PWM_0_C1_IDX);
}



static void Get_Velocity_Form_Encoder(int encoder_left,int encoder_right)
{ 	
	float Rotation_Speed_L,Rotation_Speed_R;					//Motor speed, speed = encoder reading (5ms each time) * reading frequency/multiple frequency/deceleration ratio/encoder accuracy//电机转速,转速=编码器读数（5ms每次）*读取频率/倍频数/减速比/编码器精度
	Rotation_Speed_L = encoder_left*Control_Frequency/EncoderMultiples/Reduction_Ratio/Encoder_precision;
	Velocity_Left = Rotation_Speed_L*PI*Diameter_67;	//Find the encoder speed = rotational speed * perimeter//求出编码器速度=转速*周长
	Rotation_Speed_R = encoder_right*Control_Frequency/EncoderMultiples/Reduction_Ratio/Encoder_precision;
	Velocity_Right = Rotation_Speed_R*PI*Diameter_67;	//Find the encoder speed = rotational speed * perimeter//求出编码器速度=转速*周长
}


static int PWM_Limit(int IN,int max,int min)
{
	int OUT = IN;
	if(OUT>max) OUT = max;
	if(OUT<min) OUT = min;
	return OUT;
}

static int Balance(float Angle,float Gyro)
{  
	float Angle_bias,Gyro_bias;
	int balance;
	Angle_bias=MiddleAngle-Angle;                       				//求出平衡的角度中值 和机械相关
	Gyro_bias=0-Gyro; 
	balance=-Balance_Kp/100*Angle_bias-Gyro_bias*Balance_Kd/100; //计算平衡控制的电机PWM  PD控制   kp是P系数 kd是D系数 
	return balance;
}

static int Velocity(int encoder_left,int encoder_right)
{  
    static float velocity,Encoder_Least,Encoder_bias,Movement;
	  static float Encoder_Integral,Target_Velocity=50;
	  //================遥控前进后退部分====================// 
		// if(Flag_follow==1||Flag_avoid==1) Target_Velocity = 30; //如果进入跟随/避障模式,降低速度
		// else 											        Target_Velocity = 50;
		if(Flag_front==1)    	Movement=Target_Velocity/Flag_velocity;	  //收到前进信号
		else if(Flag_back==1)	Movement=-Target_Velocity/Flag_velocity;  //收到后退信号
	    else  Movement=0;
	
   //=============超声波功能（跟随/避障）==================// 
	//   if(Mode==Ultrasonic_Follow_Mode&&(Distance>200&&Distance<500)&&Flag_Left!=1&&Flag_Right!=1) //跟随
	// 		 Movement=Target_Velocity/Flag_velocity;
	// 	if(Mode==Ultrasonic_Follow_Mode&&Distance<200&&Flag_Left!=1&&Flag_Right!=1) 
	// 		 Movement=-Target_Velocity/Flag_velocity;
	// 	if(Mode==Ultrasonic_Avoid_Mode&&Distance<450&&Flag_Left!=1&&Flag_Right!=1)  //超声波避障
	// 		 Movement=-Target_Velocity/Flag_velocity;
		
   //================速度PI控制器=====================//	
		Encoder_Least =0-(encoder_left+encoder_right);                    //获取最新速度偏差=目标速度（此处为零）-测量速度（左右编码器之和） 
		Encoder_bias *= 0.86;		                                          //一阶低通滤波器       
		Encoder_bias += Encoder_Least*0.14;	                              //一阶低通滤波器，减缓速度变化 
		Encoder_Integral +=Encoder_bias;                                  //积分出位移 积分时间：10ms
		Encoder_Integral=Encoder_Integral+Movement;                       //接收遥控器数据，控制前进后退
		if(Encoder_Integral>11000)  	Encoder_Integral=11000;             //积分限幅
		if(Encoder_Integral<-11000)	  Encoder_Integral=-11000;            //积分限幅	
		velocity=-Encoder_bias*Velocity_Kp/100-Encoder_Integral*Velocity_Ki/100;     //速度控制	
		if(Flag_Stop==1) Encoder_Integral=0;//电机关闭后清除积分
	  return velocity;
}
float Velocity2(float target,float encoder)
{  
    static float velocity,Encoder_Least,Encoder_bias,Movement;
	  static float Encoder_Integral,Target_Velocity=50;

	
   //=============超声波功能（跟随/避障）==================// 
	//   if(Mode==Ultrasonic_Follow_Mode&&(Distance>200&&Distance<500)&&Flag_Left!=1&&Flag_Right!=1) //跟随
	// 		 Movement=Target_Velocity/Flag_velocity;
	// 	if(Mode==Ultrasonic_Follow_Mode&&Distance<200&&Flag_Left!=1&&Flag_Right!=1) 
	// 		 Movement=-Target_Velocity/Flag_velocity;
	// 	if(Mode==Ultrasonic_Avoid_Mode&&Distance<450&&Flag_Left!=1&&Flag_Right!=1)  //超声波避障
	// 		 Movement=-Target_Velocity/Flag_velocity;
		
   //================速度PI控制器=====================//	
		Encoder_Least =target-encoder;                    //获取最新速度偏差=目标速度（此处为零）-测量速度（左右编码器之和） 

		Encoder_Integral +=Encoder_bias;                                  //积分出位移 积分时间：10ms
		Encoder_Integral=Encoder_Integral+Movement;                       //接收遥控器数据，控制前进后退
		if(Encoder_Integral>11000)  	Encoder_Integral=11000;             //积分限幅
		if(Encoder_Integral<-11000)	  Encoder_Integral=-11000;            //积分限幅	
		velocity=-Encoder_Least*Velocity_Kp;     //速度控制	
		if(Flag_Stop==1) Encoder_Integral=0;//电机关闭后清除积分
	  return velocity;
}
static int Turn(float gyro)//Steering control//转向控制
{
	 static float Turn_Target,turn,Turn_Amplitude=54;
	 float Kp=Turn_Kp,Kd=0;				//To change the steering speed, modify Turn_Amplitude//修改转向速度，请修改Turn_Amplitude即可
	//===================遥控左右旋转部分=================//
	//=====Remote control left and right rotation part======//
	 if(1==Flag_Left)	        Turn_Target=-Turn_Amplitude/Flag_velocity;
	 else if(1==Flag_Right)	  Turn_Target=Turn_Amplitude/Flag_velocity; 
	 else Turn_Target=0;
	 if(1==Flag_front||1==Flag_back)  Kd=Turn_Kd;        
	 else Kd=0;   //The gyroscope correction is cancelled when the steering is done, somewhat obscuring the idea of PID//转向的时候取消陀螺仪的纠正 有点模糊PID的思想
  //===================转向PD控制器=================//
	//==============Steering PD controller=============//
	 turn=Turn_Target*Kp/100+gyro*Kd/100;//A Z-axis gyroscope is combined for PD control//结合Z轴陀螺仪进行PD控制
	 return turn;								 				 //The steering loop PWM turns positive to the right and negative to the left//转向环PWM右转为正，左转为负
}
static float Turn2(float Turn_Target,float V)//Steering control//转向控制
{
	 static float turn;

		Turn_Target=Turn_Target-V;

	 turn=Turn_Kp*Turn_Target;//A Z-axis gyroscope is combined for PD control//结合Z轴陀螺仪进行PD控制
	 return turn;								 				 //The steering loop PWM turns positive to the right and negative to the left//转向环PWM右转为正，左转为负
}