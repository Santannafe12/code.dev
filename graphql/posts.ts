"use server";

import { client } from "@/lib/apollo-client";
import { PostsConnection, PostsProps } from "@/types/data";
import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query Posts($skip: Int!, $first: Int!) {
    posts(skip: $skip, first: $first) {
      createdAt
      id
      title
      slug
      description
      image {
        url
      }
      authorRelationship {
        name
        username
      }
      categoriesRelationship {
        title
      }
    }
  }
`;

const GET_POSTS_COUNT = gql`
  query PostsCount {
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export async function getPosts(
  skip: number,
  first: number
): Promise<PostsProps> {
  const { data } = await client.query({
    query: GET_POSTS,
    variables: { skip, first },
  });
  return data;
}

export async function getPostsCount(): Promise<PostsConnection> {
  const { data } = await client.query({
    query: GET_POSTS_COUNT,
  });
  return data;
}
