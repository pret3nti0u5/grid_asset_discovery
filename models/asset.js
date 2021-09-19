const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

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
    domain_address: {
      type: String,
      trim: true,
    },
    os: {
      type: String,
      trim: true,
    },
    workgroup: {
      type: String,
      trim: true,
    },
    lastSeen: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

assetSchema.plugin(mongoosastic);
const asset = mongoose.model('asset', assetSchema);

module.exports = asset;
