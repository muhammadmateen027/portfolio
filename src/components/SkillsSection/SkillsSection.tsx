import { usePortfolioData } from '../DataContext/DataContext';

export function SkillsSection() {
    const { skills } = usePortfolioData();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {skills.map((category, idx) => (
                <div key={idx}>
                    <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        marginBottom: '16px',
                        color: '#fda085',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <span style={{ width: '4px', height: '1.2rem', background: '#fda085', borderRadius: '2px' }}></span>
                        {category.category}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                        {category.items.map((skill, i) => (
                            <span key={i} className="chip-gradient">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
