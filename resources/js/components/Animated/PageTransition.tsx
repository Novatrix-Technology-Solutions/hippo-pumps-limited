import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';

interface Props {
    children: React.ReactNode;
}

const PageTransition = ({ children }: Props) => {
    const { url } = usePage();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.3
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition; 