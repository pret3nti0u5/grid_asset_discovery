//@ts-ignore
//const nmap = require('node-nmap');
const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');



exec("echo '' ;sudo nmap -sn 192.168.1.176 ;nmap -nod-host-timeout=120s -T 4 -Pn -sC -sV -p 1-1024 192.168.1.178", (error, stdout1, stderr) => {
    if (error) throw error
    if (stderr) throw stderr
    console.log(stdout1);
    let ip = stdout1.match(/\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i)
    console.log(`The IPv4 address is: ${ip[0]}`)
    let mac = stdout1.match(/(([\da-fA-F]{2}[-:]){5}[\da-fA-F]{2})/i);
    if (mac) { console.log(`the MAC address is ${mac[0]}`) }
    let domain_adrees = stdout1.match(/Domain: [a-zA-Z]+\.[a-zA-Z0-9]+\./i)
    console.log(`${domain_adrees}`);
    let service_info = stdout1.match(/Service Info: [a-zA-Z]+: .+/i)
    console.log(service_info);
    let os = stdout1.match(/OS: .+\s/i)
    os = os[0].match(/[a-zA-Z]+;$/i)[0].split(';')[0]
    console.log("os")
    let workgroup = stdout1.match(/Workgroup: [a-zA-Z]+/i)
    console.log(workgroup)

})
