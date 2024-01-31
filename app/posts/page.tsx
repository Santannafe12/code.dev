import Posts from "@/components/posts";
import { getPosts, getPostsCount } from "@/graphql/posts";

export default async function Page() {
    const posts = await getPosts(0, 6)
    const postsCount = await getPostsCount()

    return (
        <section className="w-11/12 sm:w-9/12 m-auto space-y-16 sm:space-y-32 min-h-screen">
            <Posts title="Publicações" posts={posts} pagination={true} search={true} />
        </section>
    )
}