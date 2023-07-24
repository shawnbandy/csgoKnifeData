const { Schema, model } = require('mongoose');
const playerSchema = require('./Player.js');

const teamSchema = new Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  playerList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player',
    },
  ],
});

const Team = model('Team', teamSchema);

module.exports = Team;
