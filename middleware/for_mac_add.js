var spawn = require('child_process').spawn;
    

const get_mac = (ip) => {
    // child = spawn(`ssh nitin@8.tcp.ngrok.io -p 19036 arp -a ${ip}`)
    child = spawn('echo')
    child.stdin.setEncoding('utf-8');
    child.stdout.pipe(process.stdout);
    child.stdin.write('password\n')
    child.stdin.end()
}


get_mac('192.168.1.1')