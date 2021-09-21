const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');
const nmap_discovery = require('./proxychains');

const host_discovery = (ip_subnet) => {
	console.log(`the ip subnet is ${ip_subnet}`);
	return new Promise((resolve, reject) => {
		exec(`echo '';nmap -sL ${ip_subnet}`, (error, stdout1, stderr) => {
			console.log('remote scanning subnet');
			console.log(stdout1);
			ip_list_new = [];
			ip_list = stdout1.match(
				/\(\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b\)/g
			);
			ip_list.forEach((ip) => {
				ip_list_new.push(ip.split('(')[1].split(')')[0]);
			});
			console.log(ip_list_new);

			console.log(ip_list);
			resolve(ip_list_new);
		});
	});
};

module.exports = host_discovery;
