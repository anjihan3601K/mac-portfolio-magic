import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Briefcase, GraduationCap, MapPin, Mail, Linkedin, Github, Phone } from 'lucide-react';
import defaultProfilePhoto from '@/assets/profile-photo.png';
import { useProfilePhotoUrl } from '@/components/admin/ProfilePhotoManager';

const skillCategories = [
  { name: 'Languages', skills: ['Python', 'C', 'SQL'] },
  { name: 'ML & AI', skills: ['TensorFlow', 'Scikit-learn', 'CNNs', 'Gradient Boosting'] },
  { name: 'Data Science', skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Statistical Modeling'] },
  { name: 'Databases', skills: ['MySQL', 'MongoDB'] },
  { name: 'Tools', skills: ['Git', 'GitHub', 'Jupyter Notebook', 'Docker'] },
  { name: 'Frameworks', skills: ['Flask', 'REST APIs'] },
];

const experiences = [
  {
    title: 'AI & Sustainability Intern',
    company: '1M1B – Green Skills Academy',
    period: 'May 2025 – Jun 2025',
    description: 'Built an AI-based waste classification system using 20,000+ images. Achieved 95%+ accuracy using CNNs and transfer learning.',
  },
  {
    title: 'Data Science Intern',
    company: 'Infosys Springboard',
    period: 'Sep 2025 – Nov 2025',
    description: 'Developed real estate price prediction models with 90% accuracy.',
  },
];

const projects = [
  {
    title: 'Car Price Prediction',
    year: '2024',
    description: 'Regression-based ML system achieving 95% prediction accuracy via feature engineering.',
  },
  {
    title: 'Dynamic Pricing Model for Ride-Sharing',
    year: '2024',
    description: 'ML-driven pricing optimization using demand–supply dynamics. R²: 0.84 using Gradient Boosting.',
  },
  {
    title: 'Suraksha – Natural Disaster Prediction',
    year: '2024',
    description: 'AI-powered real-time disaster forecasting platform with 95%+ accuracy for earthquakes, floods, tsunamis, and hurricanes.',
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
                Data Analyst & AI Developer
              </p>
              <div className="text-xs space-y-1 text-[#666] dark:text-[#999]">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3" /> +91-9381861326
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> venkat.kanamariapudi906@gmail.com
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#eee] dark:border-[#3c3c3c] my-4" />

          {/* About Section */}
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#000] dark:text-[#dcdcaa] mb-2">
              ## SUMMARY
            </h2>
            <p className="text-[#444] dark:text-[#d4d4d4]">
              Aspiring Data Analyst and AI Developer with strong foundations in machine learning, 
              data science, and system design. Passionate about building scalable, real-world 
              AI solutions with measurable impact.
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#000] dark:text-[#dcdcaa] mb-2">
              ## EDUCATION
            </h2>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-[#888] dark:text-[#4ec9b0]" />
              <span className="font-semibold text-[#333] dark:text-[#e0e0e0]">B.Tech in Artificial Intelligence & Data Science</span>
            </div>
            <p className="text-[#0066cc] dark:text-[#569cd6] text-xs ml-5">SRKR Engineering College • Graduating 2023 – Present</p>
            <p className="text-[#666] dark:text-[#999] text-xs ml-5 mt-1">
              Coursework: Machine Learning, Data Structures, DBMS, Statistics, Deep Learning
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
                <p className="text-[#0066cc] dark:text-[#569cd6] text-xs ml-5">{exp.company} • {exp.period}</p>
                <p className="text-[#666] dark:text-[#999] text-xs ml-5 mt-0.5">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#000] dark:text-[#dcdcaa] mb-2">
              ## KEY PROJECTS
            </h2>
            {projects.map((project, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#333] dark:text-[#e0e0e0]">{project.title}</span>
                  <span className="text-[#888] dark:text-[#666] text-xs">({project.year})</span>
                </div>
                <p className="text-[#666] dark:text-[#999] text-xs ml-0 mt-0.5">{project.description}</p>
              </div>
            ))}
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-base font-bold text-[#000] dark:text-[#dcdcaa] mb-2">
              ## CONNECT
            </h2>
            <div className="flex gap-4 ml-1">
              <a 
                href="https://github.com/anjani3601K" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#0066cc] dark:text-[#569cd6] hover:underline text-xs"
              >
                <Github className="w-3.5 h-3.5" /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/venkata-kanamarlapudi" 
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
