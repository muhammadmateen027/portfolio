import { usePortfolioData } from '../DataContext/DataContext';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export function EducationSection() {
    const { education } = usePortfolioData();

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
        }}>
            {education.map((item, idx) => (
                <div key={idx} className="glass-card" style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        opacity: 0.1,
                        transform: 'rotate(20deg)'
                    }}>
                        <FaGraduationCap size={80} color="#fda085" />
                    </div>

                    <h3 style={{
                        margin: 0,
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#fda085',
                        lineHeight: '1.4'
                    }}>
                        {item.degree}
                    </h3>

                    <div style={{ fontWeight: 600, fontSize: '1rem', opacity: 0.9 }}>
                        {item.university}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.85rem',
                            opacity: 0.7
                        }}>
                            <FaMapMarkerAlt size={12} />
                            {item.location}
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.85rem',
                            opacity: 0.7
                        }}>
                            <FaCalendarAlt size={12} />
                            {item.year}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
