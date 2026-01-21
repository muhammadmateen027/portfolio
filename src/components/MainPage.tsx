import { useState } from 'react';
import { usePortfolioData } from './DataContext';
import { ImportantLinks } from './ImportantLinks';
import { ProfileHeader } from './ProfileHeader';
import { PromptShortcuts } from './PromptShortcuts';
import { ExperienceSection } from './ExperienceSection';
import React from 'react';
import { RecommendationsCarousel } from './Recommendations';

function GlassCard({ children }: { children: React.ReactNode }) {
    return <div className="glass-card">{children}</div>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section style={{ marginBottom: 48, padding: 0 }}>
            <h2 style={{ marginBottom: 24, fontSize: '2rem', fontWeight: 800 }}>{title}</h2>
            {children}
        </section>
    );
}

const sectionOrder = [
    'experience',
    'projects',
    'skills',
    'licenses',
    'languages',
    'publications',
    'featuredProjects',
    'education',
] as const;
type SectionKey = typeof sectionOrder[number];

export function MainPage() {
    const [selected, setSelected] = useState<SectionKey>('experience');
    const data = usePortfolioData();

    const sections: Record<SectionKey, React.ReactElement<{ title: string }>> = {
        experience: <Section title="Experience"><ExperienceSection /></Section>,
        projects: <Section title="Projects">{data.projects.map((p, i) => <GlassCard key={i}>{p}</GlassCard>)}</Section>,
        skills: <Section title="Skills"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>{data.skills.map((s, i) => <span key={i} className="chip-gradient">{s}</span>)}</div></Section>,
        licenses: <Section title="Licenses & Certifications">{data.licenses.map((l, i) => <GlassCard key={i}>{l}</GlassCard>)}</Section>,
        languages: <Section title="Languages"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>{data.languages.map((l, i) => <span key={i} className="chip-gradient">{l}</span>)}</div></Section>,
        publications: <Section title="Publications">{data.publications.map((p, i) => <GlassCard key={i}>{p}</GlassCard>)}</Section>,
        featuredProjects: <Section title="Featured Projects">{data.featuredProjects.map((p, i) => <GlassCard key={i}>{p}</GlassCard>)}</Section>,
        education: <Section title="Education">{data.education.map((e, i) => <GlassCard key={i}>{e}</GlassCard>)}</Section>,
    };

    return (
        <div className="main-content">
            <ProfileHeader />
            <ImportantLinks />
            <RecommendationsCarousel />
            <PromptShortcuts
                selectedKey={selected}
                onSelect={(key) => setSelected(key as SectionKey)}
                prompts={sectionOrder.map(key => ({ label: (sections[key].props.title as string), key }))}
            />
            {selected && sections[selected]}
        </div>
    );
}
