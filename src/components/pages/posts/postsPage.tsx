import { PostsGraphQL } from "@/src/types/pages/posts/posts";
import { PostsSection } from "../../common/sections/posts/posts";
import { NotFoundPosts } from "./sections/notFound/notFound";

export default function PostsPage({
  posts,
  postsCount,
  totalPages,
}: {
  posts: PostsGraphQL[];
  postsCount: number;
  totalPages: number;
}) {
  return (
    <div className="m-auto min-h-screen w-11/12 space-y-16 sm:space-y-32 lg:w-10/12">
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
    </div>
  );
}
