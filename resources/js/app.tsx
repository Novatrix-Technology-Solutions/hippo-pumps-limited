import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import SiteLayout from './layouts/site-layout'; // Import the layout
import { initializeTheme } from './hooks/use-appearance';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import QueryProvider from './providers/QueryProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Hippo Pumps Limited';
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx')
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
        root.render(
            <QueryProvider>
                <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
                <App {...props} />
            </QueryProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
    version: () => import.meta.env.VITE_APP_VERSION,
});

// This will set light / dark mode on load...
initializeTheme();
