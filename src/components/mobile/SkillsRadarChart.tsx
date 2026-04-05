import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const skillsData = [
  { skill: 'Python', level: 95, fullMark: 100 },
  { skill: 'ML/DL', level: 90, fullMark: 100 },
  { skill: 'Data Science', level: 88, fullMark: 100 },
  { skill: 'SQL', level: 85, fullMark: 100 },
  { skill: 'GenAI', level: 82, fullMark: 100 },
  { skill: 'Cloud/DevOps', level: 70, fullMark: 100 },
  { skill: 'Web Dev', level: 65, fullMark: 100 },
  { skill: 'Statistics', level: 85, fullMark: 100 },
];

interface SkillsRadarChartProps {
  size?: 'sm' | 'md';
}

const CustomTick = ({ x, y, payload, size }: any) => {
  const skill = payload.value;
  const dataItem = skillsData.find(d => d.skill === skill);
  const level = dataItem?.level || 0;
  const fontSize = size === 'sm' ? 10 : 12;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        textAnchor="middle"
        dy={-4}
        fill="rgba(255,255,255,0.9)"
        fontSize={fontSize}
        fontWeight={600}
      >
        {skill}
      </text>
      <text
        textAnchor="middle"
        dy={fontSize + 2}
        fill="rgba(120,180,255,0.85)"
        fontSize={fontSize - 2}
        fontWeight={500}
      >
        {level}%
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-white font-semibold text-sm">{data.skill}</p>
        <p className="text-blue-300 text-xs">{data.level}% proficiency</p>
      </div>
    );
  }
  return null;
};

export const SkillsRadarChart = ({ size = 'md' }: SkillsRadarChartProps) => {
  const height = size === 'sm' ? 260 : 320;
  const outerRadius = size === 'sm' ? 75 : 105;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={skillsData} cx="50%" cy="50%" outerRadius={outerRadius}>
        <defs>
          <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(211, 100%, 65%)" stopOpacity={0.8} />
            <stop offset="100%" stopColor="hsl(260, 100%, 60%)" stopOpacity={0.4} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <PolarGrid 
          stroke="rgba(255,255,255,0.12)" 
          strokeDasharray="3 3"
        />
        <PolarAngleAxis
          dataKey="skill"
          tick={<CustomTick size={size} />}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }}
          axisLine={false}
          tickCount={5}
        />
        <Radar
          name="Skills"
          dataKey="level"
          stroke="hsl(211, 100%, 65%)"
          fill="url(#skillGradient)"
          fillOpacity={0.6}
          strokeWidth={2.5}
          filter="url(#glow)"
          dot={{
            r: 4,
            fill: 'hsl(211, 100%, 70%)',
            stroke: 'white',
            strokeWidth: 1.5,
          }}
          activeDot={{
            r: 6,
            fill: 'hsl(211, 100%, 80%)',
            stroke: 'white',
            strokeWidth: 2,
          }}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
};
