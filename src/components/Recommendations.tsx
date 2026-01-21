import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
                key={currentIndex}
                className="recommendation-teaser glass-card"
                onClick={() => setSelectedRec(current)}
                style={{
                    cursor: 'pointer',
                    minHeight: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderLeft: '4px solid #fda085',
                    animation: 'recommendationFadeIn 0.8s ease-out forwards'
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

            {selectedRec && createPortal(
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                        backdropFilter: 'blur(16px)',
                        padding: '20px',
                        boxSizing: 'border-box'
                    }}
                    onClick={() => setSelectedRec(null)}
                >
                    <div
                        className="glass-card modal-container"
                        style={{
                            maxWidth: '620px',
                            width: '100%',
                            position: 'relative',
                            padding: '48px 40px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            margin: 'auto',
                            animation: 'modalFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedRec(null)}
                            aria-label="Close"
                            className="modal-close-button"
                        >
                            <FaTimes size={24} />
                        </button>
                        <FaQuoteLeft style={{ color: '#fda085', marginBottom: '24px', opacity: 0.8 }} size={48} />
                        <p style={{
                            fontStyle: 'italic',
                            fontSize: '1.25rem',
                            lineHeight: '1.7',
                            marginBottom: '32px',
                            fontWeight: 500
                        }}>
                            {selectedRec.text}
                        </p>
                        <div style={{ borderTop: '2px solid rgba(128, 128, 128, 0.2)', paddingTop: '24px' }}>
                            <h4 style={{ color: '#fda085', margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{selectedRec.name}</h4>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
