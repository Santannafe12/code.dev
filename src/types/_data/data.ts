import { ElementNode } from "@graphcms/rich-text-types";

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

export type RichText = {
  content: {
    raw: {
      children: ElementNode[];
    };
  };
};