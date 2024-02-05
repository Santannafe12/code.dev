
import PostPage from "@/src/components/post";
import RelatedPosts from "@/src/components/related";
import { getPost } from "@/src/server/actions/post";
import { getRelatedPosts } from "@/src/server/actions/relatedPosts";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)
    const relatedPosts = await getRelatedPosts(post.categoriesRelationship.map(category => category.title), post.slug);

    if (!post) {
        notFound()
    }

    return (
        <div className="w-full space-y-16 sm:space-y-32 min-h-screen">
            <section className="mx-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
                <PostPage post={post} />
            </section>
            <section className="mx-auto w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12">
                {relatedPosts ? <RelatedPosts posts={relatedPosts} /> : null}
            </section>
        </div>
    )
}