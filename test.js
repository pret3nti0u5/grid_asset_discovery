const nmap = require('libnmap');
const opts = {
  range: ['scanme.nmap.org', '192.168.29.1'],
  json: true,
  verbose: true,
  flags: ['-sC', '-sV'],
};

nmap.scan(opts, function (err, report) {
  if (err) throw new Error(err);

  for (let item in report) {
    console.log(report[item]);
  }
});
