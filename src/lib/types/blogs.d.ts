import { User } from "@prisma/client";
import { Session } from "next-auth";

export interface Blogs {
    id: number;
    title: string;
    content: any;
    createdAt: Date;
    updatedAt: Date;
    author: User | undefined;
    session?: Session | null;
}