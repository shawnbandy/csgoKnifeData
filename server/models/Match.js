const { Schema, model } = require('mongoose');

//*may not be added, but would be interesting if I can get it to work
//*idea is to record the match score between teams, and show the most used knife per map if possible
//*may be misleading though cause a team can play a map more than others, making skewed results
const matchSchema = new Schema({
  map: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },

  team1: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },

  team1Score: {
    type: Number,
    required: true,
    unique: false,
  },

  team2: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },

  team2Score: {
    type: Number,
    required: true,
    unique: false,
  },
});

const Match = model('Match', matchSchema);

module.exports = Match;
