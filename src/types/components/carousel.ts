import { Category, Post, User } from "../_data/data";

type CarouselUserPostsRelationship = Pick<User, "id" | "name" | "username" | "avatar">;
type CarouselPostsRelationship= Pick<Category, "id" | "title">;

export type CarouselGraphQL = Pick<Post, "id" | "createdAt" | "title" | "slug" | "description" | "trending" | "image"> & {
    userRelationship: CarouselUserPostsRelationship;
    categoriesRelationship: CarouselPostsRelationship[];
}