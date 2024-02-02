import { ElementNode } from "@graphcms/rich-text-types";

type Content = {
  content: {
    raw: {
      children: ElementNode[];
    };
  };
};

type Category = {
  id?: number;
  title: string;
  postsRelationship?: Post[];
};

export type Author = {
  id?: number;
  createdAt: string;
  name: string;
  username?: string;
  slug?: string;
  email?: string;
  biography?: string;
  shortBio: string;
  avatar: {
    url: string;
  };
  postsRelationship?: Post[];
};

export type Post = {
  id: number;
  createdAt: string;
  title: string;
  slug: string;
  description: string;
  trending?: boolean;
  image: {
    url: string;
  };
  authorRelationship: Author;
  categoriesRelationship: Category[];
  aggregate?: {
    count?: number;
  };
  pageInfo?: {
    endCursor?: string;
    hasNextPage?: boolean;
  };
  edges?: {
    node?: Post;
  }[];
} & Content;

export type PostsConnection = {
  aggregate: {
    count: number;
  };
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
  edges: {
    node: Post;
  }[];
};

export type PostProps = {
  post: Post;
};

export type PostsProps = {
  posts: Post[];
  postsConnection?: PostsConnection;
};

export type AuthorProps = {
  author: Author;
};
