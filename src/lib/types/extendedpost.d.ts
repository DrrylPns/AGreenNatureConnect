import { Account, Comment, Reply, Like, Post, Topic, User, NotificationType } from "@prisma/client";

export type ExtendedPost = Post & {
  topic: Topic,
  likes: Like[],
  author: User,
  comments: Comment[],
  accounts: Account
  replies: Reply[],
}

export type ExtendedUser = User & {
  accounts: Account
}

export interface PostIdProps {
  postId: string;
}

export interface CommentIdProps {
  commentId: string;
}


export interface NotificationWithRelations {
  id: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  communityId: string;
  transactionId: string;
  user: User;
  Comment: Comment & {
    author: User
  };
  community: Community;
  transaction: Transaction;
  Post: Post;
}