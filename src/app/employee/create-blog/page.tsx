import EditorBlog from '@/app/components/(employee)/EditorBlog'
import { Button } from '@/app/components/Ui/Button'
import React from 'react'

const page = () => {
    return (
        <div className="flex flex-col items-start gap-6 pt-[8rem] md:pt-[6rem] px-[25%] pb-20">
            <div className="w-full text-center border-b border-gray-200 pb-5">
                <h3 className="font-bold font-livvic text-center text-xl leading-6 text-gray-900">Create Blog</h3>
            </div>

            {/* Editor.JS */}
            <EditorBlog />

            <div className='w-full flex justify-end'>
                <Button
                    type="submit"
                    className="w-full"
                    variant='newGreen'
                    form='create-blog-form'
                >
                    Post
                </Button>
            </div>
        </div>
    )
}

export default page