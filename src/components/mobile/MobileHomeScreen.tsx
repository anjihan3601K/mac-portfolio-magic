import { useState } from 'react';
import { useWindowStore, WindowId } from '@/stores/windowStore';
import { useAIStore } from '@/stores/aiStore';
import { Battery, Wifi, Signal, Bot } from 'lucide-react';
import { haptics } from '@/lib/haptics';

// Import dock icons
import finderIcon from '@/assets/dock-icons/finder.png';
import safariIcon from '@/assets/dock-icons/safari.png';
import notesIcon from '@/assets/dock-icons/notes.png';
import contactsIcon from '@/assets/dock-icons/contacts.png';
import aboutIcon from '@/assets/dock-icons/about.png';
import mailIcon from '@/assets/dock-icons/mail.png';
import galleryIcon from '@/assets/dock-icons/gallery.png';
import achievementsIcon from '@/assets/dock-icons/achievements.png';

type AppId = WindowId | 'ai-assistant';

interface AppItem {
  id: AppId;
  name: string;
  icon: string | 'ai';
}

const apps: AppItem[] = [
  { id: 'finder', name: 'Finder', icon: finderIcon },
  { id: 'gallery', name: 'Gallery', icon: galleryIcon },
  { id: 'achievements', name: 'Achievements', icon: achievementsIcon },
  { id: 'safari', name: 'Blog', icon: safariIcon },
  { id: 'notes', name: 'Notes', icon: notesIcon },
  { id: 'contact', name: 'Contact', icon: contactsIcon },
  { id: 'about', name: 'About Me', icon: aboutIcon },
  { id: 'resume', name: 'Resume', icon: mailIcon },
  { id: 'ai-assistant', name: 'AI Assistant', icon: 'ai' },
];

const dockApps: AppItem[] = [
  { id: 'finder', name: 'Finder', icon: finderIcon },
  { id: 'ai-assistant', name: 'AI Assistant', icon: 'ai' },
  { id: 'contact', name: 'Contact', icon: contactsIcon },
  { id: 'notes', name: 'Notes', icon: notesIcon },
];

export const MobileHomeScreen = () => {
  const { openWindow } = useWindowStore();
  const { openIntro } = useAIStore();
  const [currentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  });

  const handleAppTap = (e: React.MouseEvent | React.TouchEvent, id: WindowId) => {
    e.stopPropagation(); // prevent carousel from stealing the tap
    haptics.light();
    if (id === 'about') {
      openIntro();
      return;
    }
    openWindow(id);
  };

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Wallpaper is handled by MobilePageCarousel parent */}

      {/* iOS Status Bar */}
      <div className="relative z-50 flex items-center justify-between px-6 pt-3 pb-2 shrink-0">
        <span className="text-sm font-semibold text-foreground">{currentTime}</span>
        <div className="absolute left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full" />
        <div className="flex items-center gap-1">
          <Signal className="w-4 h-4 text-foreground" />
          <Wifi className="w-4 h-4 text-foreground" />
          <Battery className="w-5 h-5 text-foreground" />
        </div>
      </div>

      {/* Welcome Message */}
      <div className="relative z-10 px-6 pt-6 pb-4 text-center shrink-0">
        <p className="text-sm text-foreground/60 mb-1">Hey, I'm Anjani!</p>
        <h1 className="text-2xl font-bold text-foreground">
          portfolio<span className="text-foreground/50 font-light">.</span>
        </h1>
      </div>

      {/* App Grid - iOS Style */}
      <div
        className="relative z-10 flex-1 px-6 overflow-auto"
        style={{ touchAction: 'pan-y' }}
      >
        <div className="grid grid-cols-4 gap-4 gap-y-6">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={(e) => handleAppTap(e, app.id)}
              onTouchEnd={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-[16px] overflow-hidden shadow-lg bg-white/10 backdrop-blur-xl border border-white/20">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] text-foreground/90 font-medium text-center leading-tight">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* iOS Dock - Fixed at bottom */}
      <div
        className="relative z-10 px-4 pb-6 shrink-0"
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div
          className="backdrop-blur-2xl rounded-[28px] p-3 mx-auto max-w-xs border border-white/20"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          }}
        >
          <div className="flex justify-around items-center">
            {dockApps.map((app) => (
              <button
                key={app.id}
                onClick={(e) => handleAppTap(e, app.id)}
                onTouchEnd={(e) => e.stopPropagation()}
                className="w-14 h-14 rounded-[16px] overflow-hidden shadow-lg active:scale-95 transition-transform"
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};