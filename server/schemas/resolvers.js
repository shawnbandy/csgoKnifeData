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
    },

    //? adding to lists
    addKnifeToPlayer: async (parent, { username, knife }) => {
      const player = await Player.findOne({ username: username });
      console.log(player.knifeList);
    },
  },
};

module.exports = resolvers;
