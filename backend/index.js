const { ApolloServer, gql } = require("apollo-server");
// const skillz = require('./data')

let score = 0;

const typeDefs = gql`
  type Skill {
    title: String
  }
  type Query {
    skillz: [Skill]
    score: Int
  }

  type Mutation {
    increaseScore(score: Int): Int
  }
`;

const resolvers = {
  Query: {
    skillz: () => "Hello",
    score: () => score,
  },
  Mutation: {
    increaseScore: (root, { score: scoreArg }) => {
      score += scoreArg;
      return score;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
