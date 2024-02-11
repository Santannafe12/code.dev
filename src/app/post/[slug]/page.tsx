import { getPost } from "@/server/actions/post/post";
import { getRelatedPosts } from "@/server/actions/components/carousel/relatedPosts";
import PostPage from "@/src/components/pages/post/postPage";
import { Metadata } from 'next'
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SkeletonDemo from "@/src/components/common/skeleton/skeleton";

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  try {
    const slug = params.slug

    const product = await getPost(slug)

    return {
      title: product.title,
      description: product.description,
    }
  }
  catch (error) {
    console.error('Erro ao gerar metadados:', error);

    return {
      title: 'Erro ao carregar metadados',
      description: 'Ocorreu um erro ao carregar os metadados do artigo.',
    };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    redirect("/404");
  }

  const relatedPosts = await getRelatedPosts(
    post.categoriesRelationship.map((category) => category.title),
    post.slug
  );

  return (
    <Suspense fallback={<SkeletonDemo className="mx-auto w-11/12 sm:w-10/12 md:w-9/12 xl:w-8/12 2xl:w-7/12" />}>
      <PostPage post={post} relatedPosts={relatedPosts} />;
    </Suspense>
  );
}
