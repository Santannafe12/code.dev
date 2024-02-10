import Carousel from "@/src/components/carousel/carousel";
import Contact from "@/src/components/forms/form-contact";
import FAQ from "@/src/components/pages/home/faq/faq";
import { PostsSection } from "@/src/components/_ui/posts-section";
import { PostsGraphQL } from "@/src/types/pages/posts/posts";
import { TrendingPostsGraphQL } from "@/src/types/pages/home/home";

export default function HomeContainer({
  posts,
  trendingPosts,
}: {
  posts: PostsGraphQL[];
  trendingPosts: TrendingPostsGraphQL[];
}) {
  return (
    <section className="m-auto min-h-screen w-11/12 space-y-16 sm:space-y-32 lg:w-10/12">
      <Carousel posts={trendingPosts} typography="Posts em Destaque:" />
      <PostsSection
        posts={posts}
        title="Explore as últimas publicações!"
        totalPages={1}
      />
      <Contact />
      <FAQ />
    </section>
  );
}
