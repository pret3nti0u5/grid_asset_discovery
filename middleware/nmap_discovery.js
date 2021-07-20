const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');


const net_discovery = async (ip_address) => {

    let ip = ip_address;
    let mac = '';
    let domain_address = '';
    let os = '';
    let workgroup = '';
    let hostname = '';
    exec(`echo '' ;sudo nmap -sn ${ip} ;nmap -nod-host-timeout=120s -T 4 -Pn -sC -sV -p 1-1024 ${ip}`, (error, stdout1, stderr) => {
        if (error) throw error
        if (stderr) throw stderr
        //console.log(stdout1);
        // ip = stdout1.match(/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i)
        // ip = ip[0]
        console.log(`The IPv4 address is: ${ip[0]}`)
        mac = stdout1.match(/(([\da-fA-F]{2}[-:]){5}[\da-fA-F]{2})/i);
        if (mac) { console.log(`the MAC address is ${mac[0]}`); mac = mac[0]; }

        // domain_address = stdout1.match(/Domain: [a-zA-Z]+\.[a-zA-Z0-9]+\./i)
        // if (domain_address) { console.log(`${domain_address[0]}`); }
        // service_info = stdout1.match(/Service Info: [a-zA-Z]+: .+/i)
        // console.log(service_info);
        os = stdout1.match(/OS: [a-zA-Z]+;/i)
        if (os) {
            os = os[0].match(/[a-zA-Z]+;$/i)[0].split(';')[0]
        }
        console.log(os)
        workgroup = stdout1.match(/Workgroup: [a-zA-Z]+/i)
        if (workgroup) { workgroup = workgroup[0].split(':')[1]; console.log(workgroup) }
        hostname = stdout1.match(/Nmap scan report for .+/i)
        if (hostname) { hostname = hostname[0].split(' ')[4] }
        console.log(hostname);
        const JSON_object = { "Host Name": hostname, "IPv4": ip, "MAC Address": mac, "Operating System": os, "Workgroup": workgroup }
        console.log(JSON_object);
        return JSON_object;

    })


}

module.exports = net_discovery;
