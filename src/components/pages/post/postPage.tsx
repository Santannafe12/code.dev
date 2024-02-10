import Carousel from "@/src/components/common/carousel/carousel";
import { PostGraphQL } from "@/src/types/pages/post/post";
import { PostsGraphQL } from "@/src/types/pages/posts/posts";
import PostSection from "./sections/post/post";

export default function PostPage({
  post,
  relatedPosts,
}: {
  post: PostGraphQL;
  relatedPosts: PostsGraphQL[];
}) {
  return (
    <div className="w-full space-y-16 sm:space-y-32 min-h-screen">
      <section className="mx-auto w-11/12 sm:w-10/12 md:w-9/12 xl:w-8/12 2xl:w-7/12">
        <PostSection post={post} />
      </section>
      <section className="mx-auto w-11/12 sm:w-10/12 md:w-9/12 xl:w-8/12 2xl:w-7/12">
        {relatedPosts.length > 0 ? (
          <Carousel posts={relatedPosts} typography="Posts Similares:" />
        ) : null}
      </section>
    </div>
  );
}
