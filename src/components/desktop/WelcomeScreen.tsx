import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
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
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete,
          });
        }, 1500);
      },
    });

    // Animate greeting first
    tl.fromTo(
      greetingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    // Split portfolio into characters for animation
    if (portfolioRef.current) {
      const text = 'portfolio.';
      portfolioRef.current.innerHTML = text
        .split('')
        .map((char, i) => {
          // "folio" part (index 4-8) gets different styling
          const isHighlighted = i >= 4 && i <= 7;
          return `<span class="inline-block ${isHighlighted ? 'text-foreground font-bold' : 'text-foreground/60 font-light'}">${char}</span>`;
        })
        .join('');

      const chars = portfolioRef.current.querySelectorAll('span');

      tl.fromTo(
        chars,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      );
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{ background: 'transparent' }}
    >
      <div className="text-center">
        <p
          ref={greetingRef}
          className="text-xl md:text-2xl text-foreground/70 mb-4 font-light tracking-wide"
        >
          Hey, I'm Anjani! welcome to my
        </p>
        <h1
          ref={portfolioRef}
          className="text-6xl md:text-8xl tracking-tight"
        >
          portfolio.
        </h1>
      </div>
    </div>
  );
};
