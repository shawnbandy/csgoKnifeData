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
      return Player.findOne({ _id: playerId }).populate('knifeList');
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
    addKnifeToPlayer: async (parent, { username, knife }) => {
      console.log('--------------addKnifeToPlayer');
      console.log('--------------', username);
      console.log('--------------', knife);

      const newKnife = await Knife.create({
        name: knife.name,
        skin: knife.skin,
        appearanceCount: 1,
      });

      const player = await Player.findOne({ username: username }).populate(
        'knifeList'
      );

      for (let i = 0; i < player.knifeList.length; i++) {
        if (
          player.knifeList[i].name == newKnife.name &&
          player.knifeList[i].skin == newKnife.skin
        ) {
          console.log('Knife duplicate detected, upping appearance count');
          player.knifeList[i].appearanceCount++;
        } else {
          try {
            player.knifeList.push(newKnife);
            await player.save();
          } catch (error) {
            console.error('error saving knife to player', error);
          }
        }
      }

      //TODO: check to see if the player already has the knife name&skin within their knifeList. If yes, then update the knife's appearance count under that player. This would hopefully prevent duplicate entries

      // const player = await Player.findOneAndUpdate(
      //   { username: username },
      //   { $addToSet: { knifeList: newKnife._id } },
      //   { new: true }
      // );

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
