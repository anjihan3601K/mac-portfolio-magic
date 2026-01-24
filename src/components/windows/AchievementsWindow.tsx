import { WindowWrapper } from '@/components/desktop/WindowWrapper';
import { useAchievements } from '@/hooks/usePortfolioData';
import { Award, Trophy, Medal, Star, ExternalLink, Calendar, Loader2 } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: 'certification' | 'award' | 'achievement';
  description: string | null;
  credential_url?: string | null;
}

// Fallback achievements if database is empty
const fallbackAchievements: Achievement[] = [
  {
    id: 'bcg-data-science',
    title: 'Data Science & Analytics Virtual Experience',
    organization: 'Boston Consulting Group (BCG)',
    date: '2024',
    type: 'certification',
    description: 'Completed comprehensive virtual internship focused on data science methodologies and business analytics.',
    credential_url: 'https://www.theforage.com/virtual-internships/prototype/Tcz8gTtprzAS4xSoK/Data-Science'
  },
  {
    id: 'ml-specialization',
    title: 'Machine Learning Specialization',
    organization: 'Coursera - Stanford University',
    date: '2024',
    type: 'certification',
    description: 'Comprehensive machine learning course covering supervised, unsupervised learning, and best practices.',
  },
  {
    id: 'hackathon-winner',
    title: 'AI Hackathon Winner',
    organization: 'Tech Innovation Summit',
    date: '2024',
    type: 'award',
    description: 'First place for developing an innovative AI-powered disaster management solution.',
  },
];

const getIcon = (type: Achievement['type']) => {
  switch (type) {
    case 'certification':
      return <Medal className="w-5 h-5 text-blue-400" />;
    case 'award':
      return <Trophy className="w-5 h-5 text-yellow-400" />;
    case 'achievement':
      return <Star className="w-5 h-5 text-purple-400" />;
  }
};

const getTypeColor = (type: Achievement['type']) => {
  switch (type) {
    case 'certification':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'award':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'achievement':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  }
};

export const AchievementsWindow = () => {
  const { data: dbAchievements, isLoading } = useAchievements();
  
  // Use database achievements if available, otherwise fall back to hardcoded
  const achievements = dbAchievements && dbAchievements.length > 0 
    ? dbAchievements 
    : fallbackAchievements;

  return (
    <WindowWrapper id="achievements" title="Achievements & Certifications" width={700} height={550}>
      <div className="h-full overflow-auto bg-gradient-to-b from-card to-background p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Achievements & Certifications</h2>
            <p className="text-sm text-muted-foreground">Professional certifications and awards</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Achievements Grid */
          <div className="space-y-4">
            {achievements.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No achievements yet.
              </div>
            )}
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shrink-0">
                    {getIcon(achievement.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getTypeColor(achievement.type)}`}>
                        {achievement.type}
                      </span>
                    </div>
                    <p className="text-sm text-primary font-medium mb-1">{achievement.organization}</p>
                    {achievement.description && (
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {achievement.date}
                      </span>
                      {achievement.credential_url && (
                        <a
                          href={achievement.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Credential
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </WindowWrapper>
  );
};
