const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const assetSchema = mongoose.Schema(
  {
    hostname: {
      type: String,
      trim: true,
      es_indexed: true,
    },
    ip: {
      type: String,
      trim: true,
      es_indexed: true,
    },
    mac: {
      type: String,
      trim: true,
      es_indexed: true,
    },
    domain_address: {
      type: String,
      trim: true,
      es_indexed: true,
    },
    os: {
      type: String,
      trim: true,
      es_indexed: true,
    },
    workgroup: {
      type: String,
      trim: true,
      es_indexed: true,
    },
    lastSeen: {
      type: String,
      trim: true,
      es_indexed: true,
    },
  },
  {
    timestamps: true,
  }
);

assetSchema.plugin(mongoosastic);
const asset = mongoose.model('asset', assetSchema);

module.exports = asset;
