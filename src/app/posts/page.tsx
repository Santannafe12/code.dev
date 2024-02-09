import { postsPerPage } from "@/src/utils/utils";
import { getPosts, getPostsCount } from "@/src/server/actions/posts";
import PostsContainer from "@/src/containers/posts/posts-container";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; query: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const offset = (page - 1) * postsPerPage;

  const [posts, postsCount] = await Promise.all([
    getPosts(offset, searchParams.query),
    getPostsCount(searchParams.query),
  ]);

  const totalPages = Math.ceil(postsCount / postsPerPage);

  return (
    <PostsContainer
      posts={posts}
      postsCount={postsCount}
      totalPages={totalPages}
    />
  );
}
