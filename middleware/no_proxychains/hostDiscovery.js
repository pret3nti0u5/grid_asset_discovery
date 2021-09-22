const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');
const nmap_discovery = require('./nmap_discovery');

const host_discovery = (ip_subnet) => {
	return new Promise((resolve, reject) => {
		exec(`echo ''; sudo arp-scan ${ip_subnet}`, (error, stdout1, stderr) => {
			if (error) throw error;
			if (stderr) throw stderr;

			ip_list = stdout1.match(
				/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/g
			);

			ip_list.shift();
			resolve(ip_list);
		});
	});
};

module.exports = host_discovery;
