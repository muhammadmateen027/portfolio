import React from 'react';
import { usePortfolioData } from '../components/DataContext/DataContext';
import { GigCard } from './GigCard';
import './gigs.css';

export const GigsSection: React.FC = () => {
    const { gigs } = usePortfolioData();

    return (
        <div className="gigs-grid">
            {gigs.map((gig) => (
                <GigCard key={gig.id} gig={gig} />
            ))}
        </div>
    );
};
