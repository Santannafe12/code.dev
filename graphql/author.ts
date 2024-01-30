"use server";

import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const GET_AUTHOR = gql`
  query Author($username: String!) {
    author(where: { username: $username }) {
      id
      name
      username
      biography
      createdAt
      avatar {
        url
      }
    }
  }
`;

const GET_AUTHOR_POSTS = gql`
  query AuthorPostsConnection(
    $username: String!
    $first: Int!
    $after: String
  ) {
    postsConnection(
      first: $first
      after: $after
      where: { authorRelationship: { username: $username } }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          createdAt
          title
          slug
          description
          trending
        }
      }
    }
  }
`;

export async function getAuthor(username: string) {
  const client = getClient();
  const { data } = await client.query({
    query: GET_AUTHOR,
    variables: { username },
  });
  return data;
}

export async function getAuthorPosts(
  username: string,
  first: number,
  after: string | null
) {
  const client = getClient();
  const { data } = await client.query({
    query: GET_AUTHOR_POSTS,
    variables: { username, first, after },
    context: {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    },
  });
  return data;
}
