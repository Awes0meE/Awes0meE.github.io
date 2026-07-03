int inputs[4] = {9,10,11,12}; // A,B,C,D inputs
byte BCD[16][4] ={{0,0,0,0},
{1,0,0,0},
{0,1,0,0},
{1,1,0,0},
{0,0,1,0},
{1,0,1,0},
{0,1,1,0},
{1,1,1,0},
{0,0,0,1},
{1,0,0,1},
{0,1,0,1},
{1,1,0,1},
{0,0,1,1},
{1,0,1,1},
{0,1,1,1},
{1,1,1,1}}; //BCD code


void setup() {
  
for(int a = 0; a < 4; a++){
pinMode(inputs[a], OUTPUT);} //set outputs
}

void loop() {

  
static int num = 0;


for(int c = 0; c < 4; c++){
digitalWrite(inputs[c], BCD[num][c]);
}

  num++;
  num = num % 10;
  delay(1000);

}
