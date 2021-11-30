import { InMemoryCache, ApolloClient } from '@apollo/client';

export const client = new ApolloClient({
  uri: '',
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production',
});
