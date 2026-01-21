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

export function PromptShortcuts({ onSelect, prompts, selectedKey }: { onSelect: (key: string) => void; prompts?: Prompt[]; selectedKey?: string }) {
    const chips = prompts ?? defaultPrompts;
    return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', justifyContent: 'center' }}>
            {chips.map((p) => (
                <button
                    key={p.key}
                    onClick={() => onSelect(p.key)}
                    className={`chip-gradient ${selectedKey === p.key ? 'active' : ''}`}
                >
                    {p.label}
                </button>
            ))}
        </div>
    );
}
