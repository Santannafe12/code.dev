import { Category, Post, User } from "../../_data/data";

type UserPostsRelationship = Pick<User, "id" | "name" | "username" | "avatar">;
type CategoryPostsRelationship= Pick<Category, "id" | "title">;

export type PostsGraphQL = Pick<Post, "id" | "createdAt" | "title" | "slug" | "description" | "trending" | "image"> & {
    userRelationship: UserPostsRelationship;
    categoriesRelationship: CategoryPostsRelationship[];
}