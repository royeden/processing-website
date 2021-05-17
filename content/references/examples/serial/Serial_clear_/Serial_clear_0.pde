// Example by Tom Igoe

import processing.serial.*;

Serial myPort;  // The serial port
char inByte;
int i = 0;

void setup() {
  // List all the available serial ports:
  printArray(Serial.list());
  // Open the port you are using at the rate you want:
  myPort = new Serial(this, Serial.list()[0], 9600);

}

void draw() {
  // Read until we have 10 bytes, then close the port
  if (myPort.available() > 1) {
    if (i >= 10) {
      // Clear the buffer, or available() will still be > 0:
      myPort.clear();
      // Close the port
      myPort.stop();
      println("10 bytes! I'm done!");
    } else {
      inByte = myPort.readChar();
      println(inByte);
    }
    i++;
  }
}

