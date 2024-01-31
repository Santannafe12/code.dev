import Post from "@/components/post";
import { getPost } from "@/graphql/post";

export default async function Page({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug)
    console.log(post)
    return (
        <section className="w-11/12 sm:w-9/12 m-auto space-y-16 sm:space-y-32 min-h-screen">
            {post ? <Post /> : <div>Post not found</div>}
        </section>
    )
}