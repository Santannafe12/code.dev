"use client"

import Image from "next/image";
import Link from "next/link";

import Autoplay from "embla-carousel-autoplay"

import { Post } from "@/types/data";
import { TypographyH1 } from "./typography";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

type TrendingPostsProps = {
    posts: Post[]
}

export default function RelatedPosts({ posts }: TrendingPostsProps) {
    return (
        <section>
            <TypographyH1>
                Posts relacionados:
            </TypographyH1>
            <Carousel
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 7000,
                    }),
                ]}
                className="w-full mt-4"
            >
                <CarouselContent>
                    {posts.map((post, index) => (
                        <CarouselItem key={index} className="lg:basis-1/2 2xl:basis-1/4">
                            <div className="p-1">
                                <Card className="relative group overflow-hidden rounded-lg">
                                    <Image
                                        src={post.image.url}
                                        alt="placeholder"
                                        width={1920}
                                        height={600}
                                        className="rounded-t-md border w-full max-h-[600px] object-cover"
                                        priority
                                    />
                                    {post.trending ? (
                                        <div className="absolute top-0 right-0 bg-red-500 text-white text-sm px-2 py-1 rounded-bl-md font-semibold cursor-default">
                                            Em alta
                                        </div>
                                    ) : null}
                                    <CardHeader className="space-y-3">
                                        <Link href={`/post/${post.slug}`}>
                                            <CardTitle className="line-clamp-2 min-h-12">
                                                {post.title}
                                            </CardTitle>
                                        </Link>
                                        <CardDescription className="line-clamp-3 min-h-16 text-pretty">{post.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex flex-wrap max-h-[20px] gap-2 overflow-hidden mb-4">
                                        {post.categoriesRelationship.map((category, index) => (
                                            <Badge key={index} variant="secondary" className="max-h-[30px] rounded-md hover:cursor-default">
                                                {category.title}
                                            </Badge>
                                        ))}
                                    </CardContent>
                                    <CardFooter className="flex flex-wrap items-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={post.authorRelationship.avatar.url} alt="@shadcn" />
                                                <AvatarFallback>{post.authorRelationship.name}</AvatarFallback>
                                            </Avatar>
                                            <Link href={`/user/${post.authorRelationship.username || '/'}`}>
                                                <small className="text-sm font-medium leading-none">
                                                    {post.authorRelationship.name.length > 25
                                                        ? post.authorRelationship.name.slice(0, 25) + '...'
                                                        : post.authorRelationship.name}
                                                </small>
                                            </Link>
                                        </div>
                                        <div className="flex gap-2 items-center text-muted-foreground mt-1">
                                            <span>•</span>
                                            <small>
                                                {new Date(post.createdAt).toLocaleDateString('en-us', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </small>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}