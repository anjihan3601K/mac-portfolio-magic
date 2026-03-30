import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const skillsData = [
  { skill: 'Python', level: 95 },
  { skill: 'ML/DL', level: 90 },
  { skill: 'Data Science', level: 88 },
  { skill: 'SQL', level: 85 },
  { skill: 'GenAI', level: 82 },
  { skill: 'Cloud/DevOps', level: 70 },
  { skill: 'Web Dev', level: 65 },
  { skill: 'Statistics', level: 85 },
];

interface SkillsRadarChartProps {
  size?: 'sm' | 'md';
}

export const SkillsRadarChart = ({ size = 'md' }: SkillsRadarChartProps) => {
  const height = size === 'sm' ? 220 : 280;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={skillsData} cx="50%" cy="50%" outerRadius={size === 'sm' ? 70 : 95}>
        <PolarGrid stroke="rgba(255,255,255,0.15)" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: size === 'sm' ? 9 : 11 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name="Skills"
          dataKey="level"
          stroke="hsl(211, 100%, 60%)"
          fill="hsl(211, 100%, 50%)"
          fillOpacity={0.35}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
