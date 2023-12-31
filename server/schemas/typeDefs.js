const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Knife {
    _id: ID
    name: String!
    skin: String!
    appearanceCount: Int
  }

  type Player {
    _id: ID
    username: String!
    knifeList: [Knife]
  }

  type Team {
    _id: ID
    teamName: String!
    playerList: [Player]
  }

  type Tournament {
    _id: ID
    name: String!
    teamList: [Team]
  }

  type Match {
    _id: ID
    map: String!
    team1: String!
    team1Score: Int!
    team2: String!
    team2Score: Int!
  }

  type Query {
    allTeam: [Team]
    allKnife: [Knife]
    allPlayer: [Player]
    allTournament: [Tournament]

    team(teamId: ID!): Team
    knife(knifeId: ID!): Knife
    player(playerId: ID!): Player
    tournament(tournamentId: ID!): Tournament

    teamListPlayer(teamId: ID!): Team
    playerListKnife(playerId: ID!): Player
    tournamentTeamList(tournamentId: ID!): Tournament
  }

  type Mutation {
    addTeam(teamName: String!): Team
    addPlayer(username: String!): Player
    addKnife(knifeName: String!, knifeSkin: String!): Knife
    addTournament(tournamentName: String!): Tournament

    addKnifeToPlayer(
      username: String!
      knifeName: String!
      knifeSkin: String!
    ): Player
    addPlayerToTeam(teamName: String!, playerUsername: String!): Team
    addTeamToTournament(tournamentName: String!, teamName: String!): Tournament
    editTeam(teamId: ID!, teamNewName: String!): Team
  }
`;

module.exports = typeDefs;
