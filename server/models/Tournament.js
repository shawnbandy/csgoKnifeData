const { Schema, model } = require('mongoose');

const tournamentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },

  teamList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
});

const Tournament = model('Team', teamSchema);

module.exports = Tournament;
