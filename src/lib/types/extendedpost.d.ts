import { Account, Comment, Reply, Like, Post, Topic, User, NotificationType, Reaction, Prisma } from "@prisma/client";

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
  community: Community;
  transaction: Transaction;
  Reaction: Reaction & {
    user: User
  };
  Reply: Reply & {
    user: User;
  }
  Comment: Comment & {
    post: Post;
    author: User;
  };
  Post: Post & {
    author: User;
    topic: Topic;
  };
}

export type NotificationsWithRelation = Prisma.NotificationGetPayload<{
  include: {
    user: true;
    community: true;
    transaction: true;
    Reaction: {
      include: {
        post: {
          include: {
            topic: true
          }
        },
        user: true
      }
    },
    Reply: {
      include: {
        user: true;
        comment: {
          include: {
            post: {
              include: {
                topic: true
              }
            }
          }
        }
      }
    };
    Comment: {
      include: {
        post: {
          include: {
            topic: true
          }
        },
        author: true
      }
    };
    Post: {
      include: {
        author: true,
        topic: true,
      }
    };
  }
}>