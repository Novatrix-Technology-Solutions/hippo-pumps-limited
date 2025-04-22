import { useCallback, useEffect } from 'react';

export function useMobileNavigation() {
    useEffect(() => {
        return () => {
            if (typeof document !== 'undefined') {
                document.body.style.removeProperty('pointer-events');
            }
        };
    }, []);

    return useCallback(() => {
        if (typeof document !== 'undefined') {
            document.body.style.removeProperty('pointer-events');
        }
    }, []);
}
