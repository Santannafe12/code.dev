"use server";

import { env } from "process";

// Initialize Apollo Client
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: env.HYGRAPH_URI,
  cache: new InMemoryCache(),
});

// // GraphQL query
const GET_CATEGORIES = gql`
  query MyQuery {
    categories {
      title
    }
  }
`;


// Function to fetch data
export async function getCategories() {
  const { data } = await client.query({
    query: GET_CATEGORIES,
  });
  console.log("teste")
  return data.categories;
}
