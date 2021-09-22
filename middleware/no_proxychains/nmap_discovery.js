const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');
const port_scanner = require('./port_scanner');

const ldap_fn = async (pc_name) => {
	const ldapSearch = await import('../AD_search/for_ad.mjs');
	return ldapSearch['default'](pc_name);
};

const net_discovery = async (ip_address, dns_address) => {
	let ip = ip_address;
	let mac = '';
	let domain_address = '';
	let os = '';
	let workgroup = '';
	let hostname = '';

	const ports = await port_scanner(ip_address, dns_address);
	return new Promise((resolve, reject) => {
		exec(
			`echo '' ;sudo nmap -sn ${ip} --dns-server ${dns_address};sudo nmap -F -T 4 -Pn --script smb-os-discovery.nse -O -sV --dns-server ${dns_address} ${ip}`,
			(error, stdout1, stderr) => {
				console.log(dns_address);
				if (stderr) console.log(stderr);

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
					os = stdout1.match(/OS: [a-zA-Z]+;/i);
					if (os) {
						os = os[0].match(/[a-zA-Z]+;$/i)[0].split(';')[0];
					}
				}

				workgroup = stdout1.match(/Workgroup: [a-zA-Z]+/i);
				if (workgroup) {
					workgroup = workgroup[0].split(':')[1];
				}
				hostname = stdout1.match(/Nmap scan report for .+/i);
				if (hostname) {
					hostname = hostname[0].split(' ')[4];
				}
				const JSON_object = {
					hostname,
					ip,
					mac,
					domain_address,
					os,
					workgroup,
				};
				ldap_fn(hostname).then((value) => {
					domain_address = value;
					console.log(`inside function ${domain_address}`);
					JSON_object.domain_address = domain_address;
					resolve(JSON_object);
				});
			}
		);
	});
};
module.exports = net_discovery;
