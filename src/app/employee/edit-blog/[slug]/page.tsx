import EditorBlog from "@/app/components/(employee)/EditorBlog"
import { Button } from "@/app/components/Ui/Button"
import prisma from "@/lib/db/db"
import { notFound } from "next/navigation"

interface PageProps {
    params: {
        slug: string
    }
}

const page = async ({ params }: PageProps) => {

    const blogById = await prisma.blog.findFirst({
        where: {
            id: params.slug
        },
    })

    if (!blogById) return notFound()

    const editorJSBlocks = blogById.content as any[];

    const initialData = {
        version: '2.27.0',
        time: Date.now(),
        blocks: editorJSBlocks,
    };

    return (
        <div className="flex flex-col items-start gap-6 pt-[8rem] md:pt-[6rem] px-[25%] pb-20">
            <div className="w-full text-center border-b border-gray-200 pb-5">
                <h3 className="font-bold font-livvic text-center text-xl leading-6 text-gray-900">Update Blog</h3>
            </div>

            {/* Editor.JS */}
            <EditorBlog initialData={initialData} title={blogById.title} id={blogById.id} />

            <div className='w-full flex justify-end'>
                <Button
                    type="submit"
                    className="w-full"
                    variant='green'
                    form='update-blog-form'
                >
                    Update
                </Button>
            </div>
        </div>
    )
}

export default page