import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

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

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Update if system preference changes and user hasn't set one? 
    // Usually it's better to just stick to what the user chose or the initial system state.

    const value = useMemo(() => ({ theme, setTheme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            <div className="theme-wrapper">
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div
            style={{
                position: 'fixed',
                top: '24px',
                right: '24px',
                zIndex: 2000,
            }}
        >
            <div
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                style={{
                    width: '64px',
                    height: '32px',
                    backgroundColor: isDark ? '#1C1C1E' : '#E9E9EB',
                    borderRadius: '50px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isDark ? '0 0 10px rgba(0,0,0,0.5)' : 'inset 0 2px 4px rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 4px',
                    border: `1px solid ${isDark ? '#3A3A3C' : '#D1D1D6'}`
                }}
                aria-label="Toggle theme"
            >
                {/* Background Indicators for better context */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 10px',
                    opacity: 0.4,
                    pointerEvents: 'none'
                }}>
                    <FaSun size={12} color={isDark ? '#555' : '#FF9500'} />
                    <FaMoon size={12} color={isDark ? '#FFD60A' : '#999'} />
                </div>

                {/* Sliding Thumb */}
                <div
                    style={{
                        position: 'absolute',
                        left: isDark ? '34px' : '4px',
                        width: '24px',
                        height: '24px',
                        backgroundColor: isDark ? '#2C2C2E' : '#FFFFFF',
                        borderRadius: '50%',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        zIndex: 2,
                    }}
                >
                    {isDark ? (
                        <FaMoon size={14} color="#FFD60A" />
                    ) : (
                        <FaSun size={14} color="#FF9500" />
                    )}
                </div>
            </div>
        </div>
    );
};
