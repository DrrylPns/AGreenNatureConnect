"use client"
import {Card, Metric, Text} from "@tremor/react"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

const CntUserCard = () => {
    const { data: cntTopics, isLoading, isError } = useQuery({
        queryKey: ["topics"],
        queryFn: async () => {
          const {data} = await axios.get("/api/admin/topics")
          return data
        }
      })

  return (
    <Card className="" decoration="top" decorationColor="indigo">
        <Text>Topics</Text>
        <Metric>{isLoading ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
           <>
            {cntTopics}
           </>
        )}</Metric>
    </Card>
  )
}

export default CntUserCard