import CarouselHome from "@/components/carousel";
import { getPosts, getPostsCount } from "@/graphql/posts";
import { getTrendingPosts } from "@/graphql/trendingPosts";

export default async function Home() {
  const postds = await getPosts(0, 8)
  const postsCount = await getPostsCount()
  const posts = await getTrendingPosts()
  // const author = await getAuthor()
  // const authorPosts = await getAuthorPosts()
  return (
    <div className="w-9/12 m-auto">
      <CarouselHome posts={posts} />
    </div>
  );
}
