import { useState, useEffect } from 'react';
import { WindowWrapper } from '@/components/desktop/WindowWrapper';

interface TechCategory {
  name: string;
  items: string[];
}

const techStack: TechCategory[] = [
  { name: 'Programming', items: ['Python', 'SQL', 'R', 'JavaScript'] },
  { name: 'ML/DL Frameworks', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras'] },
  { name: 'Data Science', items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
  { name: 'GenAI & LLMs', items: ['OpenAI API', 'LangChain', 'Hugging Face', 'Prompt Engineering'] },
  { name: 'Cloud & Tools', items: ['AWS', 'Docker', 'Git', 'Jupyter'] },
  { name: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL'] },
];

export const TerminalWindow = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const allLines = [
    '> whoami',
    'anjani@ai-portfolio ~ %',
    '',
    '> cat tech_stack.txt',
    '',
    ...techStack.flatMap((category) => [
      `┌─── ${category.name} ───`,
      ...category.items.map((item) => `│  ◉ ${item}`),
      '└────────────────',
      '',
    ]),
    '> echo "Building AI solutions for real-world impact!"',
    'Building AI solutions for real-world impact!',
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
