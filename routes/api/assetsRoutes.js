const router = require('express').Router();
const Asset = require('../../models/asset');
const authCheck = require('../../middleware/authCheck');
const nmap = require('node-nmap');

router.get('/', async (req, res) => {
  try {
    const assets = await Asset.find().sort({ updatedAt: 'asc' });
    res.send(assets);
  } catch (e) {
    res.status(500).send({ msg: 'Internal Server Error!' });
  }
});

router.get('/:ip', async (req, res) => {
  const ip = req.params.ip;
  try {
    const asset = await Asset.find({ ip });
    if (asset.length !== 0) {
      res.send(asset);
    } else {
      let nmapScan = new nmap.NmapScan(`${ip}`, '-sC -sV');
      nmapScan.on('complete', async (data) => {
        const newAsset = new Asset(data[0]);
        await newAsset.save();
        res.status(201).send(newAsset);
      });
      nmapScan.on('error', (e) => {
        throw new Error(e);
      });
    }
  } catch (e) {
    res.status(500).send({ msg: 'Internal Server Error!' });
  }
});

module.exports = router;
