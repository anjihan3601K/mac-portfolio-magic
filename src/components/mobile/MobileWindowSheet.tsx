import { useState } from 'react';
import { useWindowStore, WindowId } from '@/stores/windowStore';
import { X, ChevronLeft, ExternalLink, Calendar, Download, FileText, Briefcase, GraduationCap, Code2, Brain, Database, Cloud } from 'lucide-react';

const windowTitles: Record<WindowId, string> = {
  terminal: 'Terminal',
  finder: 'Portfolio',
  contact: 'Contact',
  about: 'About Me',
  safari: 'Developer Blog',
  notes: 'Notes',
  resume: 'Resume',
};

export const MobileWindowSheet = () => {
  const { windows, closeWindow, openWindow } = useWindowStore();
  
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
        return <MobileFinderContent onClose={() => closeWindow(activeWindow)} onOpenResume={() => { closeWindow('finder'); openWindow('resume'); }} />;
      case 'contact':
        return <MobileContactContent />;
      case 'about':
        return <MobileAboutContent />;
      case 'safari':
        return <MobileSafariContent />;
      case 'notes':
        return <MobileNotesContent />;
      case 'resume':
        return <MobileResumeContent />;
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
  type: 'folder' | 'link' | 'resume';
  url?: string;
  isDownload?: boolean;
  children?: FolderItem[];
  category?: string;
  description?: string;
  tech?: string[];
}

const finderData: FolderItem[] = [
  {
    id: 'work',
    name: 'Projects',
    type: 'folder',
    children: [
      { id: 'pneumonia', name: 'Pneumonia Prediction', type: 'link', url: 'https://github.com/anjani3601K', category: 'Healthcare AI' },
      { id: 'genai', name: 'GenAI Application', type: 'link', url: 'https://github.com/anjani3601K', category: 'Generative AI' },
      { id: 'stock-pred', name: 'Stock Price Prediction', type: 'link', url: 'https://github.com/anjani3601K', category: 'Financial AI' },
      { id: 'stock-analyzer', name: 'Stock Analyzer', type: 'link', url: 'https://github.com/anjani3601K', category: 'Financial AI' },
      { id: 'privacy-chat', name: 'Privacy Chat', type: 'link', url: 'https://github.com/anjani3601K', category: 'Security' },
      { id: 'car-price', name: 'Car Price Predictor', type: 'link', url: 'https://github.com/anjani3601K', category: 'Predictive Analytics' },
      { id: 'dynamic-pricing', name: 'Dynamic Pricing', type: 'link', url: 'https://github.com/anjani3601K', category: 'Business Intelligence' },
      { id: 'disaster', name: 'Disaster Management', type: 'link', url: 'https://github.com/anjani3601K', category: 'Social Impact' },
      { id: 'suraksha', name: 'Suraksha ML Models', type: 'link', url: 'https://github.com/anjani3601K', category: 'Security' },
    ]
  },
  {
    id: 'about-me',
    name: 'About me',
    type: 'folder',
    children: [
      { id: 'linkedin', name: 'LinkedIn Profile', type: 'link', url: 'https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9' },
      { id: 'github', name: 'GitHub Profile', type: 'link', url: 'https://github.com/anjani3601K' },
      { id: 'kaggle', name: 'Kaggle Profile', type: 'link', url: 'https://kaggle.com' },
    ]
  },
  {
    id: 'resume',
    name: 'Resume',
    type: 'folder',
    children: [
      { id: 'view-resume', name: 'View Resume', type: 'resume' },
    ]
  },
];

