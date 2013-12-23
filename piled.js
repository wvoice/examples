var Gpio = require('onoff').Gpio;
var led = new Gpio(4, 'out');
var skynet = require('skynet');

var conn = skynet.createConnection({
  // "host":"localhost",
  // "port": 3000,
  "host":"http://skynet.im",
  "port": 80,
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor"
});

conn.on('ready', function(data){

  console.log('Connected to Skynet');

  conn.on('message', function(data){
      console.log(data);
      if(data.red == 'on'){
        console.log("red on request received from skynet");
        led.writeSync(1);
        conn.send({
          "devices": "*",
          "message": {
            "red":"on"
          }
        });
      } else if(data.red == 'off'){
        console.log("red off request received from skynet");
        led.writeSync(0);
        conn.send({
          "devices": "*",
          "message": {
            "red":"off"
          }
        });
      } 

  });
    
});