import { Post } from "@/types/data";
import { TypographyH1, TypographyH2, TypographyMuted, TypographyP } from "./typography";
import Image from "next/image";
import { RichText } from "./rich-text";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function Post({ post }: { post: Post }) {
    return (
        <div className="space-y-8">
            <section>
                <TypographyH1 className="border-none">{post.title}</TypographyH1>
                <TypographyMuted>
                    Postado em {new Date(post.createdAt).toLocaleDateString('pt-br', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}.
                </TypographyMuted>
                <TypographyP>{post.description}</TypographyP>
            </section>
            <section>
                <Image
                    width={1920}
                    height={1080}
                    alt={`Imagem sobre: ${post.title}`}
                    src={post.image.url}
                    className="aspect-video rounded-xl max-h-[450px] object-cover" />
                <TypographyMuted className="text-center">{`Imagem sobre ${post.title}`}</TypographyMuted>
            </section>
            <section className="space-y-6">
                <RichText
                    content={post.content.raw}
                    renderers={{
                        h1: TypographyH1,
                        h2: TypographyH1,
                        h3: TypographyH1,
                        h4: TypographyH1,
                        h5: TypographyH1,
                        h6: TypographyH1,
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
                <Link href={`/user/${post.authorRelationship.username}`} className="flex items-center gap-2 max-w-fit">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={post.authorRelationship.avatar.url} alt="@shadcn" />
                        <AvatarFallback>{post.authorRelationship.name}</AvatarFallback>
                    </Avatar>
                    <div>
                        <span className="text-lg font-medium leading-none">
                            {post.authorRelationship.name}
                        </span>
                        <span className="text-sm text-muted-foreground block">
                            Autor do post
                        </span>
                    </div>
                </Link>
            </section>
        </div>
    )
}