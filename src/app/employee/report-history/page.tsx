"use client"
import { Card, Title } from '@tremor/react'
import React from 'react'
import { SearchReportHistory } from './_components/SearchReportHistory'
import { Topic, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Reports = {
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
    queryKey: ['reportHistory'],
    queryFn: async () => {
      const { data } = await axios.get("/api/employee/reportHistory")
      return data as Reports[]
    }
  })

  console.log(JSON.stringify(reports))

  return (
    <div className="mt-6">
      <Card>

        <Title>Reports</Title>

        <SearchReportHistory
          //@ts-ignore
          reports={reports}
        />

      </Card>
    </div>
  )
}

export default page