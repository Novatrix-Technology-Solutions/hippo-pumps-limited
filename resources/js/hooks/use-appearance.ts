import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

const isServer = typeof window === 'undefined';

const prefersDark = (): boolean => {
    if (isServer) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (isServer) return;
    try {
        const maxAge = days * 24 * 60 * 60;
        document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
    } catch (error) {
        console.error('Failed to set cookie:', error);
    }
};

const getStoredAppearance = (): Appearance => {
    if (isServer) return 'system';
    try {
        return (localStorage.getItem('appearance') as Appearance) || 'system';
    } catch (error) {
        console.error('Failed to get appearance from localStorage:', error);
        return 'system';
    }
};

const setStoredAppearance = (appearance: Appearance): void => {
    if (isServer) return;
    try {
        localStorage.setItem('appearance', appearance);
    } catch (error) {
        console.error('Failed to store appearance in localStorage:', error);
    }
};

const applyTheme = (appearance: Appearance): void => {
    if (isServer) return;
    try {
        const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());
        document.documentElement.classList.toggle('dark', isDark);
    } catch (error) {
        console.error('Failed to apply theme:', error);
    }
};

const mediaQuery = () => {
    if (isServer) return null;
    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = () => {
    const currentAppearance = getStoredAppearance();
    applyTheme(currentAppearance);
};

export function initializeTheme(): void {
    if (isServer) return;
    
    const savedAppearance = getStoredAppearance();
    applyTheme(savedAppearance);

    const mq = mediaQuery();
    if (mq) {
        mq.addEventListener('change', handleSystemThemeChange);
    }
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);
        setStoredAppearance(mode);
        setCookie('appearance', mode);
        applyTheme(mode);
    }, []);

    useEffect(() => {
        const savedAppearance = getStoredAppearance();
        updateAppearance(savedAppearance);

        const mq = mediaQuery();
        if (mq) {
            mq.addEventListener('change', handleSystemThemeChange);
            return () => mq.removeEventListener('change', handleSystemThemeChange);
        }
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
} 