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
    <Suspense fallback={<SkeletonDemo />}>
      <HomePage posts={posts} trendingPosts={trendingPosts} />;
    </Suspense>
  )
}
