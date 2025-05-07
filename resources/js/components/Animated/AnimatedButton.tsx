import { motion } from 'framer-motion';
import { hoverScale } from '@/Utils/animations';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

const AnimatedButton = ({ 
    children, 
    variant = 'primary', 
    size = 'md',
    className = '',
    ...props 
}: Props) => {
    const baseStyles = 'font-bold rounded transition-colors duration-200';
    
    const variantStyles = {
        primary: 'bg-indigo-500 hover:bg-indigo-700 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
        danger: 'bg-red-500 hover:bg-red-700 text-white'
    };

    const sizeStyles = {
        sm: 'py-1 px-2 text-sm',
        md: 'py-2 px-4',
        lg: 'py-3 px-6 text-lg'
    };

    return (
        <motion.button
            {...hoverScale}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default AnimatedButton; 