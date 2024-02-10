import { PostsGraphQL } from "@/src/types/pages/posts/posts";
import { PostsSection } from "../../common/sections/posts/posts";

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
    <div className="m-auto min-h-screen w-11/12 lg:w-10/12">
        <PostsSection
          title="Publicações"
          posts={posts}
          pagination={true}
          search={true}
          postsCount={postsCount}
          totalPages={totalPages}
          priority={true}
        />
    </div>
  );
}
