import { Github, Linkedin, Mail, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import defaultProfilePhoto from '@/assets/profile-photo.png';
import { useProfilePhotoUrl } from '@/components/admin/ProfilePhotoManager';
import { SkillsRadarChart } from './SkillsRadarChart';

const techStack = [
  { name: 'Python', color: 'from-yellow-400 to-yellow-600' },
  { name: 'TensorFlow', color: 'from-orange-400 to-orange-600' },
  { name: 'Scikit-learn', color: 'from-blue-400 to-blue-600' },
  { name: 'Pandas', color: 'from-purple-400 to-purple-600' },
  { name: 'SQL', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Flask', color: 'from-green-400 to-green-600' },
  { name: 'Docker', color: 'from-sky-400 to-sky-600' },
  { name: 'GenAI', color: 'from-pink-400 to-pink-600' },
];

const testimonials = [
  {
    quote: "Anjani's AI models consistently deliver production-quality results. His attention to detail is remarkable.",
    author: "Project Mentor",
    role: "Senior Data Scientist",
  },
  {
    quote: "One of the most dedicated developers I've worked with. His disaster prediction system was truly innovative.",
    author: "Team Lead",
    role: "1M1B Green Skills Academy",
  },
  {
    quote: "Impressive ability to translate complex ML concepts into real-world applications with measurable impact.",
    author: "Faculty Advisor",
    role: "SRKR Engineering College",
  },
];

export const MobileAboutPage = () => {
  const { data: uploadedPhotoUrl } = useProfilePhotoUrl();
  const profilePhoto = uploadedPhotoUrl || defaultProfilePhoto;

  return (
    <div className="min-h-screen px-5 pt-8 pb-24 overflow-auto">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-xl">
            <img src={profilePhoto} alt="Anjani Kumar" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Anjani Kumar</h1>
        <p className="text-sm text-foreground/60 mb-3">AI Developer & Data Scientist</p>
        <p className="text-xs text-foreground/50 leading-relaxed max-w-[300px]">
          Building scalable AI solutions with real-world impact across healthcare, finance, and security domains.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Projects', value: '9+' },
          { label: 'Internships', value: '2' },
          { label: 'Accuracy', value: '95%+' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-3 text-center border border-white/10"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="text-xl font-bold text-foreground">{stat.value}</div>
            <div className="text-[10px] text-foreground/50 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Skills Radar */}
      <div
        className="rounded-2xl p-4 mb-8 border border-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
      >
        <h2 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <span className="w-5 h-5 rounded-md bg-primary/20 flex items-center justify-center text-[10px]">📊</span>
          Skill Proficiency
        </h2>
        <SkillsRadarChart size="md" />
      </div>

      {/* Tech Stack Pills */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-3">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech.name}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium text-white bg-gradient-to-r ${tech.color} shadow-sm`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div
        className="rounded-2xl p-4 mb-8 border border-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
      >
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" /> Experience
        </h2>
        <div className="space-y-4">
          <div className="border-l-2 border-primary/40 pl-3">
            <h3 className="text-xs font-semibold text-foreground">AI & Sustainability Intern</h3>
            <p className="text-[10px] text-primary/80">1M1B – Green Skills Academy • 2025</p>
            <p className="text-[10px] text-foreground/50 mt-1">Built AI waste classification system with 95%+ accuracy using CNNs.</p>
          </div>
          <div className="border-l-2 border-primary/40 pl-3">
            <h3 className="text-xs font-semibold text-foreground">Data Science Intern</h3>
            <p className="text-[10px] text-primary/80">Infosys Springboard • 2025</p>
            <p className="text-[10px] text-foreground/50 mt-1">Developed real estate price prediction models with 90% accuracy.</p>
          </div>
        </div>
      </div>

      {/* Education */}
      <div
        className="rounded-2xl p-4 mb-8 border border-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
      >
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" /> Education
        </h2>
        <div className="border-l-2 border-primary/40 pl-3">
          <h3 className="text-xs font-semibold text-foreground">B.Tech in AI & Data Science</h3>
          <p className="text-[10px] text-primary/80">SRKR Engineering College • 2023 – Present</p>
          <p className="text-[10px] text-foreground/50 mt-1">ML, Deep Learning, DBMS, Statistics, Data Structures</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="text-sm">💬</span> What People Say
        </h2>
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 border border-white/10"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
            >
              <p className="text-[11px] text-foreground/70 italic leading-relaxed mb-2">"{t.quote}"</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">
                  {t.author[0]}
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-foreground">{t.author}</p>
                  <p className="text-[9px] text-foreground/40">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-4">
        {[
          { icon: Github, url: 'https://github.com/anjihan3601K', label: 'GitHub' },
          { icon: Linkedin, url: 'https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9', label: 'LinkedIn' },
          { icon: Mail, url: 'mailto:venkat.kanamariapudi906@gmail.com', label: 'Email' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full flex items-center justify-center border border-white/15"
            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}
          >
            <link.icon className="w-5 h-5 text-foreground/70" />
          </a>
        ))}
      </div>
    </div>
  );
};
