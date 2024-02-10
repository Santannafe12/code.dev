import { getUser, getUserPosts } from "@/server/actions/user";
import UserContainer from "@/src/containers/user/user-container";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const [user, userPostsCount] = await Promise.all([
    getUser(params.username),
    getUserPosts(params.username),
  ]);

  return <UserContainer user={user} userPostsCount={userPostsCount} />;
}
