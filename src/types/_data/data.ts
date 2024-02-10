import { RichText } from "./rich-text";

export type Post = {
  id: number;
  createdAt: string;
  title: string;
  slug: string;
  description: string;
  trending: boolean;
  image: {
    url: string;
  };
  userRelationship: User;
  categoriesRelationship: Category[];
} & RichText;

export type PostsConnection = {
  postsConnection: {
    aggregate: {
      count: number;
    };
    pageInfo?: {
      endCursor: string;
      hasNextPage: boolean;
    };
    edges?: {
      node: Post;
    }[];
  };
};

export type User = {
  id: number;
  createdAt: string;
  name: string;
  username: string;
  email: string;
  biography?: string;
  avatar: {
    url: string;
  };
  postsRelationship?: Post[];
};

export type Category = {
  id: number;
  title: string;
  postsRelationship?: Post[];
};