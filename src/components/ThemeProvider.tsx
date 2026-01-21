import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
}>({ theme: 'light', setTheme: () => { } });

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme') as Theme;
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        root.style.colorScheme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Update if system preference changes and user hasn't set one? 
    // Usually it's better to just stick to what the user chose or the initial system state.

    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            <div data-theme={theme} className="theme-wrapper">
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    return (
        <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                padding: '10px 16px',
                borderRadius: '30px',
                border: 'none',
                background: theme === 'light' ? '#232526' : '#f6d365',
                color: theme === 'light' ? '#fff' : '#232526',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
};
