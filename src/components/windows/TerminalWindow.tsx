import { useState, useEffect } from 'react';
import { WindowWrapper } from '@/components/desktop/WindowWrapper';

interface TechCategory {
  name: string;
  items: string[];
}

const techStack: TechCategory[] = [
  { name: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js'] },
  { name: 'Backend', items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB'] },
  { name: 'DevOps', items: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'] },
  { name: 'Tools', items: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest'] },
];

export const TerminalWindow = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const allLines = [
    '> whoami',
    'developer@portfolio ~ %',
    '',
    '> cat tech_stack.txt',
    '',
    ...techStack.flatMap((category) => [
      `┌─── ${category.name} ───`,
      ...category.items.map((item) => `│  ◉ ${item}`),
      '└────────────────',
      '',
    ]),
    '> echo "Thanks for visiting!"',
    'Thanks for visiting!',
    '',
    '> _',
  ];

  useEffect(() => {
    if (currentLineIndex < allLines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, allLines[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, allLines]);

  return (
    <WindowWrapper id="terminal" title="Terminal — zsh" width={600} height={450}>
      <div className="h-full bg-terminal-bg p-4 font-mono text-sm overflow-auto">
        {displayedLines.map((line, index) => (
          <div
            key={index}
            className={`whitespace-pre ${
              line.startsWith('>')
                ? 'text-terminal-prompt'
                : line.startsWith('┌') || line.startsWith('│') || line.startsWith('└')
                ? 'text-terminal-green'
                : 'text-foreground/80'
            }`}
          >
            {line || '\u00A0'}
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-terminal-green animate-pulse" />
      </div>
    </WindowWrapper>
  );
};
