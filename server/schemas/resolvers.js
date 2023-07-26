const { Knife, Match, Player, Team, Tournament } = require('../models');
const { AuthenticationError, ApolloError } = require('apollo-server-express');

const resolvers = {
  //*Get requests and stuff
  Query: {
    //? query for all
    allTeam: async () => {
      return Team.find({});
    },
    allKnife: async () => {
      return Knife.find({});
    },
    allPlayer: async () => {
      return Player.find({});
    },
    allTournament: async () => {
      return Tournament.find({});
    },

    //? query for singles
    team: async (parent, { teamId }) => {
      return Team.findOne({ _id: teamId });
    },
    knife: async (parent, { knifeId }) => {
      return Knife.findOne({ _id: knifeId });
    },
    player: async (parent, { playerId }) => {
      return Player.findOne({ _id: playerId });
    },
    tournament: async (parent, { tournamentId }) => {
      return Tournament.findOne({ _id: tournamentId });
    },

    //? query for model lists
    //? may be better to search by name instead of ID since teams, players, tournaments have unique names
    teamListPlayer: async (parent, { teamId }) => {
      return Team.findOne({ _id: teamId }).populate('playerList');
    },
    playerListKnife: async (parent, { playerId }) => {
      const player = await Player.findOne({ _id: playerId }).populate(
        'knifeList'
      );
      console.log(player);
      return player;
    },
    tournamentTeamList: async (parent, { tournamentId }) => {
      return Tournament.findOne({ _id: tournamentId }).populate('teamList');
    },
  },

  //*CRUD requests and stuff
  Mutation: {
    //? adding basic stuff
    addTeam: async (parent, { teamName }) => {
      const newTeam = await Team.create({ teamName: teamName });
      return newTeam;
    },
    addPlayer: async (parent, { username }) => {
      const newPlayer = await Player.create({ username: username });
      return newPlayer;
    },
    addKnife: async (parent, { knifeName, knifeSkin }) => {
      const newKnife = await Knife.create({
        name: knifeName,
        skin: knifeSkin,
      });
      return newKnife;
    },
    addTournament: async (parent, { tournamentName }) => {
      const newTournament = await Tournament.create({
        name: tournamentName,
      });
      return newTournament;
    },

    //? adding to lists
    addKnifeToPlayer: async (parent, { username, knifeName, knifeSkin }) => {
      console.log('--------------addKnifeToPlayer');
      console.log('--------------', username);
      //console.log('--------------', knifeName);

      const newKnife = await Knife.create({
        name: knifeName,
        skin: knifeSkin,
        appearanceCount: 1,
      });

      const playerExistingKnifeList = await Player.findOne({
        username: username,
      }).populate('knifeList');

      console.log(playerExistingKnifeList.knifeList);

      //*goes through the knife list of the player. If they already have the knife, then it ups the appearance count, then returns the playerExistingKnifeList
      //TODO current issue is that appearance count does not update. I think it's because i'm trying to add to it, and not using the mongoose .findOneAndUpdate(). This does require me to grab the ID of the player knife, but if I already have the array it shouldn't be that bad. just need an async/await call
      for (let i = 0; i < playerExistingKnifeList.knifeList.length; i++) {
        console.log('in the for loop');
        if (
          playerExistingKnifeList.knifeList[i].name == newKnife.name &&
          playerExistingKnifeList.knifeList[i].skin == newKnife.skin
        ) {
          playerExistingKnifeList.knifeList[i].appearanceCount += 1;
          return playerExistingKnifeList;
        }
      }

      //*else, we add it to the player and return that

      const player = await Player.findOneAndUpdate(
        { username: username },
        { $addToSet: { knifeList: newKnife } },
        { new: true }
      );

      return player;
    },
    addPlayerToTeam: async (parent, { teamName, playerUsername }) => {
      console.log('--------------addPlayerToTeam');
      console.log('--------------', teamName);
      console.log('--------------', playerUsername);

      const player = await Player.findOne({ username: playerUsername });
      const team = await Team.findOne({ teamName: teamName });

      if (!team.playerList.includes(player)) {
        try {
          team.playerList.push(player);
          await team.save();
        } catch (error) {
          console.error('error saving player', error);
        }
      }

      return team;
    },
    addTeamToTournament: async (parent, { tournamentName, teamName }) => {
      console.log('--------------addTeamToTournament');
      console.log('--------------', tournamentName);
      console.log('--------------', teamName);
      const team = await Team.findOne({ teamName: teamName });
      const tournament = await Tournament.findOne({ name: tournamentName });

      if (!tournament.teamList.includes(team)) {
        try {
          tournament.teamList.push(team);
          tournament.save();
        } catch (error) {
          console.error(error);
        }
      }

      return tournament;
    },

    //? editing
    editTeam: async (parent, { teamId, teamNewName }) => {
      const team = await Team.findOneAndUpdate(
        {
          _id: teamId,
        },
        { teamName: teamNewName },
        { new: true }
      );
      return team;
    },
  },
};

module.exports = resolvers;
