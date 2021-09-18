const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');
const nmap_discovery = require('./proxychains');
//const ip_regex = /(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))/g
//const ip_regex = new RegExp("\(\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b\)", 'g')

const host_discovery = (ip_subnet) => {
	console.log(`the ip subnet is ${ip_subnet}`);
	return new Promise((resolve, reject) => {
		exec(`echo ''; sudo nmap -sL ${ip_subnet}`, (error, stdout1, stderr) => {
			//exec(`echo ''; sudo proxychains4 nmap -sn ${ip_subnet}`, (error, stdout1, stderr) => {

			// if (error) throw error;
			// if (stderr) throw stderr;d

			//  ip_list = stdout1.matchAll(/.+ \(\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b\)/g)
			// ip_list = stdout1.match(
			//     /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/g
			// );
			ip_list_new = [];
			ip_list = stdout1.match(
				/\(\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b\)/g
			);
			ip_list.forEach((ip) => {
				ip_list_new.push(ip.split('(')[1].split(')')[0]);
			});
			console.log(ip_list_new);
			//ip_list.shift();
			console.log(ip_list);
			resolve(ip_list_new);
			//resolve(["192.168.1.33", "192.168.1.224", "192.168.1.1", "192.168.1.178"])
		});
	});
};

// const testFunc = async () => {
//     const ip_list = await host_discovery("192.168.1.0/24")
//     console.log(ip_list)
//     //const ip_list = ["192.168.1.33", "192.168.1.224", "192.168.1.1", "192.168.1.178"]
//     ////const ip_list = ["192.168.1.152"]
//     for (i in ip_list) {
//         const nice = await nmap_discovery(ip_list[i]);
//         console.log(nice)
//     }

// };

// testFunc();

module.exports = host_discovery;
