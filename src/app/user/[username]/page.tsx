import UserHeader from "@/src/components/user/user-header"
import Tabs from "@/src/components/user/tabs"
import { UserProvider } from "@/src/context/user"
import { getAuthor } from "@/src/server/actions/author"

export default async function Page({ params }: { params: { username: string } }) {
    const user = await getAuthor(params.username)

    return (
        <div className="w-11/12 sm:w-10/12 m-auto space-y-16 sm:space-y-32 min-h-screen">
            <UserProvider user={user} username={params.username}>
                <UserHeader />
                <Tabs />
            </UserProvider>
        </div>
    )
}