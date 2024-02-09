import Carousel from "@/src/components/carousel/carousel";
import PostSection from "@/src/components/pages/post/post-section/post";
import { Post } from "@/src/types/data";

export default function PostContainer({
  post,
  relatedPosts,
}: {
  post: Post;
  relatedPosts: Post[];
}) {
  return (
    <div className="w-full space-y-16 sm:space-y-32 min-h-screen">
      <section className="mx-auto w-11/12 sm:w-10/12 md:w-9/12 xl:w-8/12 2xl:w-7/12">
        <PostSection post={post} />
      </section>
      <section className="mx-auto w-11/12 sm:w-10/12 md:w-9/12 xl:w-8/12 2xl:w-7/12">
        {relatedPosts ? (
          <Carousel posts={relatedPosts} typography="Posts Similares:" />
        ) : null}
      </section>
    </div>
  );
}
