"use server";

import { client } from "@/lib/apollo-client";
import { PostsProps } from "@/types/data";
import { gql } from "@apollo/client";

const GET_TRENDING_POSTS = gql`
  query TrendingPosts {
    posts(where: { trending: true }, first: 10) {
      id
      title
      slug
      trending
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

export async function getTrendingPosts(): Promise<PostsProps> {
  const { data } = await client.query({
    query: GET_TRENDING_POSTS,
  });
  return data;
}
