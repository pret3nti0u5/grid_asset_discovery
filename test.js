const nmap = require('libnmap');
const opts = {
  range: ['192.168.149.186'],
  json: true,
  verbose: true,
  flags: ['-sC', '-Pn'],
};

nmap.scan(opts, function (err, report) {
  if (err) throw new Error(err);
  for (let item in report) {
    console.log(report[item]['host'][0]['hostnames'][0]['hostname']);
  }
  //   for (let )
  //  console.log(report["item"]);
});
