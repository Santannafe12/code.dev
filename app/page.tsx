import CarouselHome from "@/components/carousel";
import { Contact } from "@/components/contact";
import FAQ from "@/components/faq";
import PostsComponent from "@/components/posts";
import Posts from "@/components/posts";
import { getPosts, getPostsCount } from "@/graphql/posts";
import { getTrendingPosts } from "@/graphql/trendingPosts";

export default async function Home() {
  const posts = await getPosts(0, 6)
  const postsCount = await getPostsCount()
  const trendingPosts = await getTrendingPosts()
  // console.log(posts)
  // const author = await getAuthor()
  // const authorPosts = await getAuthorPosts()
  return (
    <div className="w-11/12 sm:w-9/12 m-auto space-y-32">
      <CarouselHome posts={trendingPosts} />
      <PostsComponent posts={posts} />
      <Contact />
      <FAQ />
    </div>
  );
}
