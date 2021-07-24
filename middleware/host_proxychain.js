

const { exec } = require('child_process');
const { stdout, stderr } = require('process');
const { stringify } = require('querystring');
const nmap_discovery = require('./nmap_discovery');
//const ip_regex = /(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))/g
//const ip_regex = new RegExp("\(\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b\)", 'g')

const host_discovery = (ip_subnet) => {
    return new Promise((resolve, reject) => {
        exec(`echo ''; sudo proxychains arp-scan -l -v`, (error, stdout1, stderr) => {
            // if (error) throw error;
            // if (stderr) throw stderr;

            //  ip_list = stdout1.matchAll(/.+ \(\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b\)/g)
            ip_list = stdout1.match(
                /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/g
            );
            console.log(ip_list)
            resolve(ip_list);
        });
    });
};

//host_discovery()

module.exports = host_discovery;