const MobileFinderContent = ({ onClose, onOpenResume }: { onClose: () => void; onOpenResume: () => void }) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);

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
    } else if (folder.type === 'resume') {
      onOpenResume();
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
  const getTitle = (): string => {
    if (currentPath.length === 0) return 'Portfolio';
    const lastPath = currentPath[currentPath.length - 1];
    const folder = finderData.find(f => f.id === lastPath);
    return folder?.name || 'Portfolio';
  };

  return (
    <div className="min-h-full bg-white dark:bg-gray-900">
      {/* iOS Navigation Header */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center px-4 py-3">
          <button 
            onClick={navigateBack}
            className="flex items-center text-blue-500 -ml-2"
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-base">Back</span>
          </button>
          <span className="flex-1 text-center font-semibold text-gray-900 dark:text-white -ml-8">
            {getTitle()}
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
                      <linearGradient id={`folderGrad-${item.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#7DD3FC" />
                        <stop offset="100%" stopColor="#38BDF8" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M5 20 L5 70 Q5 75 10 75 L90 75 Q95 75 95 70 L95 25 Q95 20 90 20 L40 20 L35 12 Q33 10 30 10 L10 10 Q5 10 5 15 Z" 
                      fill={`url(#folderGrad-${item.id})`}
                    />
                  </svg>
                </div>
              ) : item.type === 'resume' ? (
                <div className="w-16 h-16 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-red-500" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-gray-500" />
                </div>
              )}
              <span className="text-xs text-gray-800 dark:text-gray-200 font-medium text-center leading-tight max-w-[80px]">
                {item.name}
              </span>
              {item.category && (
                <span className="text-[10px] text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              )}
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

// Enhanced About content matching desktop
const skillCategories = [
  { name: 'Programming', skills: ['Python', 'SQL', 'R', 'JavaScript'], color: 'from-pink-500 to-rose-500' },
  { name: 'ML/DL', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras'], color: 'from-cyan-500 to-teal-500' },
  { name: 'Data Science', skills: ['Pandas', 'NumPy', 'Matplotlib'], color: 'from-blue-500 to-indigo-500' },
  { name: 'GenAI & LLMs', skills: ['OpenAI API', 'LangChain', 'Hugging Face'], color: 'from-purple-500 to-violet-500' },
  { name: 'Cloud & Tools', skills: ['AWS', 'Docker', 'Git'], color: 'from-teal-500 to-cyan-500' },
  { name: 'Databases', skills: ['MongoDB', 'PostgreSQL', 'MySQL'], color: 'from-blue-500 to-sky-500' },
];

const experiences = [
  { title: 'BCG Internship', company: 'Boston Consulting Group', skills: ['Python', 'Data Analytics', 'ML'] },
  { title: 'Community Service', company: 'Social Impact Project', skills: ['Python', 'ML', 'Data Science'] },
];

const MobileAboutContent = () => (
  <div className="p-4 min-h-full bg-background overflow-auto">
    {/* Hero */}
    <div className="flex flex-col items-center mb-6">
      <div className="w-24 h-32 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 border-2 border-primary/30 flex items-center justify-center mb-4">
        <span className="text-4xl font-bold gradient-text">AK</span>
      </div>
      <h2 className="text-xl font-bold text-primary text-center">Anjani Kumar Kanamarlapudi</h2>
      <p className="text-sm text-foreground/60">AI Developer & Data Scientist</p>
    </div>

    {/* Bio */}
    <div className="p-4 rounded-xl bg-foreground/5 mb-6">
      <p className="text-sm text-foreground/80 leading-relaxed">
        Passionate AI Developer with expertise in machine learning, deep learning, and data analytics. Experienced in building predictive models, GenAI applications, and data-driven solutions.
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-4 gap-2 mb-6">
      {[
        { icon: Brain, title: 'ML/AI' },
        { icon: Database, title: 'Data' },
        { icon: Cloud, title: 'GenAI' },
        { icon: Code2, title: 'Dev' },
      ].map((item, index) => (
        <div key={index} className="p-3 rounded-xl bg-secondary/50 text-center">
          <item.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
          <div className="text-xs font-medium text-foreground">{item.title}</div>
        </div>
      ))}
    </div>

    {/* Skills */}
    <h3 className="text-sm font-semibold text-primary mb-3">Technical Skills</h3>
    <div className="space-y-3 mb-6">
      {skillCategories.map((category) => (
        <div key={category.name} className="p-3 rounded-xl border border-border/50 bg-background/20">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
              <Code2 className="w-3 h-3 text-white" />
            </div>
            <h4 className="text-xs font-semibold text-foreground">{category.name}</h4>
          </div>
          <div className="flex flex-wrap gap-1">
            {category.skills.map((skill) => (
              <span key={skill} className="px-2 py-0.5 rounded-full bg-secondary/80 text-foreground/80 text-[10px]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Experience */}
    <h3 className="text-sm font-semibold text-orange-400 mb-3">Experience</h3>
    <div className="space-y-3 mb-6">
      {experiences.map((exp, index) => (
        <div key={index} className="p-3 rounded-xl border border-orange-500/30 bg-orange-500/5">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground">{exp.title}</h4>
              <p className="text-xs text-primary">{exp.company}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className="px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Education */}
    <h3 className="text-sm font-semibold text-orange-400 mb-3">Education</h3>
    <div className="p-3 rounded-xl border border-orange-500/30 bg-orange-500/5">
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">B.Tech in Computer Science</h4>
          <p className="text-xs text-primary">University | Expected Graduation</p>
        </div>
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

// Mobile Resume Viewer
const MobileResumeContent = () => {
  const resumeUrl = '/resume/Resume_Data_Scientist.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Resume_Anjani_Kumar.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/30 border-b border-border">
        <span className="text-sm font-medium text-foreground">Resume_Anjani_Kumar.pdf</span>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground text-sm transition-colors"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
      
      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={`${resumeUrl}#toolbar=0`}
          className="w-full h-full border-0"
          title="Resume PDF"
        />
      </div>
    </div>
  );
};
