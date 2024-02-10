import { getUser, getUserPosts } from "@/server/actions/user/user";
import UserPage from "@/src/components/pages/user/userPage";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const [user, userPostsCount] = await Promise.all([
    getUser(params.username),
    getUserPosts(params.username),
  ]);

  return <UserPage user={user} userPostsCount={userPostsCount} />;
}
