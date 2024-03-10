"use client"
import { DataTable } from '../inventory/_components/data-table'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Topic, User } from '@prisma/client';
import { columns } from './_components/columns';
import { string } from 'zod';

export type Reports = {
  id: string;
  type: string;
  status: string;
  createdAt: Date;
  reporter: User;
  reported: User;
  post: Post;
}

type Post = {
  id: string;
  title: string
  content: any;
  reports: string;
  isVisible: boolean;
  createdAt: Date;
  author: User; // WARNING: not fetched in route.ts tnatamad n ko d nmn ata need hehe.....
  topic: Topic;
}

const page = () => {

  const { data: reports, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get("/api/employee/handleReport")
      return data as Reports[]
    }
  })

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={reports ?? []} isFetching={isFetching} isReport />
    </div>
  )
}

export default page