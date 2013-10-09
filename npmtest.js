var skynet = require('skynet');

var conn = skynet.createConnection({
  "host":"localhost",
  "port": 3000,
  "uuid": "ad698900-2546-11e3-87fb-c560cb0ca47b",
  "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9"
});

// Send and receive messages
conn.send({
  "devices": "all",
  "message": {
    "skynet":"online"
  }
});
conn.on('message', function(data){
  console.log('status received');
  console.log(data);
});

// Event triggered when device loses connection to skynet
conn.on('disconnect', function(data){
  console.log('disconnected from skynet');
});

// Register a device
conn.register({
  "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9", 
  "type": "drone"
});
conn.on('register', function(data){
  console.log('registration received');
  console.log(data);
  
  // UnRegister a device
  conn.unregister({
    "uuid": data.uuid, 
    "token": data.token
  });

});

// UnRegister a device
// conn.unregister({
//   "uuid": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9", 
//   "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9"
// });
conn.on('unregister', function(data){
  console.log('unregistration received');
  console.log(data);
});


// Update device
conn.update({
  "uuid":"ad698900-2546-11e3-87fb-c560cb0ca47b", 
  "token": "zh4p7as90pt1q0k98fzvwmc9rmjkyb9", 
  "armed":true
});
conn.on('update', function(data){
  console.log('update received');
  console.log(data);
});

// WhoAmI?
conn.whoami({});
conn.on('whoami', function(data){
  console.log('whoami received');
  console.log(data);
});

// Receive an array of device UUIDs based on user defined search criteria
conn.devices({
  "type":"drone"
});
conn.on('devices', function(data){
  console.log('devices received');
  console.log(data);
});

// Skynet status
conn.status({});
conn.on('status', function(data){
  console.log('status received');
  console.log(data);
});

