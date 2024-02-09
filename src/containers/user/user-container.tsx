import UserHeader from "@/src/components/layout/headers/user/header-user";
import UserAbout from "@/src/components/pages/user/user-about/about";
import UserPosts from "@/src/components/pages/user/user-posts/posts";
import { Author, PostsConnection } from "@/types/data";

export default function UserContainer({
  user,
  userPostsCount,
}: {
  user: Author;
  userPostsCount: PostsConnection;
}) {
  return (
    <div className="w-11/12 sm:w-10/12 m-auto min-h-screen space-y-12">
      <UserHeader user={user} />
      <section className="space-y-8">
        <UserAbout user={user} />
        <UserPosts count={userPostsCount.postsConnection.aggregate.count} />
      </section>
    </div>
  );
}
