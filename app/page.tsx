import { getPosts, getPostsCount } from "@/graphql/posts";
import { getTrendingPosts } from "@/graphql/trendingPosts";

export default async function Home() {
  const posts = await getPosts(0, 8)
  const postsCount = await getPostsCount()
  const trending = await getTrendingPosts()
  // const author = await getAuthor()
  // const authorPosts = await getAuthorPosts()
  return (
<></>
  );
}
