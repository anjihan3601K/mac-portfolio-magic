import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Github, Linkedin, Globe, User } from 'lucide-react';

const socialLinks = [
  { 
    name: 'Github', 
    icon: Github, 
    url: 'https://github.com/anjihan3601K', 
    bgColor: 'bg-emerald-500 hover:bg-emerald-600' 
  },
  { 
    name: 'Portfolio', 
    icon: Globe, 
    url: '#', 
    bgColor: 'bg-red-500 hover:bg-red-600' 
  },
  { 
    name: 'Kaggle', 
    icon: User, 
    url: 'https://kaggle.com', 
    bgColor: 'bg-sky-500 hover:bg-sky-600' 
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    url: 'https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9', 
    bgColor: 'bg-blue-600 hover:bg-blue-700' 
  },
];

export const ContactWindow = () => {
  return (
    <WindowWrapper id="contact" title="Contact Me" width={420} height={320}>
      <div className="h-full bg-card p-6 flex flex-col">
        {/* Header with Avatar */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center shadow-md overflow-hidden">
            <span className="text-lg font-bold text-white">AK</span>
          </div>
        </div>

        {/* Let's Connect */}
        <h2 className="text-xl font-bold text-foreground mb-2">Let's Connect</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
        </p>

        {/* Social Links Grid */}
        <div className="grid grid-cols-4 gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-2 p-4 rounded-xl ${link.bgColor} text-white transition-all hover:scale-105 shadow-md`}
            >
              <link.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </WindowWrapper>
  );
};
