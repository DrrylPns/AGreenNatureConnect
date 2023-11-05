"use client"
import { CreatePostType, PostSchema } from '@/lib/validations/createPostSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import TextareaAutosize from "react-textarea-autosize"
import type EditorJS from '@editorjs/editorjs';
import { uploadFiles } from '@/lib/uploadthing';
import { toast } from '@/lib/hooks/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Combobox, Transition } from '@headlessui/react';
import { Topic } from '@/lib/types';
import { ChevronsUpDownIcon } from 'lucide-react';

const Editor = () => {
    const [topic, setTopic] = useState<Topic[]>([])
    const [selectedTopic, setSelectedTopic] = useState<Topic>(topic[0])
    const [query, setQuery] = useState('')
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
            topicId: '',
            title: '',
            content: null
        }
    })

    const getTopics = async () => {
        try {
            await axios.get('/api/user/topic')
                .then((result) => {
                    const data = result.data
                    setTopic(data)
                })
        } catch (error) {
            return toast({
                title: "Something went wrong",
                description: "Your post was not published, please try again later",
                variant: "destructive",
            })
        }
    }

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
        getTopics()
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
            const { data } = await axios.post('/api/user/post', payload)
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

        if (selectedTopic !== undefined && selectedTopic.id !== undefined) {
            const payload: CreatePostType = {
                title: data.title,
                content: blocks,
                topicId: selectedTopic.id,
            };
            createPost(payload);
        } else {
            return toast({
                title: "Invalid Topic",
                description: "Please choose an existing topic",
                variant: 'destructive',
            })
        }
    }

    if (!isMounted) {
        return null
    }

    const { ref: titleRef, ...rest } = register('title')

    const filteredTopic =
        query === ''
            ? topic
            :
            topic &&
            topic.filter((topic) => {
                return topic.name.toLowerCase().includes(query.toLowerCase())
            })
    console.log(selectedTopic?.id)
    return (
        <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
            <form
                id="topic-post-form"
                className=""
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="prose prose-stone dark:prose-invert">
                    <Combobox value={selectedTopic} onChange={setSelectedTopic}>
                        <div className="relative mt-1g-transparent">
                            <div className="">
                                <Combobox.Input
                                    className="py-2 leading-5 outline-none text-gray-900 bg-transparent text-xl"
                                    displayValue={(topic: Topic) => topic.name}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder='Choose topic here'
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronsUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Combobox.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                afterLeave={() => setQuery('')}
                            >
                                <Combobox.Options className="absolute mt-1 max-h-60 w-full z-50 overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {filteredTopic.length === 0 && query !== '' ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredTopic.map((topic: Topic) => (
                                            <Combobox.Option
                                                key={topic.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? ' bg-muted-green text-white' : 'text-gray-900'
                                                    }`
                                                }
                                                value={topic}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {topic.name}
                                                        </span>
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))
                                    )}
                                </Combobox.Options>
                            </Transition>
                        </div>
                    </Combobox>
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