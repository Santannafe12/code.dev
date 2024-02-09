import { PostsSection } from "@/src/components/_ui/posts-section";
import { NotFoundPosts } from "@/src/components/pages/posts/not-found/not-found";
import { Post } from "@/src/types/data";

export default function PostsContainer({
  posts,
  postsCount,
  totalPages,
}: {
  posts: Post[];
  postsCount: number;
  totalPages: number;
}) {
  return (
    <section className="m-auto min-h-screen w-11/12 space-y-16 sm:space-y-32 lg:w-10/12">
      {posts && posts.length > 0 ? (
        <PostsSection
          title="Publicações"
          posts={posts}
          pagination={true}
          search={true}
          postsCount={postsCount}
          totalPages={totalPages}
        />
      ) : (
        <NotFoundPosts />
      )}
    </section>
  );
}
