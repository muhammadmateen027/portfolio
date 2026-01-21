import { useEffect, useRef, useState } from 'react';
import { usePortfolioData } from '../DataContext/DataContext';

export function AnimatedSubtitle() {
    const { phrases } = usePortfolioData();
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(true);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (!phrases || phrases.length === 0) return;
        timeoutRef.current = window.setTimeout(() => {
            setShow(false);
            setTimeout(() => {
                setIndex((i) => (i + 1) % phrases.length);
                setShow(true);
            }, 400); // fade out duration
        }, 2200); // visible duration
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [index, show, phrases]);

    if (!phrases || phrases.length === 0) return null;

    return (
        <span
            className={`profile-hero-animated-subtitle${show ? ' in' : ' out'}`}
            aria-live="polite"
            style={{ display: 'inline-block', minWidth: 180 }}
        >
            {phrases[index]}
        </span>
    );
}

function useIsDarkTheme() {
    const [isDark, setIsDark] = useState(false);
    useEffect(() => {
        const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        check();
        window.addEventListener('themechange', check);
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => {
            window.removeEventListener('themechange', check);
            observer.disconnect();
        };
    }, []);
    return isDark;
}

export function TypingAnimatedSubtitle() {
    const { phrases } = usePortfolioData();
    const isDark = useIsDarkTheme();
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [typing, setTyping] = useState(true);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (!phrases || phrases.length === 0) return;

        if (typing) {
            if (charIndex < phrases[index].length) {
                timeoutRef.current = window.setTimeout(() => {
                    setCharIndex((c) => c + 1);
                }, 60);
            } else {
                timeoutRef.current = window.setTimeout(() => {
                    setTyping(false);
                }, 1200);
            }
        } else {
            timeoutRef.current = window.setTimeout(() => {
                setTyping(true);
                setCharIndex(0);
                setIndex((i) => (i + 1) % phrases.length);
            }, 400);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [charIndex, typing, index, phrases]);

    if (!phrases || phrases.length === 0) return null;

    const displayed = phrases[index].slice(0, charIndex);
    const visible = typing ? displayed.length > 0 : false;
    const gray = isDark ? '#aaa' : '#888';

    return (
        <span
            className={`profile-hero-animated-subtitle${visible ? ' in' : ' out'}`}
            aria-live="polite"
            style={{
                minWidth: 180,
                color: isDark ? '#fff' : '#000',
                fontWeight: 700,
                fontSize: '1.2rem',
                whiteSpace: 'nowrap'
            }}
        >
            <span style={{ color: gray, fontWeight: 600 }}>is </span>
            {displayed}
            <span style={{ color: gray, fontWeight: 600 }}>.</span>
            <span className="profile-hero-typing-cursor">|</span>
        </span>
    );
}
