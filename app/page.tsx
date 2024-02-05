import TrendingPosts from "@/components/home/trending-posts";
import Contact from "@/components/home/contact";
import FAQ from "@/components/home/faq";

import { getPosts } from "@/graphql/posts";
import { getTrendingPosts } from "@/graphql/trendingPosts";
import { Posts } from "@/components/posts";

export default async function Home() {
  const posts = await getPosts()
  const trendingPosts = await getTrendingPosts()

  return (
    <section className="w-11/12 sm:w-9/12 m-auto space-y-16 sm:space-y-32 min-h-screen">
      <TrendingPosts posts={trendingPosts} />
      <Posts posts={posts} title="Explore as últimas publicações!" totalPages={1} />
      <Contact />
      <FAQ />
    </section>
  );
}
