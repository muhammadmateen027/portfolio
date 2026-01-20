import './experience-timeline.css';
import { FaBuilding, FaUserTie, FaLaptopCode, FaRocket } from 'react-icons/fa';
import { usePortfolioData } from './DataContext';

const icons = [FaUserTie, FaBuilding, FaLaptopCode, FaRocket];

function ExperienceTimelineItem({ item, isLast, idx }: { item: import('./DataContext').ExperienceItem; isLast: boolean; idx: number }) {
    const Icon = icons[idx % icons.length];
    return (
        <div className="timeline-item">
            <div className="timeline-dot timeline-dot-animated"><Icon size={18} /></div>
            <div className="timeline-content">
                <div className="timeline-header">
                    <span className="timeline-role">{item.role}</span>
                    <span className="timeline-company">@ {item.company}</span>
                </div>
                <div className="timeline-duration">{item.duration}</div>
                <div className="timeline-description">{item.description}</div>
                <ul className="timeline-highlights">
                    {item.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
            </div>
            {!isLast && <div className="timeline-connector" />}
        </div>
    );
}

export function ExperienceSection() {
    const data = usePortfolioData();
    return (
        <div className="experience-timeline">
            {data.experience.map((item, idx) => (
                <ExperienceTimelineItem key={idx} item={item} isLast={idx === data.experience.length - 1} idx={idx} />
            ))}
        </div>
    );
}
