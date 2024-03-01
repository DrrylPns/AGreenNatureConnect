import { BiComment } from 'react-icons/bi';
import { motion } from 'framer-motion';

interface ReplyOnCommentProps {
    onReply: () => void; // Function to handle reply action
}

const ReplyOnComment: React.FC<ReplyOnCommentProps> = ({ onReply }) => {
    return (
        <motion.button
            whileTap={{ backgroundColor: 'ButtonShadow' }}
            type='button'
            className='flex gap-2 items-center justify-center text-[1rem] text-gray-400 px-2 py-1 hover:bg-gray-300'
            onClick={onReply} 
        >
            <span className=''>
                <BiComment />
            </span>
            Reply
        </motion.button>
    );
};

export default ReplyOnComment;
