import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://bairu-main-backend-production.up.railway.app/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// console.log('estoy en el client:', client);

export default client;
