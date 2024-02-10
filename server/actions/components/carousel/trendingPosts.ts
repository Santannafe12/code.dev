"use server";

import { PostsGraphQL } from "@/src/types/pages/posts/posts";
import { getClient } from "@/server/db/apollo-client/apollo-client";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";

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

export async function getTrendingPosts(): Promise<PostsGraphQL[]> {
  try {
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
  } catch (error) {
    console.error("Erro ao buscar posts em destaque:", error);
  }

  redirect("/internal-server-error");
}
