const db = require('../config/connection');
const { Knife, Player, Team, Tournament } = require('../models');
const knifeSeed = require('./knife.json');
const playerSeed = require('./player.json');
const teamSeed = require('./team.json');
const tournamentSeed = require('./tournament.json');

db.once('open', async () => {
  try {
    await Knife.deleteMany({});
    await Knife.create(knifeSeed);
    await Player.deleteMany({});
    await Player.create(playerSeed);
    await Team.deleteMany({});
    await Team.create(teamSeed);
    await Tournament.deleteMany({});
    await Tournament.create(tournamentSeed);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
