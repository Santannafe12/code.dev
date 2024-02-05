"use client"

import { useUser } from "@/src/context/user";
import { fetchAuthorPosts } from "@/src/server/actions/test";
import { PostsConnection } from "@/types/data";
import { useCallback, useEffect, useState } from "react";
import { TypographyH4 } from "../typography";
import { Card, CardFooter, CardHeader, CardTitle } from "../_ui/card";
import { Badge } from "../_ui/badge";
import SkeletonDemo from "../skeleton";
import { Button } from "../_ui/button";
import Link from "next/link";

export default function Posts() {
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