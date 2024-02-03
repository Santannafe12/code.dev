import Posts from "@/components/posts";
import { getPosts, getPostsCount } from "@/graphql/posts";

export default async function Page({ searchParams }: { searchParams: { page: string, query: string } }) {
    const page = Number(searchParams?.page) || 1
    const postsPerPage = 6
    const query = searchParams?.query || ''

    // Calculate the offset based on the page number
    const offset = (page - 1) * postsPerPage

    // Fetch posts for the current page
    const posts = await getPosts(offset, postsPerPage, query)

    // Fetch total count of posts
    const postsCount = await getPostsCount(query)

    const totalPages = Math.ceil(postsCount / postsPerPage);

    return (
        <section className="w-11/12 sm:w-9/12 m-auto space-y-16 sm:space-y-32 min-h-screen">
            {posts && posts.length > 0 ? (
                <Posts title="Publicações" posts={posts} pagination={true} search={true} postsCount={postsCount} totalPages={totalPages} />
            ) : (
                <p>Nenhuma publicação encontrada</p>
            )}
        </section>
    )
}