import EditorBlog from '@/app/components/(employee)/EditorBlog'
import { Button } from '@/app/components/Ui/Button'
import React from 'react'

const page = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className="flex flex-col items-center justify-center gap-6 bg-gradient-to-r from-[#6CFFBA] to-[#dce7c4] p-11 lg:w-[740px] rounded-3xl">
                <div className='space-y-3 bg-white rounded-lg p-11'>
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
            </div>
        </div>
    )
}

export default page