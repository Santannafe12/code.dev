import { postsPerPage } from "@/src/utils/utils";
import { getPosts, getPostsCount } from "@/server/actions/posts/posts";
import PostsPage from "@/src/components/pages/posts/postsPage";
import NotFoundPostsPage from "@/src/components/pages/posts/notFoundPostsPage";
import { Suspense } from "react";
import SkeletonDemo from "@/src/components/common/skeleton/skeleton";

export const metadata = {
  title: "Publicações",
  description: "Explore nossas publicações sobre programação e tecnologia.",
}

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

  if (posts.length === 0) {
    return <NotFoundPostsPage />
  }

  return (
    <Suspense fallback={<SkeletonDemo className="mx-auto w-11/12 lg:w-10/12" />}>
      <PostsPage
        posts={posts}
        postsCount={postsCount}
        totalPages={totalPages}
      />
    </Suspense>
  );
}
