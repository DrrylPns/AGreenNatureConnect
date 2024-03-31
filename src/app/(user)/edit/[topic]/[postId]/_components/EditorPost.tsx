"use client"
import { toast } from '@/lib/hooks/use-toast';
import { uploadFiles } from '@/lib/uploadthing';
import { UpdatePostSchema, UpdatePostType } from '@/lib/validations/createPostSchema';
import type EditorJS from '@editorjs/editorjs';
import { OutputData } from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from "react-textarea-autosize";

interface EditorPostProps {
    initialData?: OutputData;
    id?: string;
    title?: string;
    topic?: string;
}

const EditorPost = ({ initialData, id, title, topic }: EditorPostProps) => {
    const ref = useRef<EditorJS>();
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const _titleRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdatePostType>({
        resolver: zodResolver(UpdatePostSchema),
        defaultValues: {
            title: '',
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
        const QuoteTool = (await import('@editorjs/quote')).default
        const MarkerTool = (await import('@editorjs/marker')).default
        const Underline = (await import('@editorjs/underline')).default

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editor',
                onReady: () => {
                    if (initialData) {
                        if (initialData && _titleRef.current) {
                            _titleRef.current.value = title || '';
                        }

                        if (initialData && initialData.blocks) {
                            //@ts-ignore
                            editor.render(initialData.blocks);
                        }
                    }

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
                                    try {
                                        //redirect passed img to uploadthing database
                                        const [res] = await uploadFiles({
                                            endpoint: "imageUploader",
                                            files: [file],
                                        })

                                        return {
                                            success: 1,
                                            file: {
                                                url: res.url,
                                            }
                                        }
                                    } catch (error: any) {
                                        if (axios.isAxiosError(error) || error.response?.status === 400) {
                                            toast({
                                                title: 'Invalid Action.',
                                                description: 'File size exceeds the allowed limit (4MB)',
                                                variant: 'destructive',
                                            })
                                        } else {
                                            console.error(error.message);
                                        }

                                        return (
                                            toast({
                                                title: 'Invalid Action.',
                                                description: 'File size exceeds the allowed limit (4MB)',
                                                variant: 'destructive',
                                            })
                                        )
                                    }
                                },
                            },
                        },
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                    inlineCode: InlineCode,
                    table: {
                        class: Table,
                        inlineToolbar: true,
                    },
                    embed: Embed,
                    underline: Underline,
                    quote: {
                        class: QuoteTool,
                        inlineToolbar: true,
                    },
                    markerTool: {
                        class: MarkerTool,
                    }
                },
            })
        }
    }, [initialData, title])

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
            await initializeEditor();

            setTimeout(() => {
                _titleRef?.current?.focus();
            }, 0);
        };

        if (isMounted) {
            init();

            return () => {
                ref.current?.destroy();
                ref.current = undefined;
            };
        }
    }, [isMounted, initializeEditor]);

    const { mutate: updatePost, isLoading, isError } = useMutation({
        mutationFn: async ({ id, title, content }: UpdatePostType) => {
            const payload: UpdatePostType = {
                id,
                title,
                content,
            }

            const { data } = await axios.post('/api/user/editPost', payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return toast({
                        title: 'Invalid Action!',
                        description: 'You are not authorized to update the post.',
                        variant: 'destructive',
                    });
                }
            }

            return toast({
                title: 'Something went wrong',
                description: 'Your post was not updated, please try again later',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            setTimeout(() => {
                router.push(`/discussion/${topic}/${id}`);
            }, 1000);

            return toast({
                description: 'Your post has been updated.',
            });
        }
    })

    async function onUpdate(data: UpdatePostType) {
        const blocks = await ref.current?.save()

        const payload = {
            id: id,
            title: data.title,
            content: blocks,
        };

        updatePost(payload)
    }

    const { ref: titleRef, ...rest } = register('title')

    return (
        <form
            id='update-post-form'
            className='w-full'
            onSubmit={handleSubmit(onUpdate)}
        >
            <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
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
            </div >
        </form >
    )
}

export default EditorPost