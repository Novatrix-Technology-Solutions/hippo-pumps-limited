import { motion, AnimatePresence } from 'framer-motion';
import { errorMessage } from '@/Utils/animations';

interface Props {
    message: string | null;
}

const AnimatedErrorMessage = ({ message }: Props) => {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    {...errorMessage}
                    className="text-red-500 text-sm mt-1"
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimatedErrorMessage; 