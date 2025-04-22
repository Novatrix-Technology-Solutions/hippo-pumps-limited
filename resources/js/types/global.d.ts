import type { route as routeFn } from 'ziggy-js';
import type { AxiosInstance } from 'axios';

declare global {
    const route: typeof routeFn;
    
    interface Window {
        axios: AxiosInstance;
    }

    // Environment variables that must be defined in production
    interface ImportMetaEnv {
        readonly VITE_APP_URL: string;
        readonly VITE_APP_NAME: string;
        readonly VITE_PUSHER_APP_KEY: string;
        readonly VITE_PUSHER_HOST: string;
        readonly VITE_PUSHER_PORT: string;
        readonly VITE_PUSHER_SCHEME: string;
        readonly VITE_PUSHER_APP_CLUSTER: string;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}
