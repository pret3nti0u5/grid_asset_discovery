const mongoose = require('mongoose');

const assetSchema = mongoose.Schema(
  {
    hostname: {
      type: String,
      trim: true,
    },
    ip: {
      type: String,
      trim: true,
    },
    mac: {
      type: String,
      trim: true,
    },
    openPorts: [
      {
        port: String,
        protocol: String,
        service: 'String',
        method: String,
      },
    ],
    osNmap: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const asset = mongoose.model('asset', assetSchema);

module.exports = asset;
