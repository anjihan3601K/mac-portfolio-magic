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
  
  const { windows, closeWindow, focusWindow, minimizeWindow, toggleMaximize, updatePosition } = useWindowStore();
  const windowState = windows[id];

  useLayoutEffect(() => {
    if (!windowState.isOpen || windowState.isMinimized || !windowRef.current) return;

    gsap.fromTo(
      windowRef.current,
      { scale: 0.95, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }, [windowState.isOpen, windowState.isMinimized]);

  useEffect(() => {
    if (!windowState.isOpen || windowState.isMinimized || !windowRef.current || !headerRef.current) return;

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
  }, [windowState.isOpen, windowState.isMinimized, windowState.isMaximized, id, focusWindow, updatePosition]);

  // Sync GSAP position when maximized/restored
  useEffect(() => {
    if (!windowRef.current || !windowState.isOpen || windowState.isMinimized) return;
    if (windowState.isMaximized) {
      gsap.set(windowRef.current, { x: 0, y: 0 });
    } else {
      gsap.set(windowRef.current, { x: 0, y: 0 });
    }
  }, [windowState.isMaximized, windowState.isOpen, windowState.isMinimized]);

  const handleClose = () => {
    if (!windowRef.current) {
      closeWindow(id);
      return;
    }

    const dock = document.querySelector('.dock-container');
    const dockRect = dock?.getBoundingClientRect();
    const windowRect = windowRef.current.getBoundingClientRect();
    
    const targetX = dockRect 
      ? dockRect.left + dockRect.width / 2 - windowRect.left - windowRect.width / 2
      : 0;
    const targetY = dockRect 
      ? dockRect.top - windowRect.top
      : window.innerHeight;

    gsap.to(windowRef.current, {
      scaleX: 0.1, scaleY: 0.05,
      x: targetX, y: targetY, opacity: 0,
      transformOrigin: 'bottom center',
      duration: 0.4, ease: 'power3.in',
      onComplete: () => {
        gsap.set(windowRef.current, { clearProps: 'all' });
        closeWindow(id);
      },
    });
  };

  const handleMinimize = () => {
    if (!windowRef.current) return;

    const dock = document.querySelector('.dock-container');
    const dockRect = dock?.getBoundingClientRect();
    const windowRect = windowRef.current.getBoundingClientRect();

    const targetX = dockRect
      ? dockRect.left + dockRect.width / 2 - windowRect.left - windowRect.width / 2
      : 0;
    const targetY = dockRect
      ? dockRect.top - windowRect.top
      : window.innerHeight;

    gsap.to(windowRef.current, {
      scaleX: 0.15, scaleY: 0.08,
      x: targetX, y: targetY, opacity: 0,
      transformOrigin: 'bottom center',
      duration: 0.35, ease: 'power3.in',
      onComplete: () => {
        gsap.set(windowRef.current, { clearProps: 'all' });
        minimizeWindow(id);
      },
    });
  };

  const handleMaximize = () => {
    toggleMaximize(id);
  };

  const handleFocus = () => {
    focusWindow(id);
  };

  if (!windowState.isOpen || windowState.isMinimized) return null;

  const isMax = windowState.isMaximized;

  return (
    <div
      ref={windowRef}
      className={`window-glass fixed overflow-hidden ${isMax ? 'rounded-none' : ''}`}
      style={{
        width: isMax ? '100vw' : width,
        height: isMax ? 'calc(100vh - 28px)' : height,
        minWidth: isMax ? undefined : minWidth,
        minHeight: isMax ? undefined : minHeight,
        zIndex: windowState.zIndex,
        left: windowState.position.x,
        top: windowState.position.y,
        transition: isMax ? 'width 0.3s, height 0.3s, left 0.3s, top 0.3s' : undefined,
      }}
      onMouseDown={handleFocus}
    >
      {/* Window Header */}
      <div
        ref={headerRef}
        className="h-11 px-4 flex items-center gap-3 bg-card/50 border-b border-border cursor-move select-none"
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-2 group/traffic">
          <button
            onClick={handleClose}
            className="traffic-light traffic-close group flex items-center justify-center w-3.5 h-3.5 min-w-[14px]"
          >
            <X className="w-2 h-2 opacity-0 group-hover/traffic:opacity-100 text-black/60" />
          </button>
          <button
            onClick={handleMinimize}
            className="traffic-light traffic-minimize group flex items-center justify-center w-3.5 h-3.5 min-w-[14px]"
          >
            <Minus className="w-2 h-2 opacity-0 group-hover/traffic:opacity-100 text-black/60" />
          </button>
          <button
            onClick={handleMaximize}
            className="traffic-light traffic-maximize group flex items-center justify-center w-3.5 h-3.5 min-w-[14px]"
          >
            <Square className="w-1.5 h-1.5 opacity-0 group-hover/traffic:opacity-100 text-black/60" />
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
