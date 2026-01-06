import { useState } from 'react';
import { useWindowStore, WindowId } from '@/stores/windowStore';
import { Battery, Wifi, Signal } from 'lucide-react';
import { haptics } from '@/lib/haptics';
import wallpaper from '@/assets/wallpaper.jpg';

// Import dock icons
import finderIcon from '@/assets/dock-icons/finder.png';
import safariIcon from '@/assets/dock-icons/safari.png';
import notesIcon from '@/assets/dock-icons/notes.png';
import contactsIcon from '@/assets/dock-icons/contacts.png';
import aboutIcon from '@/assets/dock-icons/about.png';
import mailIcon from '@/assets/dock-icons/mail.png';
import galleryIcon from '@/assets/dock-icons/gallery.png';
import achievementsIcon from '@/assets/dock-icons/achievements.png';

interface AppItem {
  id: WindowId;
  name: string;
  icon: string;
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
];

const dockApps: AppItem[] = [
  { id: 'finder', name: 'Finder', icon: finderIcon },
  { id: 'safari', name: 'Blog', icon: safariIcon },
  { id: 'contact', name: 'Contact', icon: contactsIcon },
  { id: 'notes', name: 'Notes', icon: notesIcon },
];

export const MobileHomeScreen = () => {
  const { openWindow } = useWindowStore();
  const [currentTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  });

  const handleAppTap = (id: WindowId) => {
    haptics.light();
    openWindow(id);
  };

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Wallpaper Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      {/* Subtle overlay for readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* iOS Status Bar */}
      <div className="relative z-50 flex items-center justify-between px-6 pt-3 pb-2 shrink-0">
        <span className="text-sm font-semibold text-foreground">{currentTime}</span>
        <div className="absolute left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full" /> {/* Dynamic Island */}
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

      {/* App Grid - iOS Style (takes remaining space) */}
      <div className="relative z-10 flex-1 px-6 overflow-auto">
        <div className="grid grid-cols-4 gap-4 gap-y-6">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppTap(app.id)}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 rounded-[16px] overflow-hidden shadow-lg bg-black/20 backdrop-blur-sm">
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

      {/* Page Indicators */}
      <div className="relative z-10 flex justify-center gap-1.5 py-3 shrink-0">
        <div className="w-2 h-2 rounded-full bg-foreground" />
        <div className="w-2 h-2 rounded-full bg-foreground/30" />
        <div className="w-2 h-2 rounded-full bg-foreground/30" />
      </div>

      {/* iOS Dock - Fixed at bottom */}
      <div className="relative z-10 px-4 pb-6 shrink-0">
        <div className="bg-foreground/10 backdrop-blur-xl rounded-[28px] p-3 mx-auto max-w-xs">
          <div className="flex justify-around items-center">
            {dockApps.map((app) => (
              <button
                key={app.id}
                onClick={() => handleAppTap(app.id)}
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

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/50 rounded-full z-20" />
    </div>
  );
};
