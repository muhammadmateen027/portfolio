import { useState } from 'react';
import { usePortfolioData } from './DataContext';
import { ImportantLinks } from './ImportantLinks';
import { ProfileHeader } from './ProfileHeader';
import { PromptShortcuts } from './PromptShortcuts';
import { ExperienceSection } from './ExperienceSection';
import React from 'react';
import { ThemeToggle } from './ThemeProvider';

function GlassCard({ children }: { children: React.ReactNode }) {
    return <div className="glass-card">{children}</div>;
}

function Section({ title, children, image }: { title: string; children: React.ReactNode; image?: string }) {
    return (
        <section style={{ marginBottom: 48, padding: 0 }}>
            <h2 style={{ marginBottom: 18, fontSize: '2rem', fontWeight: 700 }}>{title}</h2>
            {image && (
                <img src={image} alt={title + ' image'} style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 12, marginBottom: 16 }} />
            )}
            {children}
        </section>
    );
}

const sectionOrder = [
    'about',
    'featuredProjects',
    'experience',
    'education',
    'licenses',
    'projects',
    'skills',
    'recommendations',
    'publications',
    'languages',
] as const;
type SectionKey = typeof sectionOrder[number];

export function MainPage() {
    const [selected, setSelected] = useState<SectionKey | null>(null);
    const data = usePortfolioData();
    const sectionImages: Record<SectionKey, string> = {
        about: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
        featuredProjects: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
        experience: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        education: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        licenses: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
        projects: 'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=600&q=80',
        skills: '',
        recommendations: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
        publications: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
        languages: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    };
    const sections: Record<SectionKey, React.ReactElement<{ title: string }>> = {
        about: <Section title="About" image={sectionImages.about}><GlassCard>{data.about}</GlassCard></Section>,
        featuredProjects: <Section title="Featured Projects" image={sectionImages.featuredProjects}>{data.featuredProjects.map((p, i) => <GlassCard key={i}>{p}</GlassCard>)}</Section>,
        experience: <Section title="Experience" image={sectionImages.experience}><ExperienceSection /></Section>,
        education: <Section title="Education" image={sectionImages.education}>{data.education.map((e, i) => <GlassCard key={i}>{e}</GlassCard>)}</Section>,
        licenses: <Section title="Licenses & Certifications" image={sectionImages.licenses}>{data.licenses.map((l, i) => <GlassCard key={i}>{l}</GlassCard>)}</Section>,
        projects: <Section title="Projects" image={sectionImages.projects}>{data.projects.map((p, i) => <GlassCard key={i}>{p}</GlassCard>)}</Section>,
        skills: <Section title="Skills"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{data.skills.map((s, i) => <span key={i} className="chip-gradient">{s}</span>)}</div></Section>,
        recommendations: <Section title="Recommendations" image={sectionImages.recommendations}>{data.recommendations.map((r, i) => <GlassCard key={i}>{r}</GlassCard>)}</Section>,
        publications: <Section title="Publications" image={sectionImages.publications}>{data.publications.map((p, i) => <GlassCard key={i}>{p}</GlassCard>)}</Section>,
        languages: <Section title="Languages"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{data.languages.map((l, i) => <span key={i} className="chip-gradient">{l}</span>)}</div></Section>,
    };

    return (
        <div className="main-content">
            <ProfileHeader />
            <ImportantLinks />
            <ThemeToggle />
            <PromptShortcuts onSelect={setSelected as (key: string) => void} prompts={sectionOrder.map(key => ({ label: (sections[key].props.title as string), key }))} />
            {selected && sections[selected]}
        </div>
    );
}
