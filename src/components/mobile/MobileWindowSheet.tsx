import { useState } from 'react';
import { useWindowStore, WindowId } from '@/stores/windowStore';
import { X, ChevronLeft, ExternalLink, Calendar, Folder } from 'lucide-react';

const windowTitles: Record<WindowId, string> = {
  terminal: 'Terminal',
  finder: 'Portfolio',
  contact: 'Contact',
  about: 'About Me',
  safari: 'Developer Blog',
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
        return <MobileFinderContent onClose={() => closeWindow(activeWindow)} />;
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
        
        {/* Header - Only for non-finder windows */}
        {activeWindow !== 'finder' && (
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
        )}
        
        {/* Content */}
        <div className={`flex-1 overflow-auto ${activeWindow !== 'finder' ? 'h-[calc(100%-80px)]' : 'h-[calc(100%-40px)]'}`}>
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

// iOS-style Finder with folder navigation
interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'link';
  url?: string;
  children?: FolderItem[];
}

const finderData: FolderItem[] = [
  {
    id: 'work',
    name: 'Work',
    type: 'folder',
    children: [
      { id: 'healthcare', name: 'Healthcare AI Prediction', type: 'link', url: 'https://github.com/anjani3601K' },
      { id: 'resume-analyzer', name: 'AI Resume Analyzer', type: 'link', url: 'https://github.com/anjani3601K' },
      { id: 'sentiment', name: 'Sentiment Analysis Dashboard', type: 'link', url: 'https://github.com/anjani3601K' },
    ]
  },
  {
    id: 'about-me',
    name: 'About me',
    type: 'folder',
    children: [
      { id: 'linkedin', name: 'LinkedIn Profile', type: 'link', url: 'https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9' },
      { id: 'github', name: 'GitHub Profile', type: 'link', url: 'https://github.com/anjani3601K' },
    ]
  },
  {
    id: 'resume',
    name: 'Resume',
    type: 'folder',
    children: [
      { id: 'view-resume', name: 'View Resume', type: 'link', url: '#' },
      { id: 'download-resume', name: 'Download PDF', type: 'link', url: '#' },
    ]
  },
];

