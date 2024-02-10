import { getPost } from "@/server/actions/post/post";
import { getRelatedPosts } from "@/server/actions/components/carousel/relatedPosts";
import PostPage from "@/src/components/pages/post/postPage";
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SkeletonDemo from "@/src/components/common/skeleton/skeleton";

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const slug = params.slug

    const product = await getPost(slug)

    const previousImages = (await parent).openGraph?.images || []

    return {
      title: product.title,
      description: product.description,
      openGraph: {
        images: [`${product.image.url}`, ...previousImages],
      },
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
    <Suspense fallback={<SkeletonDemo />}>
      <PostPage post={post} relatedPosts={relatedPosts} />;
    </Suspense>
  );
}
