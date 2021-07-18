const nmap = require('libnmap');
const opts = {
<<<<<<< HEAD
  range: ['192.168.122.232'],
=======
  range: ['192.168.149.186'],
>>>>>>> 35af87c5715188ef364ba602321ae1e5975c5f66
  json: true,
  verbose: true,
  flags: ['-sC', '-Pn'],
};

nmap.scan(opts, function (err, report) {
  if (err) throw new Error(err);
  for (let item in report) {
    console.log(report[item]["host"][0]["hostnames"][0]["hostname"]);
  }
//   for (let )
//  console.log(report["item"]);
});