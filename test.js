const nmap = require('node-nmap');

//the actionFunction gets run each time a scan on a host is complete
function actionFunction(data) {
  console.log(data);
  console.log('Percentage complete' + scan.percentComplete());
}
var scan = new nmap.OsAndPortScan(
  '192.168.149.159', // Second is just my gateway
  '-sC',
  actionFunction
);

scan.on('complete', function (data) {
  console.log(data);
  data[0].openPorts.forEach((openPort) => {
    // Enumerates over all open ports since they are objects
    console.log(openPort);
  });
  console.log('total scan time' + scan.scanTime);
});

scan.on('error', function (error) {
  console.log(error);
});

scan.startRunScan(); //processes entire queue
