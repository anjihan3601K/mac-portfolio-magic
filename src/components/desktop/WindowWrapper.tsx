import { useRef, useEffect, useLayoutEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useWindowStore, WindowId } from '@/stores/windowStore';
import { X, Minus, Square } from 'lucide-react';

gsap.registerPlugin(Draggable);

interface WindowWrapperProps {
  id: WindowId;
  title: string;
  children: ReactNode;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
}

export const WindowWrapper = ({
  id,
  title,
  children,
  width = 700,
  height = 500,
  minWidth = 400,
  minHeight = 300,
}: WindowWrapperProps) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable[] | null>(null);
  
  const { windows, closeWindow, focusWindow, updatePosition } = useWindowStore();
  const windowState = windows[id];

  useLayoutEffect(() => {
    if (!windowState.isOpen || !windowRef.current) return;

    // Opening animation
    gsap.fromTo(
      windowRef.current,
      {
        scale: 0.95,
        opacity: 0,
        y: 20,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      }
    );
  }, [windowState.isOpen]);

  useEffect(() => {
    if (!windowState.isOpen || !windowRef.current || !headerRef.current) return;

    // Initialize draggable
    draggableRef.current = Draggable.create(windowRef.current, {
      type: 'x,y',
      trigger: headerRef.current,
      bounds: 'body',
      inertia: true,
      onDragStart: () => focusWindow(id),
      onDragEnd: function () {
        updatePosition(id, { x: this.x, y: this.y });
      },
    });

    return () => {
      draggableRef.current?.forEach((d) => d.kill());
    };
  }, [windowState.isOpen, id, focusWindow, updatePosition]);

  // Genie effect for macOS-style minimize/close animation
  const handleClose = () => {
    if (!windowRef.current) {
      closeWindow(id);
      return;
    }

    // Get dock position for genie effect target
    const dock = document.querySelector('.dock-container');
    const dockRect = dock?.getBoundingClientRect();
    const windowRect = windowRef.current.getBoundingClientRect();
    
    const targetX = dockRect 
      ? dockRect.left + dockRect.width / 2 - windowRect.left - windowRect.width / 2
      : 0;
    const targetY = dockRect 
      ? dockRect.top - windowRect.top
      : window.innerHeight;

    // Genie effect animation
    gsap.to(windowRef.current, {
      scaleX: 0.1,
      scaleY: 0.05,
      x: targetX,
      y: targetY,
      opacity: 0,
      transformOrigin: 'bottom center',
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        gsap.set(windowRef.current, { clearProps: 'all' });
        closeWindow(id);
      },
    });
  };

  const handleFocus = () => {
    focusWindow(id);
  };

  if (!windowState.isOpen) return null;

  return (
    <div
      ref={windowRef}
      className="window-glass fixed overflow-hidden"
      style={{
        width,
        height,
        minWidth,
        minHeight,
        zIndex: windowState.zIndex,
        left: windowState.position.x,
        top: windowState.position.y,
      }}
      onMouseDown={handleFocus}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className="h-11 px-4 flex items-center gap-3 bg-card/50 border-b border-border cursor-move select-none"
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleClose}
            className="traffic-light traffic-close group flex items-center justify-center"
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/60" />
          </button>
          <button className="traffic-light traffic-minimize group flex items-center justify-center">
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black/60" />
          </button>
          <button className="traffic-light traffic-maximize group flex items-center justify-center">
            <Square className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 text-black/60" />
          </button>
        </div>

        {/* Title */}
        <span className="flex-1 text-center text-sm font-medium text-foreground truncate">
          {title}
        </span>

        {/* Spacer for centering */}
        <div className="w-14" />
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-44px)] overflow-auto">{children}</div>
    </div>
  );
};
