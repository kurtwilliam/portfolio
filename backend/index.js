const { ApolloServer, gql } = require("apollo-server");

// const skillz = require('./data')

const typeDefs = gql`
  type Skill {
    title: String
  }
  type Query {
    skillz: [Skill]
  }
`;

const resolvers = {
  Query: {
    skillz: () => "Hello",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
