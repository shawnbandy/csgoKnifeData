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
  Mutation: {},
};

module.exports = resolvers;
