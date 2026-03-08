import { useState } from 'react';
import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Github, Linkedin, Globe, User, Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import defaultProfilePhoto from '@/assets/profile-photo.png';
import { useProfilePhotoUrl } from '@/components/admin/ProfilePhotoManager';

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
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const { data: uploadedPhotoUrl } = useProfilePhotoUrl();
  const profilePhoto = uploadedPhotoUrl || defaultProfilePhoto;

  const handleSendEmail = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const mailtoLink = `mailto:anjani.kanamarlapudi@gmail.com?subject=${encodeURIComponent(subject || `Message from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink, '_blank');
    
    toast({
      title: "Email app opened!",
      description: "Complete sending the email in your email app.",
    });
  };

  return (
    <WindowWrapper id="contact" title="Contact Me" width={450} height={480}>
      <div className="h-full bg-card p-5 flex flex-col overflow-auto">
        {/* Header with Profile Photo */}
        <div className="flex items-start gap-3 mb-3">
          <img 
            src={profilePhoto} 
            alt="Anjani Kumar"
            className="w-12 h-12 rounded-full object-cover shadow-md"
          />
        </div>

        {/* Let's Connect */}
        <h2 className="text-xl font-bold text-foreground mb-1">Let's Connect</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
        </p>

        {!showForm ? (
          <>
            {/* Email Button */}
            <button
              onClick={() => setShowForm(true)}
              className="w-full mb-4 flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity shadow-md"
            >
              <Mail className="w-5 h-5" />
              Contact via Email
            </button>

            {/* Social Links Grid */}
            <div className="grid grid-cols-4 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl ${link.bgColor} text-white transition-all hover:scale-105 shadow-md`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </>
        ) : (
          /* Contact Form */
          <div className="flex-1 flex flex-col">
            <div className="space-y-3 flex-1">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Your Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Your Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Let's collaborate!"
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Message *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Anjani, I'd love to discuss..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSendEmail}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </WindowWrapper>
  );
};
