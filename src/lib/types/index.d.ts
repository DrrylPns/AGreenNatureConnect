'use server'
import { MouseEventHandler } from 'react'

export interface CustomButtonProps {
    title: string,
    btnType: "button" | "submit",
    containerStyles?: string,
    handleClick?: () => void,
}
export interface Author {
    id: string;
    name: string | null;
    username: string;
    email: string | null;
    emailVerified: boolean | null;
    image: string | null;
    hashedPassword: string | null;
    middleName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    address: string | null;
    role: string;
    createdAt: string;
    updatedAt: string;
  }

export interface Post {
    id: string;
    title: string;
    content: Content;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    author: Author;
    topicId: string;
    comments: Comment[];
    likes: Like[];
    topic: Topic
  }

  export interface Like {
    userId: string;
    postId: string;
  }

  export interface Topic {
    id: string;
    name: string;
    posts: Post[];
    createdAt: string;
    updatedAt: string;
    creatorId: string | null;
  }

export interface Comment {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    author: Author;
    authorId: string;
    post: Post;
    postId: string;
    replyToId: string | null;
    replyTo: Comment | null;
    replies: Comment[];
    commentId: string;
  }

export interface Content {
  time: number,
  blocks: Blocks[],
  version: string
}
export interface Block {
  id: String
  data: Data
  type: String
}
export interface Data {
  text:string,
  file: File 
  caption: string
  stretched: boolean
  withBorder: boolean
  withBackground: boolean
}
export interface File {
  url: string
}