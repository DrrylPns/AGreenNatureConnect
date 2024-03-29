"use client"
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import type EditorJS from '@editorjs/editorjs';
import { BlogSchema, CreateBlogType, UpdateBlogType } from '@/lib/validations/createBlog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import TextareaAutosize from "react-textarea-autosize"
import { UploadDropzone, uploadFiles } from '@/lib/uploadthing';
import { toast } from '@/lib/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { OutputData } from '@editorjs/editorjs';
import Image from 'next/image';
import { Button } from '../Ui/Button';

interface EditorBlogProps {
    initialData?: OutputData;
    id?: string;
    title?: string;
}

const EditorBlog = ({ initialData, id, title }: EditorBlogProps) => {
    const ref = useRef<EditorJS>();
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const _titleRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateBlogType>({
        resolver: zodResolver(BlogSchema),
        defaultValues: {
            title: '',
            content: null
        }
    })

    // const initializeEditor = useCallback(async () => {
    //     const EditorJS = (await import('@editorjs/editorjs')).default
    //     const Header = (await import('@editorjs/header')).default
    //     const Embed = (await import('@editorjs/embed')).default
    //     const Table = (await import('@editorjs/table')).default
    //     const List = (await import('@editorjs/list')).default
    //     const LinkTool = (await import('@editorjs/link')).default
    //     const InlineCode = (await import('@editorjs/inline-code')).default
    //     const ImageTool = (await import('@editorjs/image')).default
    //     const QuoteTool = (await import('@editorjs/quote')).default
    //     const MarkerTool = (await import('@editorjs/marker')).default
    //     const Underline = (await import('@editorjs/underline')).default

    //     if (!ref.current) {
    //         const editor = new EditorJS({
    //             holder: 'editor',
    //             onReady() {
    //                 ref.current = editor
    //             },
    //             placeholder: 'Type here to write your post...',
    //             inlineToolbar: true,
    //             data: { blocks: [] },
    //             tools: {
    //                 header: Header,
    //                 linkTool: {
    //                     class: LinkTool,
    //                     config: {
    //                         endpoint: '/api/user/link',
    //                     },
    //                 },
    //                 image: {
    //                     class: ImageTool,
    //                     config: {
    //                         uploader: {
    //                             async uploadByFile(file: File) {
    //                                 try {
    //                                     //redirect passed img to uploadthing database
    //                                     const [res] = await uploadFiles({
    //                                         endpoint: "imageUploader",
    //                                         files: [file],
    //                                     })

    //                                     return {
    //                                         success: 1,
    //                                         file: {
    //                                             url: res.url,
    //                                         }
    //                                     }
    //                                 } catch (error: any) {
    //                                     if (axios.isAxiosError(error) || error.response?.status === 400) {
    //                                         toast({
    //                                             title: 'Invalid Action.',
    //                                             description: 'File size exceeds the allowed limit (4MB)',
    //                                             variant: 'destructive',
    //                                         })
    //                                     } else {
    //                                         console.error(error.message);
    //                                     }

    //                                     return (
    //                                         toast({
    //                                             title: 'Invalid Action.',
    //                                             description: 'File size exceeds the allowed limit (4MB)',
    //                                             variant: 'destructive',
    //                                         })
    //                                     )
    //                                 }
    //                             },
    //                         },
    //                     },
    //                 },
    //                 list: {
    //                     class: List,
    //                     inlineToolbar: true,
    //                 },
    //                 inlineCode: InlineCode,
    //                 table: {
    //                     class: Table,
    //                     inlineToolbar: true,
    //                 },
    //                 embed: Embed,
    //                 underline: Underline,
    //                 quote: {
    //                     class: QuoteTool,
    //                     inlineToolbar: true,
    //                 },
    //                 markerTool: {
    //                     class: MarkerTool,
    //                 }
    //             },
    //         })
    //     }
    // }, [])

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

    const { mutate: createBlog } = useMutation({
        mutationFn: async ({ title, content, thumbnail }: CreateBlogType) => {
            const payload: CreateBlogType = {
                title,
                content,
                thumbnail,
            }
            const { data } = await axios.post('/api/employee/createBlog', payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return toast({
                        title: "Invalid Action!",
                        description: "You are not authorized to create a blog.",
                        variant: "destructive",
                    });
                }
            }

            return toast({
                title: "Something went wrong",
                description: "Your blog was not published, please try again later",
                variant: "destructive",
            });
        },
        onSuccess: () => {
            //queryClient.invalidateQueries(['getBlogs']);

            toast({
                description: "Your post has been published.",
            });

            setTimeout(() => {
                window.location.reload()
            }, 2000)
        },
    })

    const { mutate: updateBlog, isLoading, isError } = useMutation({
        mutationFn: async ({ id, title, content, thumbnail }: UpdateBlogType) => {
            const payload: UpdateBlogType = {
                id,
                title,
                content,
                thumbnail,
            }

            const { data } = await axios.post('/api/employee/updateBlog', payload)
            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 401) {
                    return toast({
                        title: 'Invalid Action!',
                        description: 'You are not authorized to update the blog.',
                        variant: 'destructive',
                    });
                }
            }

            return toast({
                title: 'Something went wrong',
                description: 'Your blog was not updated, please try again later',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            //queryClient.invalidateQueries(['getBlogs']);

            setTimeout(() => {
                router.push(`/blogs/${id}`);
            }, 1000);

            return toast({
                description: 'Your post has been updated.',
            });
        }
    })

    async function onUpdate(data: UpdateBlogType) {
        const blocks = await ref.current?.save()

        const payload = {
            id: id,
            title: data.title,
            content: blocks,
            thumbnail: imageUrl,
        };

        updateBlog(payload)
    }


    async function onSubmit(data: CreateBlogType) {
        const blocks = await ref.current?.save()

        const payload: CreateBlogType = {
            title: data.title,
            content: blocks,
            thumbnail: imageUrl,
        };
        console.log("Create Blog" + payload)
        createBlog(payload);
    }

    if (!isMounted) {
        return null
    }

    const { ref: titleRef, ...rest } = register('title')

    return (
        <form
            id={`${initialData ? 'update-blog-form' : 'create-blog-form'}`}
            className='w-full'
            onSubmit={initialData ? handleSubmit(onUpdate) : handleSubmit(onSubmit)}
        >

            <div className='flex justify-between'>
                <div className='font-bold'>Thumbnail Image</div>

                {imageUrl && (
                    <div>
                        <Button
                            variant="default"
                            className='bg-white text-black mb-3 hover:bg-white/80'
                            onClick={() => {
                                setImageUrl("")
                            }}
                        >
                            Change Image
                        </Button>
                    </div>
                )}
            </div>
            <div>
                {imageUrl.length ? <div className='w-full flex justify-center items-center flex-col'>
                    {/* <Button
                        variant="default"
                        className='bg-white text-black mb-3 hover:bg-white/80'
                        onClick={() => {
                            setImageUrl("")
                        }}
                    >
                        Change Image
                    </Button> */}
                    <Image
                        src={imageUrl}
                        alt="productImage"
                        width={376}
                        height={190}
                        className='mb-3'
                    />
                </div> : <UploadDropzone
                    className="text-green border-zinc-400 border mb-3"
                    appearance={{
                        button: "bg-slate-700 p-2",
                        label: "text-black",
                        allowedContent: "flex h-8 flex-col items-center justify-center px-2 text-black",
                    }}
                    endpoint="changeAvatar"
                    onClientUploadComplete={(res) => {
                        console.log('Files: ', res);
                        if (res && res.length > 0 && res[0].url) {
                            setImageUrl(res[0].url);
                            // form.setValue("productImage", res[0].url)
                        } else {
                            console.error('Please input a valid product image.', res);

                        }
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                />}
            </div>

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

export default EditorBlog