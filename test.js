const scanner = require('./middleware/proxychains')


const res = await scanner('192.168.1.33', '192.168.1.1')