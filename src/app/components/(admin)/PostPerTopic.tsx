"use client"
import { useQuery } from "@tanstack/react-query";
import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface postPerTopics {
    name: string,
_count: number & {
    posts: number;
},
}

const PostPerTopic = () => {

    const { data, isLoading, isError} = useQuery({
        queryKey: ['postsPerTopic'],
        queryFn: async () => {
            const {data} = await axios.get("/api/admin/postPerTopic")
            return data as postPerTopics[]
        }
    })

    const formattedData = data ? data.map((topic) => ({
        name: topic.name,
        value: topic._count.posts,
      })) : [];
      

  return (
    <Card className="">
    <Title>Topic Analytics</Title>
    <Flex className="mt-4">
      <Text>
        <Bold>Topics</Bold>
      </Text>
      <Text>
        <Bold>No. of Posts</Bold>
      </Text>
    </Flex>
    {isLoading ? (
            <Loader2 className='m-auto h-7 w-7 animate-spin' />
        ) : (
           <>
            <BarList data={formattedData} className="mt-2" />
           </>
        )}
  </Card>
  )
}

export default PostPerTopic