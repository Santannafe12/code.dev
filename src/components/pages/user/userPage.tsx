import { PostsConnection } from "@/src/types/_data/data";
import { UserGraphQL } from "@/src/types/pages/user/user";
import UserHeader from "../../layout/header/user/header-user";
import UserAbout from "./sections/about/about";
import UserPosts from "./sections/posts/posts";

export default function UserPage({
  user,
  userPostsCount,
}: {
  user: UserGraphQL;
  userPostsCount: PostsConnection | string;
}) {
  return (
    <div className="w-11/12 sm:w-10/12 mx-auto min-h-screen space-y-12">
      <UserHeader user={user} />
      <section className="space-y-8">
        <UserAbout user={user} />
        {typeof userPostsCount === 'string' ? (
          <UserPosts count={userPostsCount} />
        ) : (
          <UserPosts count={userPostsCount.postsConnection.aggregate.count} />
        )}
      </section>
    </div>
  );
}
