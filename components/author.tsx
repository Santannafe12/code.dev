'use client'

import { Author, PostsConnection } from "@/types/data";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TypographyH1, TypographyH2, TypographyMuted } from "./typography";
import { Button } from "./ui/button";
import { createContext, useContext, useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";

import { Badge } from "./ui/badge";
import Link from "next/link";

type Tabs = 'start' | 'posts';

interface UserContextProps {
    user: Author;
    userPosts: PostsConnection;  // Add userPosts to the context
    children: React.ReactNode;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<UserContextProps> = ({ user, userPosts, children }) => {
    return <UserContext.Provider value={{ user, userPosts, children }}>{children}</UserContext.Provider>;
};

export default function User({ user, userPosts }: { user: Author, userPosts: PostsConnection }) {
    console.log(userPosts.edges[0])
    return (
        <UserProvider user={user} userPosts={userPosts}>
            <div>
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
                <Tabs />
            </div>
        </UserProvider>
    )
}

function Tabs() {
    const [activeTab, setActiveTab] = useState<Tabs>('posts');

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
    }

    return (
        <div className="flex flex-col">
            <section className="flex items-center gap-1">
                <Button variant="ghost" className="border-none" onClick={() => handleTabChange('start')}>
                    <TypographyH2 className={`${activeTab === 'start' ? "underline" : ""}`}>Início</TypographyH2>
                </Button>
                <Button variant="ghost" className="border-none" onClick={() => handleTabChange("posts")}>
                    <TypographyH2 className={`${activeTab === 'posts' ? "underline" : ""}`}>Posts</TypographyH2>
                </Button>
            </section>
            <section className="px-4 mt-8">
                {activeTab === 'start' ? <Start /> : <Posts />}
            </section>
        </div>
    )
}

function Start() {
    const { user } = useUser();

    return (
        <div className="space-y-2">
            <TypographyH2>
                Sobre {user.name}
            </TypographyH2>
            <Button variant={"outline"} className="cursor-default">
                <TypographyMuted>
                    {`"${user.biography}"`}
                </TypographyMuted>
            </Button>
        </div>
    );
}

function Posts() {
    const { userPosts } = useUser();

    return (
        <div>
            <TypographyH2 className="mb-2">
                Este usuário tem X posts associados:
            </TypographyH2>
            <section className="flex flex-wrap gap-8">
                {userPosts.edges.map((post, index) => (
                    <Card key={index} className="w-[350px] h-auto">
                        <CardHeader>
                            <Link href={`/post/${post.node.slug}`}><CardTitle className="text-lg line-clamp-2 hover:underline">{post.node.title}</CardTitle></Link>
                        </CardHeader>
                        <CardFooter className="flex flex-wrap max-h-[20px] gap-2 overflow-hidden mb-4">
                            {post.node.categoriesRelationship.map((category, index) => (
                                <Badge key={index} variant="secondary">{category.title}</Badge>
                            ))}
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </div>
    );
}