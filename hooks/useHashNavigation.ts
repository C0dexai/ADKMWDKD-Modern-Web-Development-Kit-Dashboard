
import { useState, useEffect } from 'react';

const useHashNavigation = (defaultView: string) => {
    const [activeView, setActiveView] = useState(() => {
        const hash = window.location.hash.replace('#', '');
        return hash || defaultView;
    });

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            setActiveView(hash || defaultView);
        };

        window.addEventListener('hashchange', handleHashChange);
        // Set initial state from hash on mount
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [defaultView]);

    return activeView;
};

export default useHashNavigation;
