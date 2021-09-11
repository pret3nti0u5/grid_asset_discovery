const { exec } = require('child_process');
const { query } = require('express');
const { resolve } = require('path');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');

const port_scanner = require('./port_scanner');

const ldap_fn = async (pc_name) => {
    const ldapSearch = await import('./AD_search/for_ad.mjs');
    return ldapSearch['default'](pc_name);
    //  console.info({ ldapSearch }['default'])
};

const proxychains = async (ip, dns_address) => {
    // ip = '192.168.1.224';
    //dns_address = '192.168.1.1'

    //const ports = await port_scanner(ip);

    return new Promise((resolve, reject) => {
        let query1 = ""
        if (dns_address === undefined || dns_address === "" || dns_address === null) {
            console.log("the dns address is:" + dns_address)
            query1 = `echo '';sudo proxychains4 arp -a ${ip} ;sudo proxychains4 nmap -O --script smb-os-discovery.nse -F ${ip}`
        }
        else {
            query1 = `echo '';sudo proxychains4 arp -a ${ip} ;sudo proxychains4 nmap -O --script smb-os-discovery.nse -F  --dns-server ${dns_address} ${ip}`
        }
        console.log(`------ Scanning target ${ip} ------------------`)
        console.log("ports are:")
        //console.log(ports)
        let domain_address = '';
        let mac = ''
        let hostname = ''
        let os = ''
        let workgroup = ''
        //exec(`echo '';sudo proxychains4 arp -a ${ip} ;sudo proxychains4 nmap -sT -Pn -sC -sV -p${ports}  --dns-server ${dns_address} ${ip}`, function (err, stdout1) {
        exec(query1, function (err, stdout1) {

            //console.log(stdout1)

            // if (stderr) throw (stderr);
            // console.log(stdout1);
            // ip = stdout1.match(/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i)
            // ip = ip[0]
            console.log(`The IPv4 address is: ${ip}`);
            mac = stdout1.match(/(([\da-fA-F]{2}[-:]){5}[\da-fA-F]{2})/i);
            if (mac) {
                //console.log(`the MAC address is ${mac[0]}`);
                mac = mac[0];
            }

            // domain_address = stdout1.match(/Domain: [a-zA-Z]+\.[a-zA-Z0-9]+\./i);
            // if (domain_address) {
            //     console.log(`${domain_address}`);
            // }
            // service_info = stdout1.match(/Service Info: [a-zA-Z]+: .+/i)
            // console.log(service_info);
            os = stdout1.match(/OS details: .+/i);
            console.log("matched part=" + os)
            if (os) {
                // os = os[0].match(/[a-zA-Z]+;$/i)[0].split(';')[0];
                os = os[0].split(":")[1]
            }
            console.log("os is " + os);
            workgroup = stdout1.match(/Workgroup: [a-zA-Z]+/i);
            if (workgroup) {
                workgroup = workgroup[0].split(':')[1];
                console.log(workgroup);
            }
            hostname = stdout1.match(/Nmap scan report for .+/i);
            if (hostname) {
                console.log(hostname)
                hostname = hostname[0].split(' ')[4];
            }
            //console.log(hostname)
            let JSON_object = {
                hostname,
                mac,
                domain_address,
                os,
                workgroup,
            };
            ldap_fn(hostname).then((value) => {
                domain_address = value;
                console.log(`inside function ${domain_address}`);
                JSON_object.domain_address = domain_address;
                if (JSON_object.os === null) {
                    JSON_object.os = "Microsoft Windows"
                }
                console.log(hostname);

                console.log(JSON_object);
                resolve(JSON_object);
            });
            // console.log(JSON_object);
        })
    })


}

// const testFunc = async () => {
//     const nice = await proxychains('192.168.1.178', '192.168.1.1');
//     console.log(nice)
//     //     const nice1 = await net_discovery('192.168.1.224');
//     //     console.log(nice1);
// };

// testFunc();

module.exports = proxychains;

