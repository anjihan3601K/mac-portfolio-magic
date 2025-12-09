import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Brain, Database, Cloud, Code2, Briefcase, GraduationCap, MapPin, Mail, Linkedin, Github } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.png';

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
    <WindowWrapper id="about" title="About Me.txt — TextEdit" width={650} height={600}>
      <div className="h-full bg-[#fefefe] dark:bg-[#1e1e1e] overflow-auto">
        {/* TextEdit Toolbar */}
        <div className="h-9 bg-gradient-to-b from-[#f6f6f6] to-[#ebebeb] dark:from-[#3c3c3c] dark:to-[#323232] border-b border-[#c8c8c8] dark:border-[#2a2a2a] px-3 flex items-center gap-2">
          <div className="flex items-center gap-1 text-[10px] text-[#666] dark:text-[#999]">
            <span className="px-1.5 py-0.5 bg-[#fff] dark:bg-[#2d2d2d] border border-[#ccc] dark:border-[#4a4a4a] rounded text-[9px]">
              Plain Text
            </span>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-6 font-mono text-sm leading-relaxed text-[#333] dark:text-[#d4d4d4]">
          {/* Header */}
          <div className="flex gap-5 mb-6">
            <img 
              src={profilePhoto} 
              alt="Anjani Kumar" 
              className="w-24 h-32 rounded-lg object-cover border border-[#ddd] dark:border-[#444]"
            />
            <div>
              <h1 className="text-xl font-bold text-[#000] dark:text-[#fff] mb-1">
                Anjani Kumar Kanamarlapudi
              </h1>
              <p className="text-[#0066cc] dark:text-[#569cd6] font-medium mb-2">
                AI Developer & Data Scientist
              </p>
              <div className="text-xs space-y-1 text-[#666] dark:text-[#999]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> India
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> anjani.kanamarlapudi@gmail.com
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#eee] dark:border-[#3c3c3c] my-4" />

          {/* About Section */}
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#000] dark:text-[#dcdcaa] mb-2">
              ## ABOUT ME
            </h2>
            <p className="text-[#444] dark:text-[#d4d4d4]">
              Passionate AI Developer and Data Scientist with expertise in machine learning, 
              deep learning, and data analytics. Experienced in building predictive models, 
              GenAI applications, and data-driven solutions across healthcare, finance, 
              and various domains.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#000] dark:text-[#dcdcaa] mb-2">
              ## TECHNICAL SKILLS
            </h2>
            <div className="space-y-1.5">
              {skillCategories.map((category) => (
                <div key={category.name} className="flex">
                  <span className="w-24 text-[#888] dark:text-[#858585] shrink-0">{category.name}:</span>
                  <span className="text-[#444] dark:text-[#9cdcfe]">{category.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#000] dark:text-[#dcdcaa] mb-2">
              ## EXPERIENCE
            </h2>
            {experiences.map((exp, index) => (
              <div key={index} className="mb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-[#888] dark:text-[#ce9178]" />
                  <span className="font-semibold text-[#333] dark:text-[#e0e0e0]">{exp.title}</span>
                </div>
                <p className="text-[#0066cc] dark:text-[#569cd6] text-xs ml-5">{exp.company}</p>
                <p className="text-[#666] dark:text-[#999] text-xs ml-5 mt-0.5">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#000] dark:text-[#dcdcaa] mb-2">
              ## EDUCATION
            </h2>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#888] dark:text-[#4ec9b0]" />
              <span className="font-semibold text-[#333] dark:text-[#e0e0e0]">B.Tech in Computer Science</span>
            </div>
            <p className="text-[#0066cc] dark:text-[#569cd6] text-xs ml-5">Currently Pursuing</p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-base font-bold text-[#000] dark:text-[#dcdcaa] mb-2">
              ## CONNECT
            </h2>
            <div className="flex gap-4 ml-1">
              <a 
                href="https://github.com/anjihan3601K" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#0066cc] dark:text-[#569cd6] hover:underline text-xs"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#0066cc] dark:text-[#569cd6] hover:underline text-xs"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="border-t border-[#eee] dark:border-[#3c3c3c] my-4" />
          
          <p className="text-[10px] text-[#999] dark:text-[#666] text-center">
            — End of Document —
          </p>
        </div>
      </div>
    </WindowWrapper>
  );
};
