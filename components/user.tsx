'use client'

import { Author, PostsConnection } from "@/types/data";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { TypographyH1, TypographyH3, TypographyH4, TypographyMuted } from "./typography";
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";

import { UserProvider, useUser } from "@/lib/context";
import { fetchAuthorPosts } from "@/graphql/test";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";

type Tabs = 'about' | 'posts';

export default function User({ user, username }: { user: Author, username: string }) {
    return (
        <UserProvider user={user} username={username}>
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
    const [activeTab, setActiveTab] = useState<Tabs>('about');

    const handleTabChange = (tab: Tabs) => {
        setActiveTab(tab);
    }

    return (
        <div className="flex flex-col">
            <section className="flex items-center gap-1">
                <Button variant="ghost" className="border-none" onClick={() => handleTabChange('about')}>
                    <TypographyH3 className={`${activeTab === 'about' ? "underline" : ""}`}>Início</TypographyH3>
                </Button>
                <Button variant="ghost" className="border-none" onClick={() => handleTabChange("posts")}>
                    <TypographyH3 className={`${activeTab === 'posts' ? "underline" : ""}`}>Posts</TypographyH3>
                </Button>
            </section>
            <section className="px-4 mt-8">
                {activeTab === 'about' ? <About /> : <Posts />}
            </section>
        </div>
    )
}

function About() {
    const { user } = useUser();

    return (
        <div className="space-y-2 w-full">
            <TypographyH3>
                Sobre {user.name}
            </TypographyH3>
            <TypographyMuted className="border w-fit max-w-[1000px] border-input bg-background hover:bg-primary-foreground hover:text-primary cursor-default p-3 rounded-md">
                {user.biography ? `${user.biography}` : "Não conhecemos muito sobre este usuário, mas ele parece ser uma pessoa legal."}
            </TypographyMuted>
        </div>
    );
}

function Posts() {
    const { username } = useUser()

    const [posts, setPosts] = useState<PostsConnection>();
    const [endCursor, setEndCursor] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    const loadInitialPosts = useCallback(async () => {
        try {
            const data = await fetchAuthorPosts(username, 8, null);
            setPosts(data)
            setEndCursor(data.postsConnection.pageInfo.endCursor);
            setHasNextPage(data.postsConnection.pageInfo.hasNextPage);
        } finally {
            setLoading(false);
        }
    }, [username]);

    const loadMorePosts = async () => {
        if (endCursor) {
            setLoading(true);
            try {
                const data = await fetchAuthorPosts(username, 8, endCursor);
                setPosts((prevPosts) => {
                    if (!prevPosts) return data;
                    return {
                        ...data,
                        postsConnection: {
                            ...data.postsConnection,
                            edges: [...prevPosts.postsConnection.edges, ...data.postsConnection.edges],
                        },
                    };
                });
                setEndCursor(data.postsConnection.pageInfo.endCursor);
                setHasNextPage(data.postsConnection.pageInfo.hasNextPage);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadInitialPosts();
    }, [loadInitialPosts]);

    return (
        <div className="space-y-4">
            <TypographyH4>
                {posts ? `Este usuário tem ${posts?.postsConnection.aggregate.count} posts.` : "Carregando posts..."}
            </TypographyH4>
            <section className="flex flex-wrap gap-8">
                {posts ? (
                    posts.postsConnection.edges.map((post, index) => (
                        <Card key={index} className="w-[350px] h-auto">
                            <CardHeader>
                                <Link href={`/post/${post.node.slug}`}>
                                    <CardTitle className="text-lg line-clamp-2 hover:underline">{post.node.title}</CardTitle>
                                </Link>
                            </CardHeader>
                            <CardFooter className="flex flex-wrap max-h-[20px] gap-2 overflow-hidden mb-4">
                                {post.node.categoriesRelationship.map((category, index) => (
                                    <Badge key={index} variant="secondary">{category.title}</Badge>
                                ))}
                            </CardFooter>
                        </Card>
                    ))
                ) : (
                    <SkeletonDemo />
                )}
            </section>
            {hasNextPage && (
                <section>
                    {loading ? <SkeletonDemo /> : (
                        <Button onClick={loadMorePosts} disabled={loading}>
                            Carregar mais
                        </Button>
                    )}
                </section>
            )}
        </div>
    );
}

function SkeletonDemo() {
    return (
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}
