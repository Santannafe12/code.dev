import { User } from "../../_data/data";

export type UserGraphQL = Pick<User, "id" | "createdAt" | "name" | "username" | "biography" | "avatar">;