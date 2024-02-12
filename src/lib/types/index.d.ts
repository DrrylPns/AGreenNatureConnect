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

export interface Product {
  id: string;
  itemNumber: number;
  productImage: string;
  name: string;
  kilograms: number;
  grams: number;
  pounds: number;
  pieces: number;
  packs: number;
  variants: Variants[]
  category: string;
  status: string;
  isFree: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
  community: Community;
  communityId: string;
}
export interface Community {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  posts: Post[];
  blogs: Blog[];
}
export interface Variants {
  id: string
  unitOfMeasurement: string;
  variant: number;
  price: number;
  EstimatedPieces: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
export interface Cart {
  id: string
  createdAt: string;
  updatedAt: string;
  user: Author;
  variant: Variants;
  variantId: string;
  comunity: Community;
  communityId: string;
}
export interface ShippingInfo {
  id: string
  createdAt: string;
  updatedAt: string;
  name: string;
  address: string;
  phoneNumber: string;
  facebook: string;
  userId: Author;
}

export interface ResultItem {
  communityId: string;
  products: ProductVariant[]

}

export interface ProductVariant {
  productId: string,
  variantId: string
}