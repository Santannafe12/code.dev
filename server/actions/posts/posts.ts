"use server";

import { getClient } from "@/server/db/apollo-client/apollo-client";
import { gql } from "@apollo/client";

import { postsPerPage } from "@/src/utils/utils";
import { PostsGraphQL } from "@/src/types/pages/posts/posts";
import { redirect } from "next/navigation";

const GET_POSTS = gql`
  query Posts($skip: Int!, $postsPerPage: Int!, $searchTerm: String) {
    posts(
      skip: $skip
      first: $postsPerPage
      orderBy: createdAt_DESC
      where: { title_contains: $searchTerm }
    ) {
      id
      title
      slug
      description
      trending
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

const GET_POSTS_COUNT = gql`
  query PostsCount($searchTerm: String) {
    postsConnection(where: { title_contains: $searchTerm }) {
      aggregate {
        count
      }
    }
  }
`;

export async function getPosts(
  skip: number = 0,
  searchTerm: string = ""
): Promise<PostsGraphQL[]> {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: GET_POSTS,
      variables: { skip, postsPerPage, searchTerm },
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
    console.error("Erro ao buscar posts", error);
  }

  redirect("/internal-server-error");
}

export async function getPostsCount(searchTerm: string = ""): Promise<number> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_POSTS_COUNT,
    variables: { searchTerm },
    context: {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      },
    },
  });
  return data.postsConnection.aggregate.count || 0;
}
