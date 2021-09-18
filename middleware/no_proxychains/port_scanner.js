const { exec } = require('child_process');
const { resolve } = require('path');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');


const port_scanner = async (ip) => {

    return new Promise((resolve, reject) => {
        console.log(`------ Scanning port for ${ip} ------------------`)
        exec(`sudo nmap -Pn -F ${ip}`, (err, stdout1) => {

            //console.log(stdout1);

            // stdout1.matchAll(/.\/tcp/i)

            let arr3 = [...stdout1.matchAll(/\d+\/tcp/g)]

            //console.log(arr3)
            let ports = ""


            for (i = 0; i < arr3.length; i++) {

                //ports.push(arr3[i][0].split('/tcp')[0])
                ports += arr3[i][0].split('/tcp')[0] + ","
            }
            ports = ports.substring(0, ports.length - 1);

            console.log(`------ Finished Scanning port for ${ip} ------------------`)
            resolve(ports);
            console.log(ports);
        })
    })




}

// const testFunc = async () => {
//     const nice = await port_scanner('192.168.1.1');
//     console.log(nice);
//     //     const nice1 = await net_discovery('192.168.1.224');
//     //     console.log(nice1);
// };

// testFunc();

module.exports = port_scanner;


