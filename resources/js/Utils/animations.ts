import { Variants, Transition } from 'framer-motion';

// Common transitions for reuse
const springTransition: Transition = {
    type: 'spring',
    stiffness: 260,
    damping: 20,
};

const easeTransition: Transition = {
    type: 'ease',
    duration: 0.3,
};

// Page transitions
export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: springTransition,
};

// Fade animations
export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
        opacity: 1, 
        y: 0,
        transition: easeTransition,
    },
};

export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { 
        opacity: 1,
        transition: easeTransition,
    },
};

// Stagger animations
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            ...easeTransition,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: easeTransition,
    },
};

// Hover animations
export const hoverScale: Variants = {
    initial: { scale: 1 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: {
        ...easeTransition,
        duration: 0.2,
    },
};

export const hoverLift: Variants = {
    initial: { y: 0 },
    whileHover: { y: -5 },
    whileTap: { y: 0 },
    transition: {
        ...easeTransition,
        duration: 0.2,
    },
};

// Feedback animations
export const errorMessage: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: {
        ...easeTransition,
        duration: 0.2,
    },
};

// UI element animations
export const cardHover: Variants = {
    initial: { scale: 1 },
    whileHover: { scale: 1.02 },
    transition: {
        ...easeTransition,
        duration: 0.2,
    },
};

export const imagePreview: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: {
        ...easeTransition,
        duration: 0.3,
    },
};

// Navigation animations
export const slideIn: Variants = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
    transition: easeTransition,
};

export const scaleIn: Variants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: easeTransition,
}; 