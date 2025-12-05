import { useRef, useState, useCallback } from 'react';
import { Tooltip } from 'react-tooltip';
import { useWindowStore, WindowId } from '@/stores/windowStore';
import { 
  Terminal, 
  Folder, 
  Mail, 
  User, 
  Globe, 
  FileText 
} from 'lucide-react';

interface DockItem {
  id: WindowId;
  name: string;
  icon: React.ReactNode;
}

const dockItems: DockItem[] = [
  { id: 'finder', name: 'Finder', icon: <Folder className="w-8 h-8" /> },
  { id: 'terminal', name: 'Terminal', icon: <Terminal className="w-8 h-8" /> },
  { id: 'safari', name: 'Safari', icon: <Globe className="w-8 h-8" /> },
  { id: 'notes', name: 'Notes', icon: <FileText className="w-8 h-8" /> },
  { id: 'contact', name: 'Contact', icon: <Mail className="w-8 h-8" /> },
  { id: 'about', name: 'About', icon: <User className="w-8 h-8" /> },
];

export const Dock = () => {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const { windows, openWindow, focusWindow } = useWindowStore();

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  const handleClick = (id: WindowId) => {
    if (windows[id].isOpen) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  const getIconScale = (index: number) => {
    if (mouseX === null) return 1;
    
    const iconWidth = 56;
    const iconCenter = index * iconWidth + iconWidth / 2;
    const distance = Math.abs(mouseX - iconCenter);
    const maxDistance = 100;
    
    if (distance > maxDistance) return 1;
    
    const scale = 1 + (1 - distance / maxDistance) * 0.5;
    return scale;
  };

  const getIconTranslateY = (index: number) => {
    if (mouseX === null) return 0;
    
    const iconWidth = 56;
    const iconCenter = index * iconWidth + iconWidth / 2;
    const distance = Math.abs(mouseX - iconCenter);
    const maxDistance = 100;
    
    if (distance > maxDistance) return 0;
    
    const translateY = -(1 - distance / maxDistance) * 20;
    return translateY;
  };

  return (
    <>
      <div
        ref={dockRef}
        className="dock-glass fixed bottom-3 left-1/2 -translate-x-1/2 px-2 py-1.5 flex items-end gap-1 z-[9998]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {dockItems.map((item, index) => {
          const scale = getIconScale(index);
          const translateY = getIconTranslateY(index);
          const isOpen = windows[item.id].isOpen;

          return (
            <button
              key={item.id}
              data-tooltip-id={`dock-${item.id}`}
              data-tooltip-content={item.name}
              onClick={() => handleClick(item.id)}
              className="dock-icon relative flex flex-col items-center p-2 rounded-xl hover:bg-secondary/50"
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-foreground shadow-lg">
                {item.icon}
              </div>
              {isOpen && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-foreground/80" />
              )}
            </button>
          );
        })}
      </div>

      {dockItems.map((item) => (
        <Tooltip
          key={item.id}
          id={`dock-${item.id}`}
          place="top"
          className="!bg-card !text-foreground !text-xs !py-1 !px-2 !rounded-md !opacity-100"
        />
      ))}
    </>
  );
};
