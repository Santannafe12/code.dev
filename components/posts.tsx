import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Post } from "@/types/data"
import { Button } from "./ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Heading } from "./typography"

type PostsProps = {
    posts: Post[]
}

type HorinzontalCardProps = {
    post: Post
}

export default function Posts({ posts }: PostsProps) {
    return (
        <section>
            <Heading title="Explore todas as publicações!" />
            <div className="flex flex-col gap-8">
                {posts.map((post, index) => (
                    <HorinzontalCard key={index} post={post} />
                ))}
            </div>
            <div className="flex w-full justify-center">
                <Link href={'/posts'}>
                    <Button variant="default" className="mt-6 self-center text-base" size="lg">
                        Ver mais
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export function HorinzontalCard({ post }: HorinzontalCardProps) {
    return (
        <section>
            <Card className="md:grow md:rounded-r-md md:rounded-l-none md:overflow-auto flex flex-col xl:flex-row w-full relative group overflow-hidden rounded-lg">
                <Image
                    width={1920}
                    height={1080}
                    src={post.image.url}
                    alt={`Imagem de ${post.title}`}
                    priority
                    className="aspect-video w-full max-h-[250px] object-cover xl:max-h-max xl:max-w-[450px] rounded-l-md"
                />
                {post.trending === true ? (
                    <div className="md:hidden absolute top-0 right-0 bg-red-500 text-white text-sm px-2 py-1 rounded-bl-md font-semibold cursor-default">
                        Em alta
                    </div>
                ) : null}
                <section className="w-full">
                    <CardHeader className="space-y-3">
                        <section className="flex justify-between gap-2">
                            <Link href={`/post/${post.slug}`} className="col-span-8">
                                <CardTitle>{post.title}</CardTitle>
                            </Link>
                            {post.trending === true ? (
                                <div className="hidden md:flex max-h-[30px] min-w-fit text-center bg-red-500 text-white text-sm px-2 py-1 rounded-bl-md font-semibold cursor-default">
                                    Em alta
                                </div>
                            ) : null}
                        </section>
                        <CardDescription className="text-pretty line-clamp-4">{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
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
                            <Link href={post.authorRelationship.username || '/'}>
                                <small className="text-sm font-medium leading-none">
                                    {post.authorRelationship.name}
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
                </section>
            </Card>
        </section>
    )
}