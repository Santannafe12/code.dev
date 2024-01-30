"use client"

import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { Badge } from "./ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/data";

type CarouselHomeProps = {
    posts: Post[]
}

export default function CarouselHome({ posts }: CarouselHomeProps) {
    return (
        <Carousel
            opts={{
                loop: true
            }}
            plugins={[
                Autoplay({
                    delay: 6000,
                }),
            ]}
            className="w-full"
        >
            <CarouselContent>
                {posts.map((post, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card className="relative group overflow-hidden rounded-lg">
                                <Image src={post.image.url} alt="placeholder" width={900} height={600} className="rounded-t-md border" priority />
                                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-md font-semibold">
                                    Em alta
                                </div>
                                <CardHeader className="space-y-3">
                                    <Link href={post.slug}>
                                        <CardTitle className="hover:underline line-clamp-2 min-h-12">
                                            {post.title}
                                        </CardTitle>
                                    </Link>
                                    <CardDescription className="line-clamp-3 min-h-16 text-pretty">{post.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-2">
                                    {post.categoriesRelationship.slice(0, 3).map((category, index) => (
                                        <Badge key={index} variant="secondary" className="max-h-[30px] rounded-md hover:cursor-default">
                                            {category.title}
                                        </Badge>
                                    ))}
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <section className="flex items-center gap-2">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={post.authorRelationship.avatar.url} alt="@shadcn" />
                                            <AvatarFallback>{post.authorRelationship.name}</AvatarFallback>
                                        </Avatar>
                                        <Link href={post.authorRelationship.username || '/'}>
                                            <small className="text-sm font-medium leading-none">
                                                {post.authorRelationship.name.length > 25
                                                    ? post.authorRelationship.name.slice(0, 25) + '...'
                                                    : post.authorRelationship.name}
                                            </small>
                                        </Link>
                                        <small className="text-xs text-muted-foreground mt-1">
                                            {new Date(post.createdAt).toLocaleDateString('en-us', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </small>
                                    </section>
                                </CardFooter>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}