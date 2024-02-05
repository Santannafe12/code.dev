"use client"

import { useUser } from "@/src/context/user";
import { Avatar, AvatarFallback, AvatarImage } from "../_ui/avatar";
import { TypographyH1, TypographyMuted } from "../typography";

export default function UserHeader() {
    const { user } = useUser()

    return (
        <section className="flex items-center gap-4 mb-8">
            <Avatar className="w-32 h-32">
                <AvatarImage src={user.avatar.url} alt="@shadcn" />
                <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div>
                <TypographyH1 className="border-none">
                    {user.name}
                </TypographyH1>
                <TypographyMuted>
                    @{user.username} - Membro desde {new Date(user.createdAt).toLocaleDateString('en-us', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}.
                </TypographyMuted>
            </div>
        </section>
    )
}