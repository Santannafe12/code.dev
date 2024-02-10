import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from "../../../../common/typography/typography";
import Image from "next/image";
import { RichText } from "../../../../common/richText/richText";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../_ui/avatar";
import Link from "next/link";
import { Badge } from "../../../../_ui/badge";
import { PostGraphQL } from "@/src/types/pages/post/post";

type PostSectionProps = {
  post: PostGraphQL;
}

export default function PostSection({ post }: PostSectionProps) {
  return (
    <section className="space-y-8">
      <section>
        <TypographyH1 className="border-none">{post.title}</TypographyH1>
        <TypographyMuted>
          Postado em{" "}
          {new Date(post.createdAt).toLocaleDateString("pt-br", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          .
        </TypographyMuted>
        <TypographyP>{post.description}</TypographyP>
      </section>
      <section>
        <Image
          width={1920}
          height={1080}
          alt={`Imagem sobre: ${post.title}`}
          src={post.image.url}
          className="aspect-video rounded-xl max-h-[450px] object-cover"
        />
        <TypographyMuted className="text-center text-sm mt-2">{`Imagem sobre ${post.title}`}</TypographyMuted>
      </section>
      <section className="space-y-6">
        <RichText
          content={post.content.raw}
          renderers={{
            h1: TypographyH1,
            h2: TypographyH2,
            h3: TypographyH3,
            h4: TypographyH4,
            p: TypographyP,
          }}
        />
      </section>
      <section>
        <div className="flex flex-wrap gap-2">
          {post.categoriesRelationship.map((category, index) => (
            <Badge key={index} variant={"secondary"} className="cursor-default">
              #{category.title}
            </Badge>
          ))}
        </div>
      </section>
      <section>
        <Link
          href={`/user/${post.userRelationship.username}`}
          className="flex items-center gap-2 max-w-fit"
        >
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={post.userRelationship.avatar.url}
              alt="@shadcn"
            />
            <AvatarFallback>{post.userRelationship.name}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-lg font-medium leading-none">
              {post.userRelationship.name}
            </span>
            <span className="text-sm text-muted-foreground block">
              Autor do post
            </span>
          </div>
        </Link>
      </section>
    </section>
  );
}
