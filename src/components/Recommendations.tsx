import { useState, useEffect } from 'react';
import { usePortfolioData } from './DataContext';
import type { RecommendationItem } from './DataContext';
import { FaQuoteLeft, FaTimes } from 'react-icons/fa';

export function RecommendationsCarousel() {
    const { recommendations } = usePortfolioData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedRec, setSelectedRec] = useState<RecommendationItem | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % recommendations.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [recommendations.length]);

    if (recommendations.length === 0) return null;

    const current = recommendations[currentIndex];

    return (
        <div style={{ margin: '20px 0 40px 0', position: 'relative' }}>
            <div
                className="recommendation-teaser glass-card"
                onClick={() => setSelectedRec(current)}
                style={{
                    cursor: 'pointer',
                    animation: 'fadeInOut 5s infinite',
                    minHeight: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderLeft: '4px solid #fda085'
                }}
            >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <FaQuoteLeft style={{ color: '#fda085', opacity: 0.5, flexShrink: 0 }} size={24} />
                    <div>
                        <p style={{
                            fontStyle: 'italic',
                            fontSize: '0.95rem',
                            margin: '0 0 8px 0',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: '1.4'
                        }}>
                            {current.text}
                        </p>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#fda085' }}>
                            — {current.name}
                        </span>
                    </div>
                </div>
            </div>

            {selectedRec && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        backdropFilter: 'blur(5px)'
                    }}
                    onClick={() => setSelectedRec(null)}
                >
                    <div
                        className="glass-card"
                        style={{
                            maxWidth: '600px',
                            width: '90%',
                            position: 'relative',
                            padding: '40px',
                            maxHeight: '80vh',
                            overflowY: 'auto',
                            background: 'var(--card-bg, #fff)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedRec(null)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'inherit'
                            }}
                        >
                            <FaTimes size={20} />
                        </button>
                        <FaQuoteLeft style={{ color: '#fda085', marginBottom: '20px' }} size={32} />
                        <p style={{ fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                            {selectedRec.text}
                        </p>
                        <h4 style={{ color: '#fda085', margin: 0 }}>{selectedRec.name}</h4>
                    </div>
                </div>
            )}
        </div>
    );
}
