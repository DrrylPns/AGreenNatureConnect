"use client";
import { Button } from "@/app/components/Ui/Button";
import { LoadingComponent } from "@/components/LoadingComponent";
import { PageNotFound } from "@/components/PageNotFound";
import { PostTypes } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import EditorPost from "./_components/EditorPost";
import { useSession } from "next-auth/react";

interface Props {
  params: {
    postId: string,
    topic: string
  };
}

const page: FC<Props> = ({ params }) => {
  const { data: session } = useSession()
  // const [post, setPosts] = useState<Post>();
  // const router = useRouter();
  // const { data: session } = useSession();

  // const fetchPost = useCallback(async () => {
  //   try {
  //     const response = await fetch(`/api/user/post/${params.postId}`, {
  //       next: { tags: ["comments"], revalidate: 60 },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     setPosts(data);
  //   } catch (error) {
  //     console.error("Error fetching post:", error);
  //   }
  // }, [params.postId]);

  // useEffect(() => {
  //   fetchPost();
  // }, [fetchPost]);

  const { data: post, isFetching, isError } = useQuery({
    queryKey: ["edit-posts"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/user/post/${params.postId}`)
      return data as PostTypes
    },
    refetchOnWindowFocus: false
  })

  if (isFetching) <LoadingComponent />

  if (isError) return <PageNotFound />

  if (post?.authorId !== session?.user.id) return <PageNotFound />

  const editorJSBlocks = post?.content as any

  const initialData = {
    version: '2.27.0',
    time: Date.now(),
    blocks: editorJSBlocks,
  };

  return (
    <main>
      <div className="flex flex-col items-start gap-6 pt-[8rem] md:pt-[6rem] px-[25%] pb-20">
        <div className="w-full text-center border-b border-gray-200 pb-5">
          <h3 className="font-bold font-livvic text-center text-xl leading-6 text-gray-900">Update Post</h3>
        </div>

        {/* Editor.JS */}
        <EditorPost initialData={initialData} title={post?.title} id={post?.id} topic={post?.topic.name} />

        <div className='w-full flex justify-end'>
          <Button
            type="submit"
            className="w-full"
            variant='green'
            form='update-post-form'
          >
            Update
          </Button>
        </div>
      </div>
    </main>
  );
};
export default page;
