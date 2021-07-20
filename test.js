const net_discovery = require('./middleware/nmap_discovery');

const testFunc = async () => {
  const nice = await net_discovery('192.168.29.1');
  console.log(nice);
};

testFunc();
