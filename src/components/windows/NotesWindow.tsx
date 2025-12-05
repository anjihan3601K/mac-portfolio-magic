import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { FileText, Search } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  preview: string;
  date: string;
  content: string;
}

const notes: Note[] = [
  {
    id: '1',
    title: 'Welcome to my Portfolio',
    preview: 'Thanks for checking out my macOS-style portfolio...',
    date: 'Today',
    content: `Thanks for checking out my macOS-style portfolio!

This interactive experience was built with:
• React & TypeScript
• GSAP for animations
• Zustand for state management
• Tailwind CSS for styling

Feel free to explore the different "apps" in the dock to learn more about me and my work.`,
  },
  {
    id: '2',
    title: 'Current Projects',
    preview: 'Working on some exciting new projects...',
    date: 'Yesterday',
    content: `Currently working on:

1. AI-powered code assistant
2. Real-time collaboration platform
3. Design system library

Always looking for interesting challenges!`,
  },
  {
    id: '3',
    title: 'Tech Interests',
    preview: 'Always exploring new technologies...',
    date: 'Last Week',
    content: `Technologies I'm excited about:

• Edge computing & serverless
• AI/ML integration in web apps
• WebAssembly
• Design engineering

The intersection of design and engineering is where the magic happens.`,
  },
];

export const NotesWindow = () => {
  return (
    <WindowWrapper id="notes" title="Notes" width={700} height={500}>
      <div className="h-full bg-card flex">
        {/* Sidebar */}
        <div className="w-56 bg-finder-sidebar border-r border-border flex flex-col">
          {/* Search */}
          <div className="p-3">
            <div className="h-8 px-3 rounded-md bg-muted flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Search</span>
            </div>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-auto px-2 pb-2">
            {notes.map((note, index) => (
              <button
                key={note.id}
                className={`w-full p-3 rounded-lg text-left mb-1 transition-colors ${
                  index === 0 ? 'bg-finder-selected' : 'hover:bg-secondary/50'
                }`}
              >
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {note.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {note.date}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-1 truncate">
                      {note.preview}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-foreground mb-2">{notes[0].title}</h1>
          <div className="text-xs text-muted-foreground mb-6">{notes[0].date}</div>
          <div className="text-foreground/80 whitespace-pre-line leading-relaxed">
            {notes[0].content}
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
};
