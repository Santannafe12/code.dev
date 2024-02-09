import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../_ui-shadcn/card";
import Link from "next/link";
import { Badge } from "../_ui-shadcn/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../_ui-shadcn/avatar";
import { Post } from "@/types/data";

export default function CardVertical({ post }: { post: Post }) {
  return (
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
                src={post.authorRelationship.avatar.url}
                alt="@shadcn"
              />
              <AvatarFallback>{post.authorRelationship.name}</AvatarFallback>
            </Avatar>
            <section className="flex flex-col">
              <Link href={`/user/${post.authorRelationship.username || "/"}`}>
                <small className="text-sm font-medium leading-none">
                  {post.authorRelationship.name.length > 25
                    ? post.authorRelationship.name.slice(0, 25) + "..."
                    : post.authorRelationship.name}
                </small>
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
