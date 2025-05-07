import { motion } from 'framer-motion';
import { pageTransition } from '@/Utils/animations';

interface Props {
    children: React.ReactNode;
    className?: string;
}

const AnimatedPage = ({ children, className = '' }: Props) => {
    return (
        <motion.div
            {...pageTransition}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedPage; 