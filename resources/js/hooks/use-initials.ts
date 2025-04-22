import { useCallback } from 'react';

export function useInitials() {
    return useCallback((fullName: string | null | undefined): string => {
        if (!fullName) return '';

        const names = fullName.trim().split(/\s+/).filter(Boolean);

        if (names.length === 0) return '';
        if (names.length === 1) {
            const firstChar = names[0].charAt(0);
            return firstChar ? firstChar.toUpperCase() : '';
        }

        const firstInitial = names[0].charAt(0);
        const lastInitial = names[names.length - 1].charAt(0);

        if (!firstInitial || !lastInitial) return '';

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);
} 