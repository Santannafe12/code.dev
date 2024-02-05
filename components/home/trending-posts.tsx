"use client"

import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Badge } from "../ui/badge";

import { TypographyH1 } from "../typography";

import Autoplay from "embla-carousel-autoplay"

import { Post } from "@/types/data";
import CardUI from "../card";

type TrendingPostsProps = {
    posts: Post[]
}

export default function TrendingPosts({ posts }: TrendingPostsProps) {
    return (
        <section>
            <TypographyH1>
                Posts em destaque:
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
                        <CarouselItem key={index} className="lg:basis-1/2 2xl:basis-1/3">
                            <CardUI post={post} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}