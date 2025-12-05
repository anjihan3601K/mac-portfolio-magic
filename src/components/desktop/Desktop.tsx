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
  { id: 'projects', name: 'Projects', x: 50, y: 60 },
  { id: 'about', name: 'About Me', x: 50, y: 160 },
];

export const Desktop = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { openWindow } = useWindowStore();

  const handleFolderDoubleClick = (id: string) => {
    if (id === 'projects') {
      openWindow('finder');
    } else if (id === 'about') {
      openWindow('about');
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-float" />
      </div>

      {/* Welcome Screen */}
      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}

      {/* Menu Bar */}
      <MenuBar />

      {/* Desktop Folders */}
      {!showWelcome && (
        <div className="absolute inset-0 pt-10 pb-24 animate-fade-in">
          {desktopFolders.map((folder) => (
            <button
              key={folder.id}
              onDoubleClick={() => handleFolderDoubleClick(folder.id)}
              className="absolute p-3 flex flex-col items-center gap-1 rounded-lg hover:bg-foreground/10 transition-colors cursor-pointer"
              style={{ left: folder.x, top: folder.y }}
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center shadow-lg">
                <Folder className="w-8 h-8 text-primary-foreground" />
              </div>
              <span className="text-xs text-foreground font-medium text-shadow-glow">
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
