'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import QuoteRenderer from './QuoteRenderer';

const Output = dynamic(
    async () => (await import('editorjs-react-renderer')).default,
)

interface EditorOutputProps {
    content: any
}

const renderers = {
    image: CustomImageRenderer,
    quote: QuoteRenderer,
    list: CustomListRenderer,
    table: CustomTableRenderer,
    header: CustomHeaderRenderer,
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

function CustomListRenderer({ data }: any) {
    const { style, items } = data;
    const isOrdered = style === 'ordered';

    const ListTag = isOrdered ? 'ol' : 'ul';

    return (
        <ListTag className={`custom-${isOrdered ? 'ol' : 'ul'}`}>
            {items.map((item: any, index: number) => (
                <li className="custom-li" key={index}>
                    {item}
                </li>
            ))}
        </ListTag>
    );
}

function CustomTableRenderer({ data }: any) {
    const { content, withHeadings } = data;

    if (content.length === 0) {
        return null;
    }

    return (
        <table className="custom-table">
            <tbody>
                {content.map((row: string[], rowIndex: number) => (
                    <tr key={rowIndex}>
                        {row.map((cell: string, cellIndex: number) => {
                            if (withHeadings && rowIndex === 0) {
                                return <th className='border border-[#ccc] p-[8px] bg-[#f0f0f0] font-bold' key={cellIndex}>{cell}</th>;
                            } else {
                                return <td className='border border-[#ccc] p-[8px]' key={cellIndex}>{cell}</td>;
                            }
                        })}
                    </tr>
                )
                )}
            </tbody>
        </table>
    );
}

function CustomHeaderRenderer({ data }: { data: { text: string, level: number } }) {
    const { text, level } = data;
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <HeadingTag className="custom-header">
            {text}
        </HeadingTag>
    );
}

export default EditorOutput