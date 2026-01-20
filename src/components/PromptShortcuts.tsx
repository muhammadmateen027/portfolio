// PromptShortcuts.tsx

const defaultPrompts = [
    { label: 'About', key: 'about' },
    { label: 'Featured Projects', key: 'featuredProjects' },
    { label: 'Experience', key: 'experience' },
    { label: 'Education', key: 'education' },
    { label: 'Licenses & Certifications', key: 'licenses' },
    { label: 'Projects', key: 'projects' },
    { label: 'Skills', key: 'skills' },
    { label: 'Recommendations', key: 'recommendations' },
    { label: 'Publications', key: 'publications' },
    { label: 'Languages', key: 'languages' },
];

type Prompt = { label: string; key: string };

export function PromptShortcuts({ onSelect, prompts }: { onSelect: (key: string) => void; prompts?: Prompt[] }) {
    const chips = prompts ?? defaultPrompts;
    return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {chips.map((p) => (
                <button key={p.key} onClick={() => onSelect(p.key)} className="chip-gradient">
                    {p.label}
                </button>
            ))}
        </div>
    );
}
