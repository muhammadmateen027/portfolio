// ThemeProvider.tsx
import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
    theme: Theme;
    setTheme: (theme: Theme) => void;
}>({ theme: 'light', setTheme: () => { } });

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            <div data-theme={theme}>
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
