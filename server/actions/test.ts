"use server";

import { getAuthorPosts } from "./author";

export async function fetchAuthorPosts(username: string, first: number, after: string | null) {
  return getAuthorPosts(username, first, after);
}