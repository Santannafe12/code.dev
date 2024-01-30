"use server";

import { getClient } from "@/lib/apollo-client";
import { PostsProps } from "@/types/data";
import { gql } from "@apollo/client";

const GET_POST = gql`
  query TrendingPosts($id: Int!) {
    post(where: { id: $id }) {
      id
      title
      slug
      trending
      description
      createdAt
      content {
        raw
      }
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

export async function getTrendingPosts(id: number): Promise<PostsProps> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_POST,
    variables: { id: id },
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
