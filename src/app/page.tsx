import { getPosts } from "@/server/actions/posts";
import HomeContainer from "../containers/home/home-container";
import { getTrendingPosts } from "@/server/actions/trendingPosts";

export default async function Home() {
  const [posts, trendingPosts] = await Promise.all([
    getPosts(),
    getTrendingPosts(),
  ]);

  return <HomeContainer posts={posts} trendingPosts={trendingPosts} />;
}
