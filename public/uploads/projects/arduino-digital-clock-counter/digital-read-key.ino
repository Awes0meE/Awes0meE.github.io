
void setup() {
Serial.begin(9600);
pinMode(7,INPUT); //Pause key
pinMode(6,INPUT); //Reset key
}
void loop() {
int StopKey = digitalRead(7);
int ResetKey = digitalRead(6);

Serial.print("Stop Key"); //test Only
Serial.println(StopKey); //test Only
  
Serial.print("Reset Key"); //test Only
Serial.println(ResetKey); //test Only
}
