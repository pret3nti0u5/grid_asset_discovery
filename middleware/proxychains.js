const { exec } = require('child_process');
const { query } = require('express');
const { resolve } = require('path');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');

const port_scanner = require('./port_scanner');

const ldap_fn = async (pc_name) => {
	const ldapSearch = await import('./AD_search/ad_ldap_remote.mjs');
	return ldapSearch['default'](pc_name);
};

const proxychains = async (ip, dns_address) => {
	console.log(`scanning ${ip}`);
	const ports = await port_scanner(ip);

	return new Promise((resolve, reject) => {
		let query1 = '';
		query1 = `echo '';sudo proxychains nmap -p${ports} --script smb-os-discovery -sV -Pn -sT ${ip};ssh nitin@192.168.1.11 -p 6000 -i ~/.ssh/id_ed25519  arp -a ${ip}`;

		console.log(`------ Scanning target ${ip} ------------------`);
		let domain_address = '';
		let mac = '';
		let hostname = '';
		let os = '';
		let workgroup = '';
		exec(query1, function (err, stdout1) {
			console.log(stdout1);

			console.log(`The IPv4 address is: ${ip}`);
			mac = stdout1.match(/(([\da-fA-F]{2}[-:]){5}[\da-fA-F]{2})/i);
			if (mac) {
				mac = mac[0];
			}

			os = stdout1.match(/OS details: .+/i);
			if (os) {
				os = os[0].split(':')[1];
				console.log(os);
			}
			if (os === null) {
				os = stdout1.match(/OS: .+/i);
				if (os) {
					os = os[0].match(/[a-zA-Z]+;/i)[0].split(';')[0];
					console.log(os);
				}
			}
			console.log('matched part=' + os);

			console.log('os is ' + os);
			workgroup = stdout1.match(/Workgroup: [a-zA-Z]+/i);
			if (workgroup) {
				workgroup = workgroup[0].split(':')[1];
				console.log(workgroup);
			}
			hostname = stdout1.match(/Nmap scan report for .+/i);

			if (hostname) {
				console.log('hostname is:' + hostname);
				hostname = hostname[0].split(' ')[4];
			} else {
				hostname = stdout1.match(/name = .+/i);
			}

			let JSON_object = {
				hostname,
				ip,
				mac,
				domain_address,
				os,
				workgroup,
			};
			ldap_fn(hostname).then((value) => {
				domain_address = value;
				console.log(`the domain address: ${domain_address}`);
				JSON_object.domain_address = domain_address;
				console.log(hostname);

				console.log(JSON_object);
				resolve(JSON_object);
			});
		});
	});
};

module.exports = proxychains;
