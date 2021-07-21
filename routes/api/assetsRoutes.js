const express = require('express');
const router = express.Router();
const Asset = require('../../models/asset');
const authCheck = require('../../middleware/authCheck');
const net_discovery = require('../../middleware/nmap_discovery');

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
      const newAssetDiscover = await net_discovery(ip);
      const newAsset = new Asset({ ...newAssetDiscover });
      await newAsset.save();
      res.status(201).send(newAsset);
    }
  } catch (e) {
    res.status(500).send({ msg: 'Internal Server Error!' });
  }
});

module.exports = router;