const MobileFinderContent = ({ onClose }: { onClose: () => void }) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState<FolderItem[] | null>(null);

  const getCurrentItems = (): FolderItem[] => {
    if (currentPath.length === 0) return finderData;
    
    let items: FolderItem[] = finderData;
    for (const pathId of currentPath) {
      const folder = items.find(item => item.id === pathId);
      if (folder?.children) {
        items = folder.children;
      }
    }
    return items;
  };

  const navigateToFolder = (folder: FolderItem) => {
    if (folder.type === 'folder' && folder.children) {
      setCurrentPath([...currentPath, folder.id]);
    } else if (folder.type === 'link' && folder.url) {
      window.open(folder.url, '_blank');
    }
  };

  const navigateBack = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
    } else {
      onClose();
    }
  };

  const currentItems = getCurrentItems();
  const currentTitle = currentPath.length === 0 
    ? 'Portfolio' 
    : finderData.find(f => f.id === currentPath[currentPath.length - 1])?.name || 'Portfolio';

  return (
    <div className="min-h-full bg-white">
      {/* iOS Navigation Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <button 
            onClick={navigateBack}
            className="flex items-center text-blue-500 -ml-2"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-base">Go Back</span>
          </button>
          <span className="flex-1 text-center font-semibold text-gray-900 -ml-8">
            {currentTitle}
          </span>
        </div>
      </div>

      {/* Folder Grid - iOS Style */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateToFolder(item)}
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              {item.type === 'folder' ? (
                <div className="w-20 h-16 relative">
                  <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md">
                    <defs>
                      <linearGradient id="folderGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#7DD3FC" />
                        <stop offset="100%" stopColor="#38BDF8" />
                      </linearGradient>
                      <linearGradient id="folderTabGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#0EA5E9" />
                      </linearGradient>
                    </defs>
                    {/* Folder back */}
                    <path 
                      d="M5 20 L5 70 Q5 75 10 75 L90 75 Q95 75 95 70 L95 25 Q95 20 90 20 L40 20 L35 12 Q33 10 30 10 L10 10 Q5 10 5 15 Z" 
                      fill="url(#folderGradient)"
                    />
                    {/* Folder tab */}
                    <path 
                      d="M5 15 Q5 10 10 10 L30 10 Q33 10 35 12 L40 20 L5 20 Z" 
                      fill="url(#folderTabGradient)"
                    />
                    {/* Folder front shadow */}
                    <path 
                      d="M5 25 L95 25 L95 70 Q95 75 90 75 L10 75 Q5 75 5 70 Z" 
                      fill="rgba(0,0,0,0.1)"
                    />
                    {/* Folder front */}
                    <path 
                      d="M5 28 L95 28 L95 70 Q95 75 90 75 L10 75 Q5 75 5 70 Z" 
                      fill="url(#folderGradient)"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-gray-500" />
                </div>
              )}
              <span className="text-xs text-gray-800 font-medium text-center leading-tight max-w-[80px]">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileContactContent = () => (
  <div className="p-6 flex flex-col items-center min-h-full bg-background">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4">
      <span className="text-3xl font-bold text-white">AK</span>
    </div>
    <h2 className="text-xl font-bold text-foreground mb-1">Anjani Kumar</h2>
    <p className="text-foreground/60 mb-6">AI/ML Engineer</p>
    <div className="grid grid-cols-2 gap-3 w-full">
      {[
        { name: 'GitHub', color: 'bg-gray-800', url: 'https://github.com/anjani3601K' },
        { name: 'LinkedIn', color: 'bg-blue-600', url: 'https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9' },
        { name: 'Portfolio', color: 'bg-purple-600', url: '#' },
        { name: 'Kaggle', color: 'bg-cyan-500', url: 'https://kaggle.com' },
      ].map((social) => (
        <a 
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${social.color} text-white py-3 rounded-xl font-medium text-center`}
        >
          {social.name}
        </a>
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

// Developer Blog content for Safari
interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable ML Pipelines',
    date: '2024-01-15',
    excerpt: 'Learn the best practices for building production-ready machine learning pipelines.',
    url: '#',
  },
  {
    id: '2',
    title: 'The Future of LLMs',
    date: '2024-01-08',
    excerpt: 'Exploring emerging trends in Large Language Models and their applications.',
    url: '#',
  },
  {
    id: '3',
    title: 'Mastering PyTorch',
    date: '2023-12-20',
    excerpt: 'A comprehensive guide to deep learning with PyTorch framework.',
    url: '#',
  },
  {
    id: '4',
    title: 'RAG Systems Explained',
    date: '2023-12-10',
    excerpt: 'How to build Retrieval-Augmented Generation systems for better AI responses.',
    url: '#',
  },
];

const MobileSafariContent = () => (
  <div className="min-h-full bg-background">
    {/* Safari URL Bar */}
    <div className="sticky top-0 z-10 p-3 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="bg-foreground/5 rounded-xl p-3">
        <span className="text-sm text-foreground/60">anjani.dev/blog</span>
      </div>
    </div>
    
    {/* Blog Content */}
    <div className="p-4">
      <h1 className="text-xl font-bold text-foreground mb-2">Developer Blog</h1>
      <p className="text-sm text-foreground/60 mb-6">Thoughts on AI, ML, and building great products.</p>
      
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="p-4 rounded-xl bg-foreground/5 active:bg-foreground/10 transition-colors"
          >
            <h2 className="font-semibold text-foreground mb-2">{post.title}</h2>
            <p className="text-sm text-foreground/70 mb-3 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center gap-2 text-xs text-foreground/50">
              <Calendar className="w-3 h-3" />
              <span>{new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </article>
        ))}
      </div>
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
