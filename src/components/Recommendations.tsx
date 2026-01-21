import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePortfolioData } from './DataContext';
import type { RecommendationItem } from './DataContext';
import { FaQuoteLeft, FaTimes } from 'react-icons/fa';

export function RecommendationsCarousel() {
    const { recommendations } = usePortfolioData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedRec, setSelectedRec] = useState<RecommendationItem | null>(null);
    const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly pick left or right for auto-swipe
            setExitDirection(Math.random() > 0.5 ? 'right' : 'left');

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % recommendations.length);
                setExitDirection(null);
            }, 600); // match animation duration
        }, 6000);
        return () => clearInterval(interval);
    }, [recommendations.length]);

    if (recommendations.length === 0) return null;

    // Get the next few items for the stack effect
    const getVisibleItems = () => {
        const items = [];
        for (let i = 0; i < Math.min(3, recommendations.length); i++) {
            items.push({
                item: recommendations[(currentIndex + i) % recommendations.length],
                index: i
            });
        }
        return items.reverse(); // Bottom items first in DOM
    };

    const visibleItems = getVisibleItems();

    return (
        <div className="recommendations-stack-container" style={{
            height: '180px',
            position: 'relative',
            perspective: '1000px',
            marginTop: '20px',
            marginBottom: '40px'
        }}>
            {visibleItems.map(({ item, index }) => {
                const isTop = index === 0;
                let className = "recommendation-card glass-card";
                if (isTop && exitDirection) {
                    className += ` exit-${exitDirection}`;
                }

                return (
                    <div
                        key={`${item.name}-${currentIndex + index}`}
                        className={className}
                        onClick={() => isTop && setSelectedRec(item)}
                        style={{
                            position: 'absolute',
                            width: '90%',
                            height: '70%',
                            cursor: isTop ? 'pointer' : 'default',
                            zIndex: 100 - index,
                            transform: `translateZ(${-index * 30}px) translateY(${index * 10}px)`,
                            opacity: 1 - index * 0.2,
                            transition: exitDirection ? 'none' : 'all 0.5s ease',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            borderLeft: isTop ? '4px solid #fda085' : '1px solid rgba(255,255,255,0.1)',
                            padding: '24px'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <FaQuoteLeft style={{ color: '#fda085', opacity: 0.2, flexShrink: 0, marginTop: '4px' }} size={20} />
                            <div style={{ flex: 1 }}>
                                <p style={{
                                    fontStyle: 'italic',
                                    fontSize: '0.95rem',
                                    margin: 0,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    lineHeight: '1.5',
                                    fontWeight: 400,
                                    opacity: 0.85
                                }}>
                                    {item.text}
                                </p>
                                <div style={{ marginTop: '12px' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fda085' }}>
                                        {item.name}
                                    </div>
                                    {(item.position || item.company) && (
                                        <div style={{
                                            fontSize: '0.75rem',
                                            opacity: 0.6,
                                            marginTop: '2px',
                                            fontWeight: 500
                                        }}>
                                            {item.position}{item.position && item.company ? ' · ' : ''}{item.company}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

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
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: '50%',
                                color: 'white',
                                width: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <FaTimes size={18} />
                        </button>
                        <FaQuoteLeft style={{ color: '#fda085', marginBottom: '24px', opacity: 0.8 }} size={48} />
                        <p style={{
                            fontStyle: 'italic',
                            fontSize: '1.1rem',
                            lineHeight: '1.7',
                            marginBottom: '32px',
                            fontWeight: 500
                        }}>
                            {selectedRec.text}
                        </p>
                        <div style={{ borderTop: '2px solid rgba(128, 128, 128, 0.1)', paddingTop: '24px' }}>
                            <h4 style={{ color: '#fda085', margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>{selectedRec.name}</h4>
                            {(selectedRec.position || selectedRec.company) && (
                                <p style={{
                                    margin: '4px 0 0 0',
                                    opacity: 0.7,
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    {selectedRec.position}{selectedRec.position && selectedRec.company ? ' · ' : ''}{selectedRec.company}
                                </p>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
