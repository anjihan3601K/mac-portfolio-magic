import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Brain, Database, Cloud, Code2, Briefcase, GraduationCap, MapPin, Mail, Linkedin, Github } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';

const highlights = [
  { icon: Brain, title: 'ML/AI', subtitle: 'Expert' },
  { icon: Database, title: 'Data Science', subtitle: 'Specialist' },
  { icon: Cloud, title: 'GenAI', subtitle: 'Builder' },
  { icon: Code2, title: 'Full Stack', subtitle: 'Developer' },
];

const skillCategories = [
  { name: 'Languages', skills: ['Python', 'SQL', 'R', 'JavaScript'] },
  { name: 'ML/DL', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras'] },
  { name: 'Data Science', skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
  { name: 'GenAI', skills: ['OpenAI API', 'LangChain', 'Hugging Face'] },
  { name: 'Cloud', skills: ['AWS', 'Docker', 'Git'] },
  { name: 'Web', skills: ['FastAPI', 'Flask', 'React'] },
];

const experiences = [
  {
    title: 'BCG Internship',
    company: 'Boston Consulting Group',
    description: 'Data analytics and machine learning projects for business intelligence.',
  },
  {
    title: 'Community Service Internship',
    company: 'Social Impact Project',
    description: 'ML solutions for community welfare and social impact applications.',
  },
];

export const AboutWindow = () => {
  return (
    <WindowWrapper id="about" title="About Me — Notes" width={700} height={650}>
      <div className="h-full flex bg-[#1e1e1e]">
        {/* Notes Sidebar */}
        <div className="w-48 bg-[#252526] border-r border-[#3c3c3c] flex flex-col">
          <div className="p-3 border-b border-[#3c3c3c]">
            <div className="text-xs text-[#858585] font-medium uppercase tracking-wider">Notes</div>
          </div>
          <div className="flex-1 p-2">
            <div className="p-2 rounded-md bg-[#37373d] text-[#cccccc] text-sm font-medium">
              📝 About Anjani
            </div>
          </div>
          <div className="p-3 border-t border-[#3c3c3c] text-xs text-[#858585]">
            1 Note
          </div>
        </div>

        {/* Note Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header with Profile */}
            <div className="flex gap-5 items-start">
              <img 
                src={profilePhoto} 
                alt="Anjani Kumar" 
                className="w-28 h-36 rounded-xl object-cover shadow-lg border-2 border-[#3c3c3c]"
              />
              <div className="flex-1 pt-1">
                <h1 className="text-2xl font-bold text-[#e0e0e0] mb-1">Anjani Kumar Kanamarlapudi</h1>
                <p className="text-[#569cd6] font-medium mb-3">AI Developer & Data Scientist</p>
                <div className="space-y-1.5 text-sm text-[#9cdcfe]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#858585]" />
                    <span>India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#858585]" />
                    <span>anjani.kanamarlapudi@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#3c3c3c]" />

            {/* Bio */}
            <div>
              <h2 className="text-lg font-semibold text-[#dcdcaa] mb-2">👋 About Me</h2>
              <p className="text-[#d4d4d4] leading-relaxed text-sm">
                Passionate AI Developer and Data Scientist with expertise in machine learning, deep learning, and data analytics. Experienced in building predictive models, GenAI applications, and data-driven solutions across healthcare, finance, and various domains.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-4 gap-2">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-[#2d2d30] border border-[#3c3c3c] text-center"
                >
                  <item.icon className="w-5 h-5 mx-auto mb-1.5 text-[#569cd6]" />
                  <div className="text-xs font-semibold text-[#e0e0e0]">{item.title}</div>
                  <div className="text-[10px] text-[#858585]">{item.subtitle}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg font-semibold text-[#dcdcaa] mb-3">🛠️ Technical Skills</h2>
              <div className="space-y-2">
                {skillCategories.map((category) => (
                  <div key={category.name} className="flex items-start gap-3">
                    <span className="text-xs font-medium text-[#858585] w-20 pt-1 shrink-0">{category.name}:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-[#264f78] text-[#9cdcfe] text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-lg font-semibold text-[#dcdcaa] mb-3">💼 Experience</h2>
              <div className="space-y-3">
                {experiences.map((exp, index) => (
                  <div key={index} className="p-3 rounded-lg bg-[#2d2d30] border border-[#3c3c3c]">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="w-4 h-4 text-[#ce9178]" />
                      <span className="font-medium text-[#e0e0e0] text-sm">{exp.title}</span>
                    </div>
                    <p className="text-xs text-[#569cd6] mb-1">{exp.company}</p>
                    <p className="text-xs text-[#d4d4d4]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-lg font-semibold text-[#dcdcaa] mb-3">🎓 Education</h2>
              <div className="p-3 rounded-lg bg-[#2d2d30] border border-[#3c3c3c]">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-[#4ec9b0]" />
                  <span className="font-medium text-[#e0e0e0] text-sm">B.Tech in Computer Science</span>
                </div>
                <p className="text-xs text-[#569cd6]">Currently Pursuing</p>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h2 className="text-lg font-semibold text-[#dcdcaa] mb-3">🔗 Connect</h2>
              <div className="flex gap-3">
                <a 
                  href="https://github.com/anjihan3601K" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2d2d30] border border-[#3c3c3c] hover:bg-[#37373d] transition-colors"
                >
                  <Github className="w-4 h-4 text-[#e0e0e0]" />
                  <span className="text-xs text-[#d4d4d4]">GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2d2d30] border border-[#3c3c3c] hover:bg-[#37373d] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#569cd6]" />
                  <span className="text-xs text-[#d4d4d4]">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
};
