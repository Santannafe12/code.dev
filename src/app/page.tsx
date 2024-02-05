import Contact from "../components/home/contact";
import FAQ from "../components/home/faq";
import TrendingPosts from "../components/home/trending-posts";
import { Posts } from "../components/posts";
import { getPosts } from "../server/actions/posts";
import { getTrendingPosts } from "../server/actions/trendingPosts";

export default async function Home() {
  const [posts, trendingPosts] = await Promise.all([
    getPosts(),
    getTrendingPosts()
  ])

  return (
    <section className="w-11/12 sm:w-9/12 m-auto space-y-16 sm:space-y-32 min-h-screen">
      <TrendingPosts posts={trendingPosts} />
      <Posts posts={posts} title="Explore as últimas publicações!" totalPages={1} />
      <Contact />
      <FAQ />
    </section>
  );
}
