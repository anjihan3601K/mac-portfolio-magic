import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface MobileWelcomeScreenProps {
  onComplete: () => void;
}

export const MobileWelcomeScreen = ({ onComplete }: MobileWelcomeScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const portfolioRef = useRef<HTMLHeadingElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete,
          });
        }, 1000);
      },
    });

    // Animate greeting first
    tl.fromTo(
      greetingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    // Split portfolio into characters for animation - ALL highlighted
    if (portfolioRef.current) {
      const text = 'portfolio.';
      portfolioRef.current.innerHTML = text
        .split('')
        .map((char, i) => {
          const isDot = char === '.';
          return `<span class="inline-block ${isDot ? 'text-foreground/50 font-light' : 'text-foreground font-bold'}">${char}</span>`;
        })
        .join('');

      const chars = portfolioRef.current.querySelectorAll('span');

      tl.fromTo(
        chars,
        { opacity: 0, y: 30, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-[#1a1a3e] via-[#2d1b4e] to-[#0f1629]"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] bg-blue-600/20 rounded-full blur-[60px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[150px] h-[150px] bg-purple-600/15 rounded-full blur-[40px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="text-center relative z-10">
        <p
          ref={greetingRef}
          className="text-lg text-foreground/70 mb-3 font-light tracking-wide"
        >
          Hey, I'm Anjani! welcome to my
        </p>
        <h1
          ref={portfolioRef}
          className="text-4xl tracking-tight"
        >
          portfolio.
        </h1>
      </div>
    </div>
  );
};
