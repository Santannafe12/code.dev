"use server";

import { Post } from "@/src/types/data";
import { getClient } from "../graphql/apollo-client";
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
        biography
        shortBio
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

export async function getPost(slug: string): Promise<Post> {
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

  return data.post;
}
