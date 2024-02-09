import { getPosts } from "../server/actions/posts";
import { getTrendingPosts } from "../server/actions/trendingPosts";
import HomeContainer from "../containers/home/home-container";

export default async function Home() {
  const [posts, trendingPosts] = await Promise.all([
    getPosts(),
    getTrendingPosts(),
  ]);

  return <HomeContainer posts={posts} trendingPosts={trendingPosts} />;
}
