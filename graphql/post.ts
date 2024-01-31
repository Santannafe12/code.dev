"use server";

import { getClient } from "@/lib/apollo-client";
import { PostsProps } from "@/types/data";
import { gql } from "@apollo/client";

const GET_POST = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
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

export async function getPost(slug: string): Promise<PostsProps> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_POST,
    variables: { slug: slug },
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
