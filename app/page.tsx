import TrendingPosts from "@/components/home/trending-posts";
import Contact from "@/components/home/contact";
import FAQ from "@/components/home/faq";

import { getPosts, getPostsCount } from "@/graphql/posts";
import { getTrendingPosts } from "@/graphql/trendingPosts";
import Posts from "@/components/posts";

export default async function Home() {
  const posts = await getPosts(0, 6)
  const trendingPosts = await getTrendingPosts()
  // const author = await getAuthor()
  // const authorPosts = await getAuthorPosts()
  return (
    <section className="w-11/12 sm:w-9/12 m-auto space-y-16 sm:space-y-32 min-h-screen">
      <TrendingPosts posts={trendingPosts} />
      <Posts posts={posts} title="Explore as últimas publicações!" />
      <Contact />
      <FAQ />
    </section>
  );
}
