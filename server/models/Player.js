const { Schema, model } = require('mongoose');
const knifeSchema = require('./Knife.js');

const playerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  knifeList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Knife',
    },
  ],
});

const Player = model('Player', playerSchema);

module.exports = Player;
