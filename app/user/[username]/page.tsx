import User from "@/components/author"
import { getAuthor, getAuthorPosts } from "@/graphql/author"

export default async function Page({ params }: { params: { username: string } }) {
    const user = await getAuthor(params.username)
    const userPosts = await getAuthorPosts(params.username, 10, null)

    return (
        <div className="w-11/12 sm:w-9/12 m-auto space-y-16 sm:space-y-32 min-h-screen">
            <User user={user} userPosts={userPosts} />
        </div>
    )
}