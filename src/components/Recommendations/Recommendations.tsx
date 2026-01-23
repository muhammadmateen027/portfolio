import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePortfolioData } from '../DataContext/DataContext';
import type { RecommendationItem } from '../DataContext/DataContext';
import { FaQuoteLeft, FaTimes } from 'react-icons/fa';
import './recommendations.css';

export function RecommendationsCarousel() {
    const { recommendations, recommendationsTitle } = usePortfolioData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedRec, setSelectedRec] = useState<RecommendationItem | null>(null);
    const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setExitDirection(Math.random() > 0.5 ? 'right' : 'left');

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % recommendations.length);
                setExitDirection(null);
            }, 600);
        }, 6000);
        return () => clearInterval(interval);
    }, [recommendations.length]);

    if (recommendations.length === 0) return null;

    const getVisibleItems = () => {
        const items = [];
        for (let i = 0; i < Math.min(3, recommendations.length); i++) {
            items.push({
                item: recommendations[(currentIndex + i) % recommendations.length],
                index: i
            });
        }
        return items.reverse();
    };

    const visibleItems = getVisibleItems();

    return (
        <div className="recommendations-stack-container" style={{ textAlign: 'left', padding: '0 16px' }}>
            <h2 style={{
                marginBottom: '16px',
                fontSize: '2rem',
                fontWeight: 700,
                letterSpacing: '-0.02em'
            }}>
                {recommendationsTitle}
            </h2>
            <div className="recommendations-cards-wrapper" style={{ position: 'relative', height: '180px' }}>
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
                                zIndex: 100 - index,
                                transform: `translateX(-50%) translateZ(${-index * 40}px) translateY(${index * 12}px)`,
                                opacity: 1 - index * 0.25,
                                borderLeft: isTop ? '4px solid var(--accent-color)' : '1px solid var(--glass-border)',
                                cursor: isTop ? 'pointer' : 'default',
                            }}
                        >
                            <div className="recommendation-card-content">
                                <FaQuoteLeft className="quote-icon" size={20} />
                                <div className="recommendation-text-wrapper">
                                    <p className="recommendation-text-preview">
                                        {item.text}
                                    </p>
                                    <div className="recommendation-author">
                                        <div className="recommendation-name">
                                            {item.name}
                                        </div>
                                        {(item.position || item.company) && (
                                            <div className="recommendation-info">
                                                {item.position}{item.position && item.company ? ' · ' : ''}{item.company}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedRec && createPortal(
                <div className="modal-overlay" onClick={() => setSelectedRec(null)}>
                    <div
                        className="modal-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedRec(null)}
                            aria-label="Close"
                            className="modal-close-button"
                        >
                            <FaTimes size={24} />
                        </button>
                        <FaQuoteLeft className="modal-quote-icon" size={48} />
                        <p className="modal-text">
                            {selectedRec.text}
                        </p>
                        <div className="modal-footer">
                            <h4 className="modal-author-name">{selectedRec.name}</h4>
                            {(selectedRec.position || selectedRec.company) && (
                                <p className="modal-author-info">
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
