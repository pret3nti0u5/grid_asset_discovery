const Asset = require('./models/asset');

require('./db/mongoose');

const testFunc = async () => {
  const asset = await Asset.findOne({ ip: '192.168.1.117' });
  if (asset) {
    const date = new Date();
    console.log(date.toString());
  }
};

testFunc();
