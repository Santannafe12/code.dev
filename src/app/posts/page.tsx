import { postsPerPage } from "@/lib/utils";
import {  Posts } from "@/src/components/posts";
import { NotFoundPosts } from "@/src/components/posts/not-found";
import { getPosts, getPostsCount } from "@/src/server/actions/posts";

export default async function Page({ searchParams }: { searchParams: { page: string, query: string } }) {
    const page = Number(searchParams?.page) || 1
    const offset = (page - 1) * postsPerPage

    const [posts, postsCount] = await Promise.all([
        getPosts(offset, searchParams.query),
        getPostsCount(searchParams.query)
    ])

    const totalPages = Math.ceil(postsCount / postsPerPage);

    return (
        <section className="w-11/12 sm:w-9/12 m-auto space-y-16 sm:space-y-32 min-h-screen">
            {posts && posts.length > 0 ? (
                <Posts title="Publicações" posts={posts} pagination={true} search={true} postsCount={postsCount} totalPages={totalPages} />
            ) : (
                <NotFoundPosts />
            )}
        </section>
    )
}