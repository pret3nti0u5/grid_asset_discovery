const express = require('express');
const router = express.Router();
const Asset = require('../../models/asset');
const authCheck = require('../../middleware/authCheck');
const net_discovery = require('../../middleware/nmap_discovery');
const host_discovery = require('../../middleware/hostDiscovery');

router.get('/', async (req, res) => {
  try {
    const assetArr = {};
    const assets = await Asset.find().sort({ updatedAt: 'asc' });
    const osKeys = await Asset.find().sort({ os: 'asc' }).distinct('os');
    const domainKeys = await Asset.find()
      .sort({ domain_address: 'asc' })
      .distinct('domain_address');
    const workgroupKeys = await Asset.find()
      .sort({ workgroup: 'asc' })
      .distinct('workgroup');
    osKeys.map((key) => {
      let arr = assets.filter((asset) => asset.category === key);
      assetsArr[key] = arr;
    });
    res.send(assetsArr);
  } catch (e) {
    res.status(500).send({ msg: 'Internal Server Error!' });
  }
});

router.get('/ip', async (req, res) => {
  const ip = req.body.ip;
  try {
    const asset = await Asset.findOne({ ip });
    if (asset) {
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

router.get('/subnet', async (req, res) => {
  const subnet = req.body.subnet;
  try {
    const ip_list = await host_discovery(subnet);
    const assetList = await Promise.all(
      ip_list.map(async (ip) => {
        const asset = await Asset.findOne({ ip });
        if (asset) {
          return asset;
        }
        const newAssetDiscover = await net_discovery(ip);
        const newAsset = new Asset({ ...newAssetDiscover });
        await newAsset.save();
        return newAsset;
      })
    );
    res.send(assetList);
  } catch (e) {
    res.status(500).send({ msg: 'Internal Server Error!' });
  }
});

module.exports = router;
