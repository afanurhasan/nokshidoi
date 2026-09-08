import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const getGraphqlUri = () => {
  if (process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL) {
    return process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL;
  }
  if (process.env.NEXT_PUBLIC_STRAPI_URL) {
    return `${process.env.NEXT_PUBLIC_STRAPI_URL.replace(/\/$/, '')}/graphql`;
  }
  return 'https://mustbuy.srv1073421.hstgr.cloud/graphql';
};

const httpLink = createHttpLink({
  uri: getGraphqlUri(),
});

const authLink = setContext((_, { headers }) => {
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('gocart_token');
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
