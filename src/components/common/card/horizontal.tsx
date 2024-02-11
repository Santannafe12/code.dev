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

type CardHorizontalProps = {
  post: PostsGraphQL
  priority?: boolean
}

export default function CardHorizontal({ post, priority }: CardHorizontalProps) {
  return (
      <Card className="rounded-l-none flex flex-col lg:flex-row relative group overflow-hidden rounded-lg">
        <Image
          width={600}
          height={331}
          sizes="calc(5.81vw + 310px)"
          priority={!!priority}
          src={post.image.url}
          alt={`Imagem de ${post.title}`}
          className="object-cover rounded-l-md hidden lg:block"
        />
        <Image
          width={600}
          height={331}
          sizes="calc(5.81vw + 310px)"
          priority={!!priority}
          src={post.image.url}
          alt={`Imagem de ${post.title}`}
          className="object-cover rounded-l-md block lg:hidden w-full max-h-[350px]"
        />
        {post.trending === true ? (
          <div className="md:hidden absolute top-0 right-0 bg-red-800 text-white text-sm px-2 py-1 rounded-bl-md font-semibold cursor-default">
            Em alta
          </div>
        ) : null}
        <section className="w-full">
          <CardHeader className="space-y-3">
            <section className="flex justify-between gap-2">
              <Link href={`/post/${post.slug}`} className="col-span-8" aria-label="Link para a publicação">
                <CardTitle>{post.title}</CardTitle>
                <span className="sr-only">Link para a publicação</span>
              </Link>
              {post.trending === true ? (
                <div className="hidden md:flex max-h-[30px] min-w-fit text-center bg-red-800 text-white text-sm px-2 py-1 rounded-bl-md rounded-tr-md font-semibold cursor-default">
                  Em alta
                </div>
              ) : null}
            </section>
            <CardDescription className="text-pretty line-clamp-4">
              {post.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
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
              <Link href={`/user/${post.userRelationship.username}`} aria-label="Link para o perfil do usuário criador desta publicação">
                <small className="text-sm font-medium leading-none">
                  {post.userRelationship.name}
                </small>
                <span className="sr-only">Link para o perfil do usuário criador desta publicação</span>
              </Link>
            </div>
            <div className="flex gap-2 items-center text-muted-foreground mt-1">
              <span>•</span>
              <small>
                {new Date(post.createdAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </small>
            </div>
          </CardFooter>
        </section>
      </Card>
  );
}
