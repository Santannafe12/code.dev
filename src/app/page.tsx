import { getPosts } from "@/server/actions/posts/posts";
import { getTrendingPosts } from "@/server/actions/components/carousel/trendingPosts";
import HomePage from "../components/pages/home/homePage";
import { Suspense } from "react";
import SkeletonDemo from "../components/common/skeleton/skeleton";

export default async function Home() {
  const [posts, trendingPosts] = await Promise.all([
    getPosts(),
    getTrendingPosts(),
  ]);

  return (
    <Suspense fallback={<SkeletonDemo className="w-11/12 lg:w-10/12 mx-auto" />}>
      <HomePage posts={posts} trendingPosts={trendingPosts} />
    </Suspense>
  )
}
