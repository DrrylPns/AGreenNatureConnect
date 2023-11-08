interface QuoteRendererProps {
    data: {
        text: string;
        caption?: string;
        alignment: string;
    };
}

const QuoteRenderer: React.FC<QuoteRendererProps> = ({ data }) => {
    const { text, caption, alignment } = data;
    return (
        <div className={`text-${alignment}`}>
            <blockquote>
                "{text}"
            </blockquote>
            {caption && <cite>-{caption}</cite>}
        </div>
    );
};

export default QuoteRenderer;
