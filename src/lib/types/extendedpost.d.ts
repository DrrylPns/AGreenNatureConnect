import { Comment, Like, Post, Topic, User } from "@prisma/client";

export type ExtendedPost = Post & {
    topic: Topic,
    likes: Like[],
    author: User,
    comments: Comment[],
}