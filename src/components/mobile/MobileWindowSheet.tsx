import { useWindowStore, WindowId } from '@/stores/windowStore';
import { X } from 'lucide-react';
import { TerminalWindow } from '@/components/windows/TerminalWindow';
import { FinderWindow } from '@/components/windows/FinderWindow';
import { ContactWindow } from '@/components/windows/ContactWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { SafariWindow } from '@/components/windows/SafariWindow';
import { NotesWindow } from '@/components/windows/NotesWindow';

const windowTitles: Record<WindowId, string> = {
  terminal: 'Terminal',
  finder: 'Projects',
  contact: 'Contact',
  about: 'About Me',
  safari: 'Safari',
  notes: 'Notes',
};

export const MobileWindowSheet = () => {
  const { windows, closeWindow } = useWindowStore();
  
  // Get the topmost open window by zIndex
  const openWindowsList = Object.values(windows).filter(w => w.isOpen);
  const activeWindow = openWindowsList.length > 0 
    ? openWindowsList.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id 
    : null;
  
  if (!activeWindow) return null;

  const renderWindowContent = (windowId: WindowId) => {
    switch (windowId) {
      case 'terminal':
        return <MobileTerminalContent />;
      case 'finder':
        return <MobileFinderContent />;
      case 'contact':
        return <MobileContactContent />;
      case 'about':
        return <MobileAboutContent />;
      case 'safari':
        return <MobileSafariContent />;
      case 'notes':
        return <MobileNotesContent />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 animate-slide-up">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => closeWindow(activeWindow)}
      />
      
      {/* Sheet Content */}
      <div className="absolute inset-x-0 bottom-0 top-12 bg-background rounded-t-3xl overflow-hidden shadow-2xl">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-foreground/20 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
          <span className="text-lg font-semibold text-foreground">
            {windowTitles[activeWindow]}
          </span>
          <button 
            onClick={() => closeWindow(activeWindow)}
            className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto h-[calc(100%-80px)]">
          {renderWindowContent(activeWindow)}
        </div>
      </div>
    </div>
  );
};

// Simplified mobile content components
const MobileTerminalContent = () => (
  <div className="p-4 font-mono text-sm bg-terminal text-terminal-foreground min-h-full">
    <div className="text-green-400 mb-2">anjani@portfolio ~ %</div>
    <div className="text-foreground/80 mb-4">
      <p>Welcome to my portfolio terminal!</p>
      <p className="mt-2">Type 'help' for available commands.</p>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-green-400">➜</span>
      <span className="text-foreground/60">|</span>
    </div>
  </div>
);

const MobileFinderContent = () => (
  <div className="p-4 bg-finder min-h-full">
    <div className="space-y-3">
      {['Healthcare AI Prediction', 'AI Resume Analyzer', 'Sentiment Analysis'].map((project) => (
        <div key={project} className="p-4 rounded-xl bg-foreground/5 border border-border">
          <h3 className="font-medium text-foreground">{project}</h3>
          <p className="text-sm text-foreground/60 mt-1">AI/ML Project</p>
        </div>
      ))}
    </div>
  </div>
);

const MobileContactContent = () => (
  <div className="p-6 flex flex-col items-center min-h-full bg-background">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4">
      <span className="text-3xl font-bold text-white">AK</span>
    </div>
    <h2 className="text-xl font-bold text-foreground mb-1">Anjani Kumar</h2>
    <p className="text-foreground/60 mb-6">AI/ML Engineer</p>
    <div className="grid grid-cols-2 gap-3 w-full">
      {[
        { name: 'GitHub', color: 'bg-gray-800' },
        { name: 'LinkedIn', color: 'bg-blue-600' },
        { name: 'Portfolio', color: 'bg-purple-600' },
        { name: 'Kaggle', color: 'bg-cyan-500' },
      ].map((social) => (
        <button 
          key={social.name}
          className={`${social.color} text-white py-3 rounded-xl font-medium`}
        >
          {social.name}
        </button>
      ))}
    </div>
  </div>
);

const MobileAboutContent = () => (
  <div className="p-6 min-h-full bg-background">
    <h2 className="text-xl font-bold text-foreground mb-4">About Me</h2>
    <p className="text-foreground/80 leading-relaxed">
      I'm a passionate AI/ML engineer focused on building intelligent systems 
      that solve real-world problems. With expertise in deep learning, 
      natural language processing, and computer vision.
    </p>
    <div className="mt-6 space-y-3">
      <div className="p-3 rounded-xl bg-foreground/5">
        <span className="text-sm text-foreground/60">Experience</span>
        <p className="font-medium text-foreground">3+ Years</p>
      </div>
      <div className="p-3 rounded-xl bg-foreground/5">
        <span className="text-sm text-foreground/60">Focus</span>
        <p className="font-medium text-foreground">AI/ML, Deep Learning</p>
      </div>
    </div>
  </div>
);

const MobileSafariContent = () => (
  <div className="p-4 min-h-full bg-background">
    <div className="bg-foreground/5 rounded-xl p-3 mb-4">
      <input 
        type="text" 
        placeholder="Search or enter website"
        className="w-full bg-transparent text-foreground text-sm outline-none"
      />
    </div>
    <div className="text-center text-foreground/60 py-8">
      <p>Safari Browser</p>
    </div>
  </div>
);

const MobileNotesContent = () => (
  <div className="p-4 min-h-full bg-background">
    <div className="space-y-3">
      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
        <h3 className="font-medium text-foreground">Skills & Technologies</h3>
        <p className="text-sm text-foreground/60 mt-1">Python, TensorFlow, PyTorch...</p>
      </div>
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <h3 className="font-medium text-foreground">Current Learning</h3>
        <p className="text-sm text-foreground/60 mt-1">LLMs, Transformers, RAG...</p>
      </div>
    </div>
  </div>
);
