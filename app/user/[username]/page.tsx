import User from "@/components/user"
import { getAuthor, getAuthorPosts } from "@/graphql/author"

export default async function Page({ params }: { params: { username: string } }) {
    const user = await getAuthor(params.username)

    return (
        <div className="w-11/12 sm:w-10/12 m-auto space-y-16 sm:space-y-32 min-h-screen">
            <User user={user} username={params.username} />
        </div>
    )
}