import React from 'react';
import type { GigItem } from '../components/DataContext/DataContext';

export const GigCard: React.FC<{ gig: GigItem }> = ({ gig }) => {
    return (
        <div className="glass-card gig-card">
            <div>
                <span className="gig-category">{gig.category}</span>
                <h3 className="gig-title">{gig.title}</h3>
                <p className="gig-description">{gig.description}</p>
                <ul className="gig-features">
                    {gig.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
            <div className="gig-footer">
                <div className="gig-price-tag">
                    <span className="gig-price-label">Starting at</span>
                    <div className="gig-price-value"><span>$</span>{gig.price}</div>
                </div>
                <button
                    className="gig-buy-button"
                    onClick={() => window.location.href = `mailto:muhammadmateen027@gmail.com?subject=Inquiry about ${gig.title}`}
                >
                    Get it Now
                </button>
            </div>
        </div>
    );
};
