import { useState, useRef, useEffect } from 'react';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import wallpaper from '@/assets/wallpaper.jpg';
import { WelcomeScreen } from './WelcomeScreen';
import { TerminalWindow } from '@/components/windows/TerminalWindow';
import { FinderWindow } from '@/components/windows/FinderWindow';
import { ContactWindow } from '@/components/windows/ContactWindow';
import { AboutWindow } from '@/components/windows/AboutWindow';
import { SafariWindow } from '@/components/windows/SafariWindow';
import { NotesWindow } from '@/components/windows/NotesWindow';
import { ResumeViewer } from '@/components/windows/ResumeViewer';
import { AchievementsWindow } from '@/components/windows/AchievementsWindow';
import { GalleryWindow } from '@/components/windows/GalleryWindow';
import { MobileHomeScreen } from '@/components/mobile/MobileHomeScreen';
import { MobileWindowSheet } from '@/components/mobile/MobileWindowSheet';
import { MobileWelcomeScreen } from '@/components/mobile/MobileWelcomeScreen';
import { useWindowStore } from '@/stores/windowStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { Folder } from 'lucide-react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);

const desktopFolders = [
  { id: 'achievements', name: 'Achievements &\nCertifications' },
  { id: 'healthcare-ai', name: 'Healthcare AI\nPrediction System' },
  { id: 'resume-analyzer', name: 'AI Resume\nAnalyzer' },
  { id: 'sentiment-analysis', name: 'Sentiment Analysis\nDashboard' },
];

export const Desktop = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { openWindow } = useWindowStore();
  const isMobile = useIsMobile();
  const folderRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioTextRef = useRef<HTMLHeadingElement>(null);

  // Initialize draggable folders
  useEffect(() => {
    if (!showWelcome && !isMobile) {
      folderRefs.current.forEach((folder) => {
        if (folder) {
          Draggable.create(folder, {
            type: 'x,y',
            bounds: '.desktop-area',
            inertia: true,
            cursor: 'default',
            activeCursor: 'grabbing',
          });
        }
      });
    }
  }, [showWelcome, isMobile]);

  // Animate hero text
  useEffect(() => {
    if (!showWelcome && portfolioTextRef.current && !isMobile) {
      const chars = portfolioTextRef.current.querySelectorAll('.portfolio-char');
      
      // Continuous subtle floating animation
      gsap.to(chars, {
        y: -3,
        duration: 1.5,
        ease: 'sine.inOut',
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true,
        },
      });
    }
  }, [showWelcome, isMobile]);

  const handleFolderDoubleClick = (id: string) => {
    if (id === 'achievements') {
      openWindow('achievements');
    } else {
      openWindow('finder');
    }
  };

  // Mobile iOS view
  if (isMobile) {
    return (
      <>
        {showWelcome && <MobileWelcomeScreen onComplete={() => setShowWelcome(false)} />}
        {!showWelcome && (
          <>
            <MobileHomeScreen />
            <MobileWindowSheet />
          </>
        )}
      </>
    );
  }

  // Desktop/Tablet macOS view
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Wallpaper Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Welcome Screen with transparent bg */}
      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}

      {/* Welcome Message on Desktop (persistent after animation) - z-0 so windows appear above */}
      {!showWelcome && (
        <div 
          ref={heroRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <div className="text-center">
            <p className="text-xl md:text-2xl text-foreground/50 mb-4 font-light tracking-wide animate-fade-in">
              Hey, I'm Anjani! welcome to my
            </p>
            <h1 
              ref={portfolioTextRef}
              className="text-5xl md:text-7xl tracking-tight flex items-center justify-center"
            >
              <span className="portfolio-char text-foreground font-bold">p</span>
              <span className="portfolio-char text-foreground font-bold">o</span>
              <span className="portfolio-char text-foreground font-bold">r</span>
              <span className="portfolio-char text-foreground font-bold">t</span>
              <span className="portfolio-char text-foreground font-bold">f</span>
              <span className="portfolio-char text-foreground font-bold">o</span>
              <span className="portfolio-char text-foreground font-bold">l</span>
              <span className="portfolio-char text-foreground font-bold">i</span>
              <span className="portfolio-char text-foreground font-bold">o</span>
              <span className="portfolio-char text-foreground/50 font-light">.</span>
            </h1>
          </div>
        </div>
      )}

      {/* Menu Bar */}
      <MenuBar />

      {/* Desktop Area with Folders */}
      {!showWelcome && (
        <div className="desktop-area absolute inset-0 pt-10 pb-24 animate-fade-in z-10">
          {desktopFolders.map((folder, index) => (
            <button
              key={folder.id}
              ref={(el) => (folderRefs.current[index] = el)}
              onDoubleClick={() => handleFolderDoubleClick(folder.id)}
              className="absolute p-3 flex flex-col items-center gap-1 rounded-lg hover:bg-foreground/10 transition-colors cursor-default select-none z-10"
              style={{ 
                right: 80, 
                top: 80 + index * 110,
              }}
            >
              <div className="w-16 h-14 rounded-lg bg-gradient-to-b from-sky-400 to-sky-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
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
      <ResumeViewer />
      <AchievementsWindow />
      <GalleryWindow />

      {/* Dock */}
      {!showWelcome && <Dock />}
    </div>
  );
};
