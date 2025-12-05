import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Mail, Github, Linkedin, Twitter, MapPin } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com', color: 'hover:text-foreground' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', color: 'hover:text-blue-500' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: 'hover:text-sky-500' },
];

export const ContactWindow = () => {
  return (
    <WindowWrapper id="contact" title="Contact" width={450} height={500}>
      <div className="h-full bg-card p-8 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg">
          <span className="text-4xl font-bold text-primary-foreground">JD</span>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-foreground mb-1">John Doe</h2>
        <p className="text-muted-foreground mb-4">Full Stack Developer</p>

        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-8">
          <MapPin className="w-4 h-4" />
          <span>San Francisco, CA</span>
        </div>

        {/* Connect Message */}
        <div className="w-full p-4 rounded-lg bg-secondary/50 mb-8">
          <p className="text-sm text-center text-foreground/80">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground transition-all ${link.color} hover:scale-110`}
            >
              <link.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Email Button */}
        <a
          href="mailto:hello@johndoe.com"
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>hello@johndoe.com</span>
        </a>
      </div>
    </WindowWrapper>
  );
};
