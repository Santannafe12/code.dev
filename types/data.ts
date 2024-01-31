import { RichTextProps } from "@graphcms/rich-text-html-renderer";

type Category = {
  id?: number;
  title?: string;
  postsRelationship?: Post[];
};

type Author = {
  id?: number;
  createdAt?: string;
  name: string;
  username?: string;
  slug?: string;
  email?: string;
  biography?: string;
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
  content?: RichTextProps;
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
};

export type PostsConnection = {
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
