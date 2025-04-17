import { motion } from 'framer-motion';
import { cardHover } from '@/Utils/animations';

interface Props {
    children: React.ReactNode;
    className?: string;
}

const AnimatedCard = ({ children, className = '' }: Props) => {
    return (
        <motion.div
            {...cardHover}
            className={`bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedCard; 