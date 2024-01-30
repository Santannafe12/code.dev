import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { env } from "process";

// Initialize Apollo Client

const httpLink = createHttpLink({
  uri: env.HYGRAPH_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = env.HYGRAPH_TOKEN;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
