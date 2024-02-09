import { getPost } from "@/server/actions/post";
import { getRelatedPosts } from "@/server/actions/relatedPosts";
import PostContainer from "@/src/containers/post/post-container";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  const relatedPosts = await getRelatedPosts(
    post.categoriesRelationship.map((category) => category.title),
    post.slug
  );

  return <PostContainer post={post} relatedPosts={relatedPosts} />;
}
