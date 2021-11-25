const { exec } = require('child_process');
const { resolve } = require('path');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');

const port_scanner = async (ip) => {
	return new Promise((resolve, reject) => {
		console.log(`------ Scanning port for ${ip} ------------------`);
		exec(`echo '';sudo proxychains nmap -Pn -sT -F ${ip}`, (err, stdout1) => {
			let arr3 = [...stdout1.matchAll(/\d+\/tcp/g)];

			let ports = '';

			for (i = 0; i < arr3.length; i++) {
				ports += arr3[i][0].split('/tcp')[0] + ',';
			}
			ports = ports.substring(0, ports.length - 1);

			console.log(`------ Finished Scanning port for ${ip} ------------------`);
			resolve(ports);
			console.log('ports are:');
			console.log(ports);
		});
	});
};

module.exports = port_scanner;
