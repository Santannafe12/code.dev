'use client'

import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button as ButtonUI } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

import { TypographyH1, TypographyH4, TypographyMuted } from "./typography"

import { Post } from "@/types/data"
import { Pagination as PaginationUI, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"
import Search from "./search"
import { usePathname, useSearchParams } from "next/navigation"

type PostsProps = {
    posts: Post[]
    pagination?: boolean
    search?: boolean
    title: string
    postsCount?: number
    totalPages: number
}

type PostProps = {
    post: Post
}

export function Posts({ ...props }: PostsProps) {
    return (
        <section className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center">
                <TypographyH1 className="border-none">
                    {props.title}
                </TypographyH1>
                {props.search ? (
                    <Search />
                ) : null
                }
            </div>
            <div className="flex flex-col gap-8">
                {props.posts.map((post, index) => (
                    <HorinzontalCard key={index} post={post} />
                ))}
            </div>
            {props.pagination ? (
                <Pagination totalPages={props.totalPages} />
            ) :
                <Button />
            }
        </section >
    )
}

export function NotFoundPosts() {
    return (
        <div className="space-y-4 flex flex-col md:flex-row justify-between md:items-center">
            <section>
                <TypographyH1 className="border-none">
                    Nenhuma publicação encontrada
                </TypographyH1>
                <TypographyMuted className="border-none">
                    Tente novamente com outros termos de busca.
                </TypographyMuted>
            </section>
            <Search />
        </div>
    )
}

function HorinzontalCard({ post }: PostProps) {
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
                                <div className="hidden md:flex max-h-[30px] min-w-fit text-center bg-red-500 text-white text-sm px-2 py-1 rounded-bl-md rounded-tr-md font-semibold cursor-default">
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
                            <Link href={`/user/${post.authorRelationship.username}`}>
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

function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page') || 1)

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', "1")
        params.set("page", pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const allPages = generatePagination(currentPage, totalPages)

    return (
        <PaginationUI>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={createPageURL(currentPage - 1)}
                        className={currentPage <= 1 ? 'pointer-events-none text-muted-foreground' : ''} />
                </PaginationItem>
                {allPages.map((pageNumber, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href={createPageURL(pageNumber)}
                            isActive={currentPage === pageNumber}
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href={createPageURL(currentPage + 1)}
                        className={currentPage >= totalPages ? 'pointer-events-none text-muted-foreground' : ''}
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationUI>
    )
}

function Button() {
    return (
        <div className="flex w-full justify-center">
            <Link href={'/posts'}>
                <ButtonUI variant="default" className="self-center text-base" size="lg">
                    Ver mais
                </ButtonUI>
            </Link >
        </div>
    )
}

const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};