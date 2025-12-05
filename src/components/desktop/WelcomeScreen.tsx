import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
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

    // Split title into characters
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = text
        .split('')
        .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      const chars = titleRef.current.querySelectorAll('span');

      tl.fromTo(
        chars,
        { opacity: 0, y: 50, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.7)',
        }
      );
    }

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const handleCharHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!isAnimating) {
      gsap.to(e.currentTarget, {
        fontWeight: 700,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  };

  const handleCharLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!isAnimating) {
      gsap.to(e.currentTarget, {
        fontWeight: 400,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-light text-foreground mb-6 tracking-tight"
          onMouseOver={(e) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'SPAN') {
              handleCharHover(e as unknown as React.MouseEvent<HTMLSpanElement>);
            }
          }}
          onMouseOut={(e) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'SPAN') {
              handleCharLeave(e as unknown as React.MouseEvent<HTMLSpanElement>);
            }
          }}
        >
          John Doe
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground">
          Full Stack Developer
        </p>
      </div>
    </div>
  );
};
