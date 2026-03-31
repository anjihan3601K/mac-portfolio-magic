import { useState, useRef, useCallback } from 'react';
import { MobileHomeScreen } from './MobileHomeScreen';
import { MobileAboutPage } from './MobileAboutPage';
import { MobileContactPage } from './MobileContactPage';
import wallpaper from '@/assets/wallpaper.jpg';

export const MobilePageCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  const totalPages = 3;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    setDragOffset(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.touches[0].clientX;
    const diff = touchEndX.current - touchStartX.current;
    // Limit drag at edges
    if ((currentPage === 0 && diff > 0) || (currentPage === totalPages - 1 && diff < 0)) {
      setDragOffset(diff * 0.3); // rubber-band effect
    } else {
      setDragOffset(diff);
    }
  }, [currentPage]);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    const threshold = 60;
    const diff = touchEndX.current - touchStartX.current;

    if (diff < -threshold && currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
    } else if (diff > threshold && currentPage > 0) {
      setCurrentPage((p) => p - 1);
    }
    setDragOffset(0);
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [currentPage]);

  const pageWidthPercent = 100 / totalPages;
  const translateX = -(currentPage * pageWidthPercent) + (dragOffset / (window.innerWidth || 390)) * pageWidthPercent;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Shared wallpaper background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${wallpaper})` }}
      />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />

      {/* Page slider */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full"
          style={{
            width: `${totalPages * 100}%`,
            transform: `translateX(${translateX}%)`,
            transition: isDragging.current ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* Page 1: Home */}
          <div className="w-full h-full flex-shrink-0" style={{ width: `${100 / totalPages}%` }}>
            <MobileHomeScreen />
          </div>

          {/* Page 2: About + Skills */}
          <div className="w-full h-full flex-shrink-0 overflow-auto" style={{ width: `${100 / totalPages}%` }}>
            <MobileAboutPage />
          </div>

          {/* Page 3: Contact */}
          <div className="w-full h-full flex-shrink-0 overflow-auto" style={{ width: `${100 / totalPages}%` }}>
            <MobileContactPage />
          </div>
        </div>
      </div>

      {/* Page Indicators - positioned above home indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentPage
                ? 'w-6 bg-foreground'
                : 'w-2 bg-foreground/30'
            }`}
          />
        ))}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/50 rounded-full z-20" />
    </div>
  );
};
