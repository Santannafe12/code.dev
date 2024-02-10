import { getPost } from "@/server/actions/post/post";
import { getRelatedPosts } from "@/server/actions/components/carousel/relatedPosts";
import PostPage from "@/src/components/pages/post/postPage";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  const relatedPosts = await getRelatedPosts(
    post.categoriesRelationship.map((category) => category.title),
    post.slug
  );

  return <PostPage post={post} relatedPosts={relatedPosts} />;
}
