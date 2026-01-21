// PromptShortcuts.tsx

type Prompt = { label: string; key: string };

export function PromptShortcuts({ onSelect, prompts, selectedKey }: { onSelect: (key: string) => void; prompts?: Prompt[]; selectedKey?: string }) {
    const chips = prompts ?? [];
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
