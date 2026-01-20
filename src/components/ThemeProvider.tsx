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
                margin: '0 0 24px 0',
                padding: '8px 20px',
                borderRadius: 20,
                border: 'none',
                background: theme === 'light' ? '#232526' : '#f6d365',
                color: theme === 'light' ? '#fff' : '#232526',
                fontWeight: 600,
                cursor: 'pointer',
                float: 'right',
                transition: 'background 0.3s, color 0.3s',
            }}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
};
