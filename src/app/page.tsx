import { getPosts } from "@/server/actions/posts/posts";
import { getTrendingPosts } from "@/server/actions/components/carousel/trendingPosts";
import HomePage from "../components/pages/home/homePage";

export default async function Home() {
  const [posts, trendingPosts] = await Promise.all([
    getPosts(),
    getTrendingPosts(),
  ]);

  return <HomePage posts={posts} trendingPosts={trendingPosts} />;
}
