"use server";

import { gql } from "@apollo/client";
import { getClient } from "../graphql/apollo-client";
import { PostsConnection } from "@/src/types/_data/data";
import { UserGraphQL } from "@/src/types/pages/user/user";


const GET_USER = gql`
  query User($username: String!) {
    userAPI(where: { username: $username }) {
      id
      createdAt
      name
      username
      biography
      avatar {
        url
      }
    }
  }
`;

const GET_USER_POSTS = gql`
  query UserPostsConnection(
    $username: String!
  ) {
    postsConnection(
      where: { userRelationship: { username: $username } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export async function getUser(username: string): Promise<UserGraphQL> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_USER,
    variables: { username },
  });
  return data.userAPI;
}

export async function getUserPosts(
  username: string,
): Promise<PostsConnection> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_USER_POSTS,
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
