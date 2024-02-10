import { Category, Post, User } from "../../_data/data";

type UserPostRelationship = Pick<User, "id" | "name" | "username" | "avatar">;
type CategoryPostRelationship= Pick<Category, "id" | "title">;

export type PostGraphQL = Pick<Post, "id" | "createdAt" | "title" | "slug" | "image" | "description" | "content"> & {
    userRelationship: UserPostRelationship;
    categoriesRelationship: CategoryPostRelationship[];
}