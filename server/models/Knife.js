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
});

const Knife = model('Knife', knifeSchema);

module.exports = Knife;
