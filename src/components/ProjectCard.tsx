import { useState } from 'react';
import type { ProjectItem } from './DataContext';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa';

export function ProjectCard({ project }: { project: ProjectItem }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`glass-card project-card ${isExpanded ? 'expanded' : ''}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.3s ease',
                position: 'relative',
                padding: '24px',
                cursor: 'pointer'
            }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#fda085' }}>{project.title}</h3>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {project.links.map((link, i) => (
                        <a
                            key={i}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            style={{ color: 'inherit', opacity: 0.6 }}
                        >
                            <FaExternalLinkAlt size={16} />
                        </a>
                    ))}
                    <span style={{ opacity: 0.6 }}>
                        {isExpanded ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
                    </span>
                </div>
            </div>

            <p style={{
                margin: 0,
                fontSize: '0.95rem',
                lineHeight: '1.6',
                display: isExpanded ? 'block' : '-webkit-box',
                WebkitLineClamp: isExpanded ? 'none' : 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                opacity: 0.9,
                transition: 'all 0.3s ease'
            }}>
                {project.description}
            </p>

            {isExpanded && project.links.length > 0 && (
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                    {/* Add more project details if needed */}
                </div>
            )}
        </div>
    );
}
