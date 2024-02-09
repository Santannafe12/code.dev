"use server";

import { getClient } from "../graphql/apollo-client";
import { Post } from "@/types/data";
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
        avatar {
          url
        }
      }
      categoriesRelationship {
        id
        title
      }
    }
  }
`;

export async function getTrendingPosts(): Promise<Post[]> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_TRENDING_POSTS,
    context: {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    },
  });
  return data.posts;
}
