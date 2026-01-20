import { usePortfolioData } from './DataContext';

export function ImportantLinks() {
    const { links } = usePortfolioData();
    return (
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 32 }}>
            <a href={links.linkedin} target="_blank" rel="noopener" style={{ textDecoration: 'none', color: '#0a66c2', fontWeight: 600 }}>
                LinkedIn
            </a>
            <a href={links.github} target="_blank" rel="noopener" style={{ textDecoration: 'none', color: '#333', fontWeight: 600 }}>
                GitHub
            </a>
            <a href={`mailto:${links.email}`} style={{ textDecoration: 'none', color: '#f6d365', fontWeight: 600 }}>
                Email
            </a>
        </div>
    );
}
