import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { Brain, Database, Cloud, Code2 } from 'lucide-react';

const highlights = [
  { icon: Brain, title: 'ML/AI', subtitle: 'Expert' },
  { icon: Database, title: 'Data Science', subtitle: 'Specialist' },
  { icon: Cloud, title: 'GenAI', subtitle: 'Builder' },
  { icon: Code2, title: 'Full Stack', subtitle: 'Developer' },
];

const skillCategories = [
  { name: 'Programming', skills: ['Python', 'SQL', 'R', 'JavaScript'] },
  { name: 'ML/DL Frameworks', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras'] },
  { name: 'Data Science', skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn'] },
  { name: 'GenAI & LLMs', skills: ['OpenAI API', 'LangChain', 'Hugging Face'] },
  { name: 'Cloud & Tools', skills: ['AWS', 'Docker', 'Git', 'Jupyter'] },
  { name: 'Databases', skills: ['MongoDB', 'PostgreSQL', 'MySQL'] },
  { name: 'Web Development', skills: ['FastAPI', 'Flask', 'React', 'REST APIs'] },
];

export const AboutWindow = () => {
  return (
    <WindowWrapper id="about" title="About Me" width={700} height={650}>
      <div className="h-full bg-card p-8 overflow-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-3">Hello! I'm Anjani Kumar Kanamarlapudi</h1>
          <p className="text-lg text-muted-foreground">
            AI Developer & Data Scientist
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
        <div className="space-y-4 text-foreground/80 mb-8">
          <p>
            Passionate AI Developer and Data Scientist with expertise in machine learning, deep learning, and data analytics. Experienced in building predictive models, GenAI applications, and data-driven solutions across healthcare, finance, and various domains.
          </p>
          <p>
            With a strong foundation in mathematics, statistics, and computer science, I create data-driven solutions that solve real-world problems. From healthcare AI to financial forecasting, my work spans diverse domains with a focus on practical impact and innovation.
          </p>
        </div>

        {/* Technical Skills */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Technical Skills</h3>
          <div className="grid grid-cols-2 gap-4">
            {skillCategories.map((category) => (
              <div key={category.name} className="p-3 rounded-lg bg-secondary/30">
                <h4 className="text-sm font-semibold text-foreground mb-2">{category.name}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-full bg-background/50 text-muted-foreground text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowWrapper>
  );
};
