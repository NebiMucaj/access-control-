var SerialPort = require('serialport');
var http = require('http')
var createInterface = require('readline').createInterface;

var port = new SerialPort('/dev/ttyACM0');

var lineReader = createInterface({
  input: port
});

lineReader.on('line', function (line) {
 check(line);
});

port.write('ROBOT PLEASE RESPOND\n');

check= function(tagID){
  http.get("http://localhost:5000/member/check/"+tagID, res => {
let data = ""

res.on("data", d => {
  data += d
})
res.on("end", () => {
  console.log(data)
})
})
}

