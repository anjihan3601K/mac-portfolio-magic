import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Code2, Palette, Rocket, Heart } from 'lucide-react';

const highlights = [
  { icon: Code2, title: '5+ Years', subtitle: 'Experience' },
  { icon: Palette, title: '50+', subtitle: 'Projects' },
  { icon: Rocket, title: '30+', subtitle: 'Clients' },
  { icon: Heart, title: '100%', subtitle: 'Passion' },
];

export const AboutWindow = () => {
  return (
    <WindowWrapper id="about" title="About Me" width={600} height={550}>
      <div className="h-full bg-card p-8 overflow-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-3">Hello, I'm John</h1>
          <p className="text-lg text-muted-foreground">
            A passionate developer creating digital experiences
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/50 text-center hover:bg-secondary transition-colors"
            >
              <item.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-lg font-bold text-foreground">{item.title}</div>
              <div className="text-xs text-muted-foreground">{item.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="space-y-4 text-foreground/80">
          <p>
            I'm a full-stack developer with a passion for creating beautiful, functional, and user-centered digital experiences. With 5+ years of experience in the field, I am always looking for new and innovative ways to bring my clients' visions to life.
          </p>
          <p>
            I specialize in building modern web applications using React, TypeScript, and Node.js. I have a keen eye for design and believe that great software is not just about functionality—it's about crafting experiences that delight users.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while reading about the latest in tech.
          </p>
        </div>

        {/* Skills Tags */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Current Focus
          </h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind', 'AWS', 'Docker'].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
};
