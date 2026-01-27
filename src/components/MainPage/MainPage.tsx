import { useState } from 'react';
import { usePortfolioData } from '../DataContext/DataContext';
import { ImportantLinks } from '../ImportantLinks/ImportantLinks';
import { ProfileHeader } from '../ProfileHeader/ProfileHeader';
import { PromptShortcuts } from '../PromptShortcuts/PromptShortcuts';
import { ExperienceSection } from '../Experience/ExperienceSection';
import { RecommendationsCarousel } from '../Recommendations/Recommendations';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { EducationSection } from '../EducationSection/EducationSection';
import { SkillsSection } from '../SkillsSection/SkillsSection';
import { GigsSection } from '../../gigs/GigsSection';

function GlassCard({ children }: { children: React.ReactNode }) {
    return <div className="glass-card" style={{ padding: '20px', marginBottom: '16px' }}>{children}</div>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section style={{ marginBottom: 48, padding: '0 16px' }}>
            <h2 style={{ marginBottom: 24, fontSize: '2rem', fontWeight: 800 }}>{title}</h2>
            {children}
        </section>
    );
}

export function MainPage() {
    const data = usePortfolioData();
    const sectionOrder = data.sectionOrder;
    const [selected, setSelected] = useState<string>(sectionOrder[0] || 'experience');

    const sections: Record<string, React.ReactElement<{ title: string }>> = {
        experience: <Section title="Experience"><ExperienceSection /></Section>,
        gigs: <Section title="Gigs"><GigsSection /></Section>,
        projects: (
            <Section title="Projects">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px'
                }}>
                    {data.projects.map((p, i) => <ProjectCard key={i} project={p} />)}
                </div>
            </Section>
        ),
        skills: <Section title="Skills"><SkillsSection /></Section>,
        licenses: <Section title="Licenses & Certifications">{data.licenses.map((l, i) => <GlassCard key={i}>{l}</GlassCard>)}</Section>,
        languages: <Section title="Languages"><div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>{data.languages.map((l, i) => <span key={i} className="chip-gradient">{l}</span>)}</div></Section>,
        publications: <Section title="Publications">{data.publications.map((p, i) => <GlassCard key={i}>{p}</GlassCard>)}</Section>,
        featuredProjects: <Section title="Featured Projects">{data.featuredProjects.map((p, i) => <GlassCard key={i}>{p}</GlassCard>)}</Section>,
        education: <Section title="Education"><EducationSection /></Section>,
    };

    return (
        <div className="main-content">
            <ProfileHeader />
            <ImportantLinks />
            <RecommendationsCarousel />
            <PromptShortcuts
                selectedKey={selected}
                onSelect={(key) => setSelected(key)}
                prompts={sectionOrder.map(key => ({ label: (sections[key].props.title as string), key }))}
            />
            {selected && sections[selected]}
        </div>
    );
}
