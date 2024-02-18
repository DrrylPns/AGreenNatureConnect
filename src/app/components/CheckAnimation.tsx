'use client'
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const CheckAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 2 }}
      animate={{ opacity: 1, scale: 4 }}
      exit={{ opacity: 0, scale: 2 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="flex items-center text-xs md:text-2xl justify-center"
    >
      <FaCheck color="#00cc00" />
    </motion.div>
  );
};

export default CheckAnimation;