import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const getGraphqlUri = () => {
  if (process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL) {
    return process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL;
  }
  if (process.env.NEXT_PUBLIC_STRAPI_URL) {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL.replace(/\/$/, '')}/graphql`;
  }
  return 'http://localhost:1337/graphql';
};

const httpLink = createHttpLink({
  uri: getGraphqlUri(),
});

const isValidJwt = (t) => {
  if (!t || typeof t !== 'string') return false;
  if (t.startsWith('gocart_token_')) return false;
  const parts = t.trim().split('.');
  return parts.length === 3;
};

const authLink = setContext((_, { headers }) => {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('gocart_token');
    if (token && !isValidJwt(token)) {
      localStorage.removeItem('gocart_token');
      token = null;
    }
  }
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (
        err.extensions?.code === 'UNAUTHENTICATED' ||
        err.extensions?.code === 'FORBIDDEN' ||
        err.message?.toLowerCase().includes('credentials') ||
        err.message?.toLowerCase().includes('unauthorized')
      ) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('gocart_token');
        }
      }
    }
  }
  if (networkError && networkError.statusCode === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gocart_token');
    }
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
