import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import costAnalysis from 'graphql-cost-analysis';

import { SUBSCRIPTIONS_PATH } from '../constants';
import schema from '../graphql/schema';


// Evil hack to make graphql-cost-analysis work with Apollo Server v2
// https://github.com/pa-bru/graphql-cost-analysis/issues/12#issuecomment-420991259
class ProtectedApolloServer extends ApolloServer {
  async createGraphQLServerOptions(req, res) {
    const options = await super.createGraphQLServerOptions(req, res);

    return {
      ...options,
      validationRules: [
        ...options.validationRules,
        costAnalysis({
          maximumCost: 750,
          defaultCost: 1,
          variables: req.body.variables,
        }),
      ],
    };
  }
}

const server = new ProtectedApolloServer({
  schema,
  context: ({ req, res, connection }) => {
    // Set the context here, it should be an object.
  },
  subscriptions: {
    path: SUBSCRIPTIONS_PATH,
    onDisconnect: async (rawSocket, ctx) => {
      // Here you can set if the user offline
    },
    onConnect: async (connectionParams) => {
      // Here you can set if the user online
    },
  },
  validationRules: [depthLimit(10)], // Set your depth limit
});

export default server;
