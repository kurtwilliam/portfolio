const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Chunk {
    chunkyBoy: String
  }
  type Query {
    chunks: [Chunk]
  }
`;

const resolvers = {
  Query: {
    chunks: () => 'Hello.',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));