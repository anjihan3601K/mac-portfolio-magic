import { useState } from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { WelcomeScreen } from './WelcomeScreen';
import { TerminalWindow } from '@/components/windows/TerminalWindow';
import { FinderWindow } from '@/components/windows/FinderWindow';
import { ContactWindow } from '@/components/windows/ContactWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { SafariWindow } from '@/components/windows/SafariWindow';
import { NotesWindow } from '@/components/windows/NotesWindow';
import { useWindowStore } from '@/stores/windowStore';
import { Folder } from 'lucide-react';

const desktopFolders = [
  { id: 'healthcare-ai', name: 'Healthcare AI\nPrediction System', x: 'right-20', y: 'top-20' },
  { id: 'resume-analyzer', name: 'AI Resume\nAnalyzer', x: 'right-20', y: 'top-44' },
  { id: 'sentiment-analysis', name: 'Sentiment Analysis\nDashboard', x: 'right-20', y: 'top-[272px]' },
];

export const Desktop = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { openWindow } = useWindowStore();

  const handleFolderDoubleClick = (id: string) => {
    openWindow('finder');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#1a1a3e] via-[#2d1b4e] to-[#0f1629]">
      {/* Animated Background - macOS Sonoma style waves */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(30, 64, 175, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 70% 60%, rgba(88, 28, 135, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 50% 30% at 40% 80%, rgba(15, 23, 42, 0.8) 0%, transparent 50%),
              linear-gradient(to bottom right, #1e3a5f 0%, #2d1b4e 30%, #1a1a3e 60%, #0f1629 100%)
            `
          }}
        />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Welcome Screen with transparent bg */}
      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}

      {/* Welcome Message on Desktop (persistent after animation) */}
      {!showWelcome && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            <p className="text-xl md:text-2xl text-foreground/50 mb-4 font-light tracking-wide">
              Hey, I'm Anjani! welcome to my
            </p>
            <h1 className="text-5xl md:text-7xl tracking-tight">
              <span className="text-foreground/50 font-light">port</span>
              <span className="text-foreground font-bold">folio</span>
              <span className="text-foreground/50 font-light">.</span>
            </h1>
          </div>
        </div>
      )}

      {/* Menu Bar */}
      <MenuBar />

      {/* Desktop Folders - Right aligned like reference */}
      {!showWelcome && (
        <div className="absolute inset-0 pt-10 pb-24 animate-fade-in">
          {desktopFolders.map((folder) => (
            <button
              key={folder.id}
              onDoubleClick={() => handleFolderDoubleClick(folder.id)}
              className={`absolute ${folder.x} ${folder.y} p-3 flex flex-col items-center gap-1 rounded-lg hover:bg-foreground/10 transition-colors cursor-pointer`}
            >
              <div className="w-16 h-14 rounded-lg bg-gradient-to-b from-sky-400 to-sky-500 flex items-center justify-center shadow-lg">
                <Folder className="w-8 h-7 text-sky-100 fill-sky-200" />
              </div>
              <span className="text-xs text-foreground font-medium text-center whitespace-pre-line max-w-[120px] leading-tight drop-shadow-lg">
                {folder.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Windows */}
      <TerminalWindow />
      <FinderWindow />
      <ContactWindow />
      <AboutWindow />
      <SafariWindow />
      <NotesWindow />

      {/* Dock */}
      {!showWelcome && <Dock />}
    </div>
  );
};
