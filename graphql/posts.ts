"use server";

import { getClient } from "@/lib/apollo-client";
import { Post, PostsConnection } from "@/types/data";
import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query Posts($skip: Int!, $first: Int!, $searchTerm: String) {
    posts(
      skip: $skip
      first: $first
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
  skip: number,
  first: number,
  searchTerm?: string
): Promise<Post[]> {
  const client = getClient();
  const { data } = await client.query({
    query: GET_POSTS,
    variables: { skip, first, searchTerm },
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

export async function getPostsCount(searchTerm: string): Promise<number> {
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
  return data.postsConnection.aggregate.count;
}
