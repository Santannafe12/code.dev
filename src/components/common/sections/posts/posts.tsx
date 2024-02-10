"use client";

import Link from "next/link";

import { Button } from "../../../_ui/button";

import { TypographyH1 } from "../../typography/typography";

import Search from "../../search/search";
import { PostsGraphQL } from "@/src/types/pages/posts/posts";
import CardHorizontal from "../../card/horizontal";
import Pagination from "../../pagination/pagination";

type PostsProps = {
  posts: PostsGraphQL[];
  pagination?: boolean;
  search?: boolean;
  title: string;
  postsCount?: number;
  totalPages: number;
  priority?: boolean;
};

export function PostsSection({ ...props }: PostsProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <TypographyH1 className="border-none">{props.title}</TypographyH1>
        {props.search ? <Search /> : null}
      </div>
      <div className="flex flex-col gap-8">
        {props.posts.map((post, index) => (
          <CardHorizontal key={index} post={post} priority={!!props.priority} />
        ))}
      </div>
      {props.pagination ? (
        <Pagination totalPages={props.totalPages} />
      ) : (
        <div className="flex w-full justify-center">
          <Link href={"/posts"} aria-label="Link responsável por redirecionar a página de publicações">
            <Button
              variant="default"
              className="self-center text-base"
              size="lg"
              aria-label="Ver mais publicações"
            >
              Ver mais
              <span className="sr-only">Ver mais publicações</span>
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
