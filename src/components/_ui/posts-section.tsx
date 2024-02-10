"use client";

import Link from "next/link";

import { Button as ButtonUI } from "../_ui-shadcn/button";

import { TypographyH1 } from "../templates/typography";

import Search from "./search";
import HorizontalCardUI from "./card-horizontal";
import PaginationUI from "./pagination";
import { PostsGraphQL } from "@/src/types/pages/posts/posts";

type PostsProps = {
  posts: PostsGraphQL[];
  pagination?: boolean;
  search?: boolean;
  title: string;
  postsCount?: number;
  totalPages: number;
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
          <HorizontalCardUI key={index} post={post} />
        ))}
      </div>
      {props.pagination ? (
        <PaginationUI totalPages={props.totalPages} />
      ) : (
        <div className="flex w-full justify-center">
          <Link href={"/posts"}>
            <ButtonUI
              variant="default"
              className="self-center text-base"
              size="lg"
            >
              Ver mais
            </ButtonUI>
          </Link>
        </div>
      )}
    </section>
  );
}
