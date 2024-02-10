"use server";

import { getClient } from "@/server/db/apollo-client/apollo-client";
import { PostGraphQL } from "@/src/types/pages/post/post";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";

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
  try {
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
  } catch (error) {
    console.error("Erro ao buscar post:", error);
  }
  
  redirect("/500");
}
