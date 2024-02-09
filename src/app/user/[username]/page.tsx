import { getAuthor, getAuthorPosts } from "@/server/actions/author";
import UserContainer from "@/src/containers/user/user-container";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const [user, userPostsCount] = await Promise.all([
    getAuthor(params.username),
    getAuthorPosts(params.username),
  ]);

  return <UserContainer user={user} userPostsCount={userPostsCount} />;
}
