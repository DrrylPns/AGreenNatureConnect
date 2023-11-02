'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

const Output = dynamic(
    async () => (await import('editorjs-react-renderer')).default,
)

interface EditorOutputProps {
    content: any
}

const renderers = {
    image: CustomImageRenderer,
}

const style = {
    paragraph: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
    },
}

const EditorOutput: React.FC<EditorOutputProps> = ({ content }) => {
    return (
        <Output
            style={style}
            className='text-sm'
            renderers={renderers}
            data={content}
        />
    )
}

function CustomImageRenderer({ data }: any) {
    const src = data.file.url

    return (
        <div className='relative w-full min-h-[15rem]'>
            <Image alt='image' className='object-contain' fill src={src} />
        </div>
    )
}

export default EditorOutput