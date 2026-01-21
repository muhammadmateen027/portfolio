import { usePortfolioData } from './DataContext';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export function ImportantLinks() {
    const { links } = usePortfolioData();
    return (
        <div style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            padding: '0 20px'
        }}>
            <a href={links.linkedin} target="_blank" rel="noopener" className="hero-link linkedin-link">
                <FaLinkedin /> LinkedIn
            </a>
            <a href={links.github} target="_blank" rel="noopener" className="hero-link github-link">
                <FaGithub /> GitHub
            </a>
            <a href={`mailto:${links.email}`} className="hero-link email-link">
                <FaEnvelope /> Email
            </a>
            <div className="hero-link address-link" style={{ cursor: 'default' }}>
                <FaMapMarkerAlt /> {links.address}
            </div>
        </div>
    );
}
