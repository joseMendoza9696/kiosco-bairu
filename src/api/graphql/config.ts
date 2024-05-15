import {
  InMemoryCache,
  ApolloClient,
  from,
  HttpLink,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { WebSocketLink } from "@apollo/client/link/ws";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const link = from([
  new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_HTTP,
  }),
]);

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_WSS,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    options: {
      reconnect: true,
      reconnectionAttempts: 50,
      lazy: true,
      timeout: 50000,
    },
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  link,
);

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default client;

// import { ApolloClient, InMemoryCache } from '@apollo/client';
//
// const client = new ApolloClient({
//   // uri: 'https://bairu-main-backend-production.up.railway.app/graphql',
//   uri: import.meta.env.VITE_GRAPHQL_HTTP,
//   cache: new InMemoryCache(),
//   headers: {
//     authorization: `Bearer ${localStorage.getItem('token')}`,
//   },
// });
//
// // console.log('estoy en el client:', client);
//
// export default client;
