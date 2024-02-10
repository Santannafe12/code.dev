import { PostsGraphQL } from "@/src/types/pages/posts/posts";
import { getClient } from "../graphql/apollo-client";
import { gql } from "@apollo/client";

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
}
