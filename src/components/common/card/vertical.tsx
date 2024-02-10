import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../_ui/card";
import Link from "next/link";
import { Badge } from "../../_ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../_ui/avatar";
import { PostsGraphQL } from "@/src/types/pages/posts/posts";

type CardVerticalProps = {
  post: PostsGraphQL;
  priority?: boolean;
};

export default function CardVertical({ post, priority }: CardVerticalProps) {
  return (
    <div className="p-1">
      <Card className="relative group overflow-hidden rounded-lg">
        <Image
          width={700}
          height={394}
          sizes="(min-width: 1540px) calc(20.82vw - 24px), (min-width: 1040px) 41.67vw, (min-width: 820px) 698px, 87vw"
          src={post.image.url}
          alt={`Imagem de ${post.title}`}
          priority={!!priority}
          className="rounded-t-md border object-cover"
        />
        {post.trending ? (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-sm px-2 py-1 rounded-bl-md font-semibold cursor-default">
            Em alta
          </div>
        ) : null}
        <CardHeader className="space-y-3">
          <Link href={`/post/${post.slug}`} aria-label="Link para a publicação">
            <CardTitle className="line-clamp-2 min-h-12">{post.title}</CardTitle>
            <span className="sr-only">Link para a publicação</span>
          </Link>
          <CardDescription className="line-clamp-3 min-h-16 text-pretty">
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap max-h-[20px] gap-2 overflow-hidden mb-4">
          {post.categoriesRelationship.map((category, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="max-h-[30px] rounded-md hover:cursor-default"
            >
              {category.title}
            </Badge>
          ))}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={post.userRelationship.avatar.url}
                alt={`Avatar de ${post.userRelationship.name}`}
              />
              <AvatarFallback>{post.userRelationship.name}</AvatarFallback>
            </Avatar>
            <section className="flex flex-col">
              <Link href={`/user/${post.userRelationship.username || "/"}`} aria-label="Link para o perfil do usuário criador desta publicação">
                <small className="text-sm font-medium leading-none">
                  {post.userRelationship.name.length > 25
                    ? post.userRelationship.name.slice(0, 25) + "..."
                    : post.userRelationship.name}
                </small>
                <span className="sr-only">Link para o perfil do usuário criador desta publicação</span>
              </Link>
              <small className="text-sm text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </small>
            </section>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
