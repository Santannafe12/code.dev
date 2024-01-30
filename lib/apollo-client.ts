import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
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

// THIS CODE BELOW SHOWS ERROR WHEN CACHING ON SERVER

// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

//FIXED PERMANENT CACHE ON SERVER

let client: ApolloClient<any> | null = null;

export const getClient = () => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }

  return client;
};
