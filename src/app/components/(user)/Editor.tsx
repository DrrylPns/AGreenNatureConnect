"use client"
import { CreatePostType, PostSchema } from '@/lib/validations/createPostSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import TextareaAutosize from "react-textarea-autosize"
import type EditorJS from '@editorjs/editorjs';
import { uploadFiles } from '@/lib/uploadthing';
import { toast } from '@/lib/hooks/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface EditorProps {
    topicId: string;
}

const Editor: React.FC<EditorProps> = ({ topicId }) => {
    //TODO: middleware for this page
    const ref = useRef<EditorJS>();
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const _titleRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreatePostType>({
        resolver: zodResolver(PostSchema),
        defaultValues: {
            topicId,
            title: '',
            content: null
        }
    })

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default
        const Header = (await import('@editorjs/header')).default
        const Embed = (await import('@editorjs/embed')).default
        const Table = (await import('@editorjs/table')).default
        const List = (await import('@editorjs/list')).default
        const LinkTool = (await import('@editorjs/link')).default
        const InlineCode = (await import('@editorjs/inline-code')).default
        const ImageTool = (await import('@editorjs/image')).default

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editor',
                onReady() {
                    ref.current = editor
                },
                placeholder: 'Type here to write your post...',
                inlineToolbar: true,
                data: { blocks: [] },
                tools: {
                    header: Header,
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: '/api/user/link',
                        },
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                async uploadByFile(file: File) {
                                    //redirect passed img to uploadthing database
                                    const [res] = await uploadFiles([file], 'imageUploader')

                                    return {
                                        success: 1,
                                        file: {
                                            url: res.fileUrl,
                                        },
                                    }
                                },
                            },
                        },
                    },
                    list: List,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed,
                },
            })
        }
    }, [])

    useEffect(() => {
        if (Object.keys(errors).length) {
            for (const [_key, value] of Object.entries(errors)) {
                value
                toast({
                    title: 'Something went wrong.',
                    description: (value as { message: string }).message,
                    variant: 'destructive',
                })
            }
        }
    }, [errors])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true)
        }
    }, [])

    useEffect(() => {
        const init = async () => {
            await initializeEditor()

            setTimeout(() => {
                _titleRef?.current?.focus()
            }, 0)
        }

        if (isMounted) {
            init()

            return () => {
                ref.current?.destroy()
                ref.current = undefined
            }
        }
    }, [isMounted, initializeEditor])

    const { mutate: createPost } = useMutation({
        mutationFn: async ({ title, content, topicId }: CreatePostType) => {
            const payload: CreatePostType = {
                title,
                content,
                topicId,
            }
            const { data } = await axios.post('/api/user/post/create', payload)
            return data
        },
        onError: () => {
            return toast({
                title: "Something went wrong",
                description: "Your post was not published, please try again later",
                variant: "destructive",
            });
        },
        onSuccess: () => {
            // redirect to /discussion/topic/topicName
            const newPathname = pathname.split("/").slice(0, -1).join("/");
            router.push(newPathname);

            return toast({
                description: "Your post has been published.",
            });
        },

    })

    async function onSubmit(data: CreatePostType) {
        const blocks = await ref.current?.save()

        const payload: CreatePostType = {
            title: data.title,
            content: blocks,
            topicId,
        }

        createPost(payload)
    }

    if (!isMounted) {
        return null
    }

    const { ref: titleRef, ...rest } = register('title')

    return (
        <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
            <form
                id="topic-post-form"
                className="w-fit"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="prose prose-stone dark:prose-invert">
                    <TextareaAutosize
                        ref={(e) => {
                            titleRef(e)
                            // @ts-ignore
                            _titleRef.current = e
                        }}
                        {...rest}
                        placeholder='Title'
                        className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
                    />

                    <div id="editor" className='min-h-[500px]' />
                    <p className='text-sm text-gray-500'>
                        Use{' '}
                        <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
                            Tab
                        </kbd>{' '}
                        to open the command menu.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Editor