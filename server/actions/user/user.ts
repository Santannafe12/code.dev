"use server";

import { gql } from "@apollo/client";
import { getClient } from "@/server/db/apollo-client/apollo-client";
import { PostsConnection } from "@/src/types/_data/data";
import { UserGraphQL } from "@/src/types/pages/user/user";
import { redirect } from "next/navigation";

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
  query UserPostsConnection($username: String!) {
    postsConnection(where: { userRelationship: { username: $username } }) {
      aggregate {
        count
      }
    }
  }
`;

export async function getUser(username: string): Promise<UserGraphQL> {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: GET_USER,
      variables: { username },
      context: {
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        },
      },
    });
    return data.userAPI;
  } catch (error) {
    console.error("Internal server error", error);
  }

  redirect("/500");
}

export async function getUserPostsCount(
  username: string
): Promise<PostsConnection | string> {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: GET_USER_POSTS,
      variables: { username },
      context: {
        fetchOptions: {
          next: {
            revalidate: 60,
          },
        },
      },
    });
    return data;
  } catch (error) {
    console.error("Erro ao buscar posts do usuário:", error);
    return "Erro ao buscar posts do usuário.";
  }
}
