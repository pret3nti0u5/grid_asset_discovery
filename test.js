const nmap = require('node-nmap');

//the actionFunction gets run each time a scan on a host is complete
function actionFunction(data) {
  console.log(data);
  console.log('Percentage complete' + scan.percentComplete());
}
var scan = new nmap.QueuedNmapScan(
  'google.com 192.168.29.1', // Second is just my gateway
  '-sC',
  actionFunction
);

scan.on('complete', function (data) {
  console.log(data);
  data[1].openPorts.forEach((openPort) => {
    // Enumerates over all open ports since they are objects
    console.log(openPort);
  });
  console.log('total scan time' + scan.scanTime);
});

scan.on('error', function (error) {
  console.log(error);
});

scan.startRunScan(); //processes entire queue