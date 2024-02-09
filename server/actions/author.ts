"use server";

import { gql } from "@apollo/client";
import { getClient } from "../graphql/apollo-client";
import { Author, PostsConnection } from "@/src/types/data";

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
  ) {
    postsConnection(
      where: { authorRelationship: { username: $username } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export async function getAuthor(username: string): Promise<Author> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_AUTHOR,
    variables: { username },
  });
  return data.author;
}

export async function getAuthorPosts(
  username: string,
): Promise<PostsConnection> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_AUTHOR_POSTS,
    variables: { username},
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
