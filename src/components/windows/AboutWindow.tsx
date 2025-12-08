import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Brain, Database, Cloud, Code2, Briefcase, GraduationCap } from 'lucide-react';

const highlights = [
  { icon: Brain, title: 'ML/AI', subtitle: 'Expert' },
  { icon: Database, title: 'Data Science', subtitle: 'Specialist' },
  { icon: Cloud, title: 'GenAI', subtitle: 'Builder' },
  { icon: Code2, title: 'Full Stack', subtitle: 'Developer' },
];

const skillCategories = [
  { name: 'Programming Languages', skills: ['Python', 'SQL', 'R', 'JavaScript'], color: 'from-pink-500 to-rose-500' },
  { name: 'ML/DL Frameworks', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras'], color: 'from-cyan-500 to-teal-500' },
  { name: 'Data Science', skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'], color: 'from-blue-500 to-indigo-500' },
  { name: 'GenAI & LLMs', skills: ['OpenAI API', 'LangChain', 'Hugging Face', 'Prompt Engineering'], color: 'from-purple-500 to-violet-500' },
  { name: 'Cloud & Tools', skills: ['AWS', 'Docker', 'Git', 'Jupyter'], color: 'from-teal-500 to-cyan-500' },
  { name: 'Databases', skills: ['MongoDB', 'PostgreSQL', 'MySQL'], color: 'from-blue-500 to-sky-500' },
  { name: 'Web Development', skills: ['FastAPI', 'Flask', 'React', 'REST APIs'], color: 'from-violet-500 to-purple-500' },
];

const experiences = [
  {
    title: 'BCG Internship',
    company: 'Boston Consulting Group',
    period: 'Recent',
    description: 'Worked on data analytics and machine learning projects, contributing to business intelligence solutions.',
    skills: ['Python', 'Data Analytics', 'ML'],
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Community Service Internship',
    company: 'Social Impact Project',
    period: 'Recent',
    description: 'Developed ML solutions for community welfare and social impact applications.',
    skills: ['Python', 'ML', 'Data Science'],
    color: 'from-orange-600 to-red-500',
  },
];

const education = {
  degree: "Bachelor's in Computer Science / Data Science",
  university: 'University',
  period: 'Expected Graduation',
  color: 'from-blue-500 to-cyan-500',
};

export const AboutWindow = () => {
  return (
    <WindowWrapper id="about" title="About Me" width={800} height={700}>
      <div className="h-full bg-card overflow-auto">
        {/* Hero Section */}
        <div className="p-8 flex flex-col md:flex-row gap-8 items-center border-b border-border">
          {/* Profile Image Placeholder */}
          <div className="w-48 h-60 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 border-2 border-primary/30 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5" />
            <span className="text-6xl font-bold gradient-text">AK</span>
          </div>
          
          {/* Bio */}
          <div className="flex-1 p-6 rounded-2xl border border-border/50 bg-background/30">
            <h1 className="text-2xl font-bold text-primary mb-4">Hello! I'm Anjani Kumar Kanamarlapudi</h1>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Passionate AI Developer and Data Scientist with expertise in machine learning, deep learning, and data analytics. Experienced in building predictive models, GenAI applications, and data-driven solutions across healthcare, finance, and various domains.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              With a strong foundation in mathematics, statistics, and computer science, I create data-driven solutions that solve real-world problems. From healthcare AI to financial forecasting, my work spans diverse domains with a focus on practical impact and innovation.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 border-b border-border">
          <div className="grid grid-cols-4 gap-4">
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
        </div>

        {/* Technical Skills */}
        <div className="p-6 border-b border-border">
          <h3 className="text-xl font-bold text-primary mb-6 text-center">Technical Skills</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category) => (
              <div key={category.name} className="p-4 rounded-xl border border-border/50 bg-background/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <Code2 className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">{category.name}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full bg-secondary/80 text-foreground/80 text-xs"
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
        <div className="p-6 border-b border-border">
          <h3 className="text-xl font-bold text-orange-400 mb-6 text-center">Experience</h3>
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="p-4 rounded-xl border border-orange-500/30 bg-orange-500/5">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0`}>
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{exp.title}</h4>
                    <p className="text-sm text-primary">{exp.company} | {exp.period}</p>
                    <p className="text-sm text-foreground/70 mt-2">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-orange-400 mb-6 text-center">Education</h3>
          <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-500/5">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${education.color} flex items-center justify-center flex-shrink-0`}>
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{education.degree}</h4>
                <p className="text-sm text-primary">{education.university} | {education.period}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
};
