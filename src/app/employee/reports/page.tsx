"use client"
import { DataTable } from '../inventory/_components/data-table'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Post, User } from '@prisma/client';
import { columns } from './_components/columns';

export type Reports = {
  id: string;
  type: string;
  status: string;
  createdAt: Date;
  reporter: User;
  reported: User;
  post: Post;
}

const page = () => {

  const { data: reports, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get("/api/employee/handleReport")
      return data as Reports[]
    }
  })

  console.log(reports)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={reports ?? []} isFetching={isFetching} />
    </div>
  )
}

export default page