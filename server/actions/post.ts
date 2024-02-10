"use server";

import { PostGraphQL } from "@/src/types/pages/post/post";
import { getClient } from "../graphql/apollo-client";
import { gql } from "@apollo/client";

const GET_POST = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      createdAt
      title
      slug
      description
      content {
        raw
      }
      image {
        url
      }
      userRelationship {
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

export async function getPost(slug: string): Promise<PostGraphQL> {
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
