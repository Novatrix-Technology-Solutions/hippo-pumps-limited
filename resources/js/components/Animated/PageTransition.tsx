import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from '@inertiajs/react';

interface Props {
    children: React.ReactNode;
}

const PageTransition = ({ children }: Props) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
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