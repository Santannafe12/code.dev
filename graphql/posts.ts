"use server";

import { getClient } from "@/lib/apollo-client";
import { PostsConnection, PostsProps } from "@/types/data";
import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query Posts($skip: Int!, $first: Int!) {
    posts(skip: $skip, first: $first) {
      id
      title
      slug
      description
      createdAt
      image {
        url
      }
      authorRelationship {
        id
        name
        username
      }
      categoriesRelationship {
        id
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
  const client = getClient();
  const { data } = await client.query({
    query: GET_POSTS,
    variables: { skip, first },
  });
  return data;
}

export async function getPostsCount(): Promise<PostsConnection> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_POSTS_COUNT,
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
