import { useState } from 'react';
import { Mail, Send, Github, Linkedin, Globe, Phone, MapPin, ArrowRight } from 'lucide-react';
import defaultProfilePhoto from '@/assets/profile-photo.png';
import { useProfilePhotoUrl } from '@/components/admin/ProfilePhotoManager';

const quickLinks = [
  { icon: Github, label: 'GitHub', url: 'https://github.com/anjihan3601K', color: 'from-gray-600 to-gray-800' },
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9', color: 'from-blue-500 to-blue-700' },
  { icon: Globe, label: 'Kaggle', url: 'https://kaggle.com', color: 'from-cyan-500 to-cyan-700' },
];

export const MobileContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { data: uploadedPhotoUrl } = useProfilePhotoUrl();
  const profilePhoto = uploadedPhotoUrl || defaultProfilePhoto;

  const handleSend = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    const mailto = `mailto:venkat.kanamariapudi906@gmail.com?subject=${encodeURIComponent(`Message from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailto, '_blank');
  };

  return (
    <div className="min-h-screen px-5 pt-8 pb-24 overflow-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-xl mb-3">
          <img src={profilePhoto} alt="Anjani Kumar" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Let's Connect</h1>
        <p className="text-xs text-foreground/50">Got an idea? Let's build something amazing together.</p>
      </div>

      {/* Quick Contact Info */}
      <div
        className="rounded-2xl p-4 mb-6 border border-white/10 space-y-3"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Mail className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-foreground/40">Email</p>
            <p className="text-xs text-foreground">venkat.kanamariapudi906@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-foreground/40">Phone</p>
            <p className="text-xs text-foreground">+91-9381861326</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] text-foreground/40">Location</p>
            <p className="text-xs text-foreground">Andhra Pradesh, India</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex gap-3 mb-6">
        {quickLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-gradient-to-b ${link.color} text-white shadow-lg active:scale-95 transition-transform`}
          >
            <link.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{link.label}</span>
          </a>
        ))}
      </div>

      {/* Contact Form */}
      <div
        className="rounded-2xl p-4 border border-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
      >
        <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Send className="w-4 h-4 text-primary" /> Send a Message
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your Message..."
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none border border-white/10"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <button
            onClick={handleSend}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-blue-400 text-white font-medium text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg"
          >
            Send Message <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
