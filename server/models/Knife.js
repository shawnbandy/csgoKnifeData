const { Schema, model } = require('mongoose');

const knifeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },

  skin: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },

  appearanceCount: {
    type: Number,
    required: false,
    unique: false,
  },
});

const Knife = model('Knife', knifeSchema);

module.exports = Knife;
