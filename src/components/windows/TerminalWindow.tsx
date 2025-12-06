import { useState, useEffect } from 'react';
import { WindowWrapper } from '@/components/desktop/WindowWrapper';

interface SkillCategory {
  name: string;
  items: string[];
}

const skills: SkillCategory[] = [
  { name: 'Languages', items: ['Python', 'SQL', 'R', 'JavaScript', 'TypeScript'] },
  { name: 'ML/DL', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'XGBoost'] },
  { name: 'Data Science', items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly'] },
  { name: 'GenAI/LLMs', items: ['OpenAI API', 'LangChain', 'Hugging Face', 'RAG', 'Prompt Engineering'] },
  { name: 'Cloud/DevOps', items: ['AWS', 'Docker', 'Git', 'MLflow', 'Jupyter'] },
  { name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Vector DBs'] },
  { name: 'Web Dev', items: ['FastAPI', 'Flask', 'React', 'REST APIs', 'Streamlit'] },
];

const projects = [
  'Healthcare AI Prediction System',
  'AI Resume Analyzer',
  'Sentiment Analysis Dashboard',
  'Stock Price Forecasting',
  'Customer Churn Prediction',
  'RAG-based Document QA',
];

export const TerminalWindow = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const allLines = [
    '> whoami',
    'anjani@ai-dev ~ % Anjani Kumar Kanamarlapudi',
    '> cat role.txt',
    '  AI Developer | Data Scientist | ML Engineer',
    '',
    '> ls skills/',
    '',
    ...skills.flatMap((category) => [
      `┌─── ${category.name} ───`,
      `│  ${category.items.join(' • ')}`,
      '└' + '─'.repeat(40),
      '',
    ]),
    '> ls projects/',
    '',
    ...projects.map((p, i) => `  ${i + 1}. ${p}`),
    '',
    '> echo $MISSION',
    '  "Building AI solutions that solve real-world problems"',
    '',
    '> _',
  ];

  useEffect(() => {
    if (currentLineIndex < allLines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, allLines[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, allLines]);

  return (
    <WindowWrapper id="terminal" title="Terminal — zsh" width={650} height={500}>
      <div className="h-full bg-terminal-bg p-4 font-mono text-sm overflow-auto">
        {displayedLines.map((line, index) => (
          <div
            key={index}
            className={`whitespace-pre-wrap ${
              line.startsWith('>')
                ? 'text-terminal-prompt'
                : line.startsWith('┌') || line.startsWith('│') || line.startsWith('└')
                ? 'text-terminal-green'
                : line.startsWith('  ') && /^\s+\d\./.test(line)
                ? 'text-sky-400'
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
