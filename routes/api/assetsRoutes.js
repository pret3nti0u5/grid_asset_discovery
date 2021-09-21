const express = require('express');
const router = express.Router();
const Asset = require('../../models/asset');
//const authCheck = require('../../middleware/authCheck');
const local_net_discovery = require('../../middleware/no_proxychains/nmap_discovery');
const local_host_discovery = require('../../middleware/no_proxychains/hostDiscovery');
const remote_host_discovery = require('../../middleware/host_proxychain');
const remote_net_discovery = require('../../middleware/proxychains.js');

router.post('/', async (req, res) => {
	try {
		const filter = req.body.filter;
		const assetsArr = {};
		const assets = await Asset.find().sort({ updatedAt: 'asc' });
		if (filter === 'all' || filter === undefined) {
			res.send(assets);
		}
		if (filter === 'os') {
			const osKeys = await Asset.find().sort({ os: 'asc' }).distinct('os');
			osKeys.map((key) => {
				let arr = assets.filter((asset) => asset.os === key);
				assetsArr[key] = arr;
			});
			res.send(assetsArr);
		}
		if (filter === 'domain') {
			const domainKeys = await Asset.find()
				.sort({ domain_address: 'asc' })
				.distinct('domain_address');
			domainKeys.map((key) => {
				let arr = assets.filter((asset) => asset.domain_address === key);
				assetsArr[key] = arr;
			});
			res.send(assetsArr);
		}
		if (filter === 'workgroup') {
			const workgroupKeys = await Asset.find()
				.sort({ workgroup: 'asc' })
				.distinct('workgroup');
			workgroupKeys.map((key) => {
				let arr = assets.filter((asset) => asset.workgroup === key);
				assetsArr[key] = arr;
			});
			res.send(assetsArr);
		}
	} catch (e) {
		res.status(500).send({ msg: 'Internal Server Error!' });
	}
});

router.post('/ip', async (req, res) => {
	const ip = req.body.ip;
	const dns_address = req.body.dns_address;
	try {
		const asset = await Asset.findOne({ ip });
		if (asset) {
			const date = new Date();
			asset.lastSeen = date.toString();
			await asset.save();
			res.send(asset);
		} else {
			const newAssetDiscover = await net_discovery(ip, dns_address); //the second parameter is the DNS to be used for hostname lookup
			const date = new Date();
			const newAsset = new Asset({
				...newAssetDiscover,
				lastSeen: date.toString(),
			});
			await newAsset.save();
			res.status(201).send(newAsset);
		}
	} catch (e) {
		res.status(500).send({ msg: 'Internal Server Error!' });
	}
});

router.post('/subnet', async (req, res) => {
	const subnet = req.body.subnet;

	try {
		if (req.body.scan_type === 'local') {
			const dns_address = req.body.dns_address;
			const ip_list = await local_host_discovery(subnet);
			const assetList = await Promise.all(
				ip_list.map(async (ip) => {
					const asset = await Asset.findOne({ ip });
					if (asset) {
						const date = new Date();
						asset.lastSeen = date.toString();
						await asset.save();
						return asset;
					}
					const newAssetDiscover = await local_net_discovery(ip, dns_address);
					const date = new Date();
					const newAsset = new Asset({
						...newAssetDiscover,
						lastSeen: date.toString(),
					});
					await newAsset.save();
					return newAsset;
				})
			);
			res.send(assetList);
		} else if (req.body.scan_type === 'remote') {
			const ip_list = await remote_host_discovery(subnet);
			const assetList = await Promise.all(
				ip_list.map(async (ip) => {
					const asset = await Asset.findOne({ ip });
					if (asset) {
						const date = new Date();
						asset.lastSeen = date.toString();
						await asset.save();
						return asset;
					}
					const newAssetDiscover = await remote_net_discovery(ip);
					const date = new Date();
					const newAsset = new Asset({
						...newAssetDiscover,
						lastSeen: date.toString(),
					});
					await newAsset.save();
					return newAsset;
				})
			);
			res.send(assetList);
		} else {
			res.status(400).send('wrong scan type!');
		}
	} catch (e) {
		res.status(500).send({ msg: 'Internal Server Error!' });
	}
});

module.exports = router;
