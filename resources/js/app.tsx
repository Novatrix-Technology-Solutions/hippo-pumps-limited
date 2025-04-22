import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import SiteLayout from './layouts/site-layout'; // Import the layout
import { initializeTheme } from './hooks/use-appearance';
import ('./pages/Home'); // this makes Vite include it


const appName = import.meta.env.VITE_APP_NAME || 'Hippo Pumps Limited';
const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx')
        );
        
        if (!page) {
            throw new Error(`Page ${name} not found`);
        }

        const component = page as { default?: { layout?: (page: React.ReactNode) => React.ReactNode } };
        
        if (!component.default) {
            throw new Error(`No default export found for page ${name}`);
        }

        // Only set layout if the component exists
        component.default.layout = component.default.layout || 
            ((page: React.ReactNode) => <SiteLayout>{page}</SiteLayout>);
            
        return component;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
    url: baseUrl,
    // Add CSRF token handling
    setupPage: (page) => {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
            page.props.csrfToken = csrfToken;
        }
        return page;
    },
});

// This will set light / dark mode on load...
initializeTheme();
