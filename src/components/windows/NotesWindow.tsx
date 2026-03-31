import { useState } from 'react';
import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { FileText, Search, Code, BookOpen, Brain, Database, Cpu, Globe } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  preview: string;
  date: string;
  content: React.ReactNode;
}

const notes: Note[] = [
  {
    id: '1',
    title: 'Skills & Technologies',
    preview: 'Python, TensorFlow, PyTorch...',
    date: 'Updated Recently',
    content: (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Code className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-semibold text-foreground">Programming Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Python', 'JavaScript', 'TypeScript', 'SQL', 'C++', 'Java'].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-semibold text-foreground">AI / ML Frameworks</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'Hugging Face'].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-green-400" />
            <h3 className="text-base font-semibold text-foreground">Web & Tools</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['React', 'Node.js', 'Tailwind CSS', 'Git', 'Docker', 'AWS', 'MongoDB', 'PostgreSQL'].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-5 h-5 text-orange-400" />
            <h3 className="text-base font-semibold text-foreground">Data & Analytics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI', 'Tableau'].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium border border-orange-500/20">{s}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '2',
    title: 'Current Learning',
    preview: 'LLMs, Transformers, RAG...',
    date: 'In Progress',
    content: (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-semibold text-foreground">Large Language Models</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Deep diving into the architecture and fine-tuning of modern LLMs</p>
          <div className="flex flex-wrap gap-2">
            {['GPT Architecture', 'Fine-tuning', 'Prompt Engineering', 'LangChain'].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-pink-400" />
            <h3 className="text-base font-semibold text-foreground">Transformers & Attention</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Understanding self-attention mechanisms and transformer variants</p>
          <div className="flex flex-wrap gap-2">
            {['Self-Attention', 'Multi-Head Attention', 'BERT', 'Vision Transformers'].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-400 text-xs font-medium border border-pink-500/20">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Database className="w-5 h-5 text-yellow-400" />
            <h3 className="text-base font-semibold text-foreground">RAG & Vector Databases</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Building retrieval-augmented generation pipelines</p>
          <div className="flex flex-wrap gap-2">
            {['RAG Pipeline', 'Pinecone', 'ChromaDB', 'Embeddings', 'Semantic Search'].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-medium border border-yellow-500/20">{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-foreground">MLOps & Deployment</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Learning to deploy and monitor ML models at scale</p>
          <div className="flex flex-wrap gap-2">
            {['MLflow', 'Kubernetes', 'CI/CD for ML', 'Model Monitoring'].map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">{s}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export const NotesWindow = () => {
  const [selectedNote, setSelectedNote] = useState<string>('1');
  const activeNote = notes.find(n => n.id === selectedNote) || notes[0];

  return (
    <WindowWrapper id="notes" title="Notes" width={700} height={500}>
      <div className="h-full bg-card flex">
        {/* Sidebar */}
        <div className="w-56 bg-finder-sidebar border-r border-border flex flex-col">
          <div className="p-3">
            <div className="h-8 px-3 rounded-md bg-muted flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Search</span>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-2 pb-2">
            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => setSelectedNote(note.id)}
                className={`w-full p-3 rounded-lg text-left mb-1 transition-colors ${
                  selectedNote === note.id ? 'bg-finder-selected' : 'hover:bg-secondary/50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{note.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{note.date}</div>
                    <div className="text-xs text-muted-foreground/70 mt-1 truncate">{note.preview}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-foreground mb-1">{activeNote.title}</h1>
          <div className="text-xs text-muted-foreground mb-6">{activeNote.date}</div>
          {activeNote.content}
        </div>
      </div>
    </WindowWrapper>
  );
};
