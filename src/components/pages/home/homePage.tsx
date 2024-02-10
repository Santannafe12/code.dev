import { PostsSection } from "@/src/components/common/sections/posts/posts";
import { PostsGraphQL } from "@/src/types/pages/posts/posts";
import { CarouselGraphQL } from "@/src/types/components/carousel";
import Carousel from "../../common/carousel/carousel";
import Contact from "./sections/form/contact";
import FAQ from "./sections/faq/faq";

export default function HomePage({
  posts,
  trendingPosts,
}: {
  posts: PostsGraphQL[];
  trendingPosts: CarouselGraphQL[];
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
