import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Arial', 'Helvetica', 'sans-serif'],
                heading: ['"Arial Black"', 'Arial', 'Helvetica', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#004080',
                    foreground: '#ffffff',
                },
                accent: {
                    DEFAULT: '#008000',
                    foreground: '#ffffff',
                },
                background: 'rgb(var(--background-rgb))',
                foreground: 'rgb(var(--foreground-rgb))',
            },
        },
    },

    plugins: [forms],
};
