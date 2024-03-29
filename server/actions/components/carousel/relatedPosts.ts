import { getClient } from "@/server/db/apollo-client/apollo-client";
import { PostsGraphQL } from "@/src/types/pages/posts/posts";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";

const GET_RELATED_POSTS = gql`
  query RelatedPosts($categoryTitles: [String!]!, $currentPostSlug: String!) {
    posts(
      where: {
        categoriesRelationship_some: { title_in: $categoryTitles }
        slug_not: $currentPostSlug
      }
      first: 7
    ) {
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

export async function getRelatedPosts(
  categoryTitles: string[],
  currentPostSlug: string
): Promise<PostsGraphQL[]> {
  try {
    const client = getClient();
    const { data } = await client.query({
      query: GET_RELATED_POSTS,
      variables: {
        categoryTitles,
        currentPostSlug,
      },
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
    console.error("Erro ao buscar posts relacionados:", error);
  }

  redirect("/internal-server-error");
}
