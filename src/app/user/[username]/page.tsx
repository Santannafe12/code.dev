import { getUser, getUserPostsCount } from "@/server/actions/user/user";
import SkeletonDemo from "@/src/components/common/skeleton/skeleton";
import UserPage from "@/src/components/pages/user/userPage";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: { username: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  try {
    const username = params.username

    const user = await getUser(username)

    return {
      title: user.username,
      description: user.biography || "Não conhecemos muito sobre este usuário, mas ele parece ser uma pessoa legal.",
    }
  }
  catch (error) {
    console.error('Erro ao gerar metadados:', error);

    return {
      title: 'Erro ao carregar metadados',
      description: 'Ocorreu um erro ao carregar os metadados do usuário.',
    };
  }
}

export default async function Page({
  params
}:
  Props
) {
  const [user, userPostsCount] = await Promise.all([
    getUser(params.username),
    getUserPostsCount(params.username),
  ]);

  if (!user) {
    redirect("/404");
  }

  return (
    <Suspense fallback={<SkeletonDemo className="w-11/12 sm:w-10/12 mx-auto" />}>
      <UserPage user={user} userPostsCount={userPostsCount} />
    </Suspense>
  )
}
