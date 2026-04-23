import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";

export const RadarChart = ({ data }) => {
  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="var(--color-border-subtle)" />
          <PolarAngleAxis dataKey="capital" tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
          
          <Radar
            name="Valore Attuale"
            dataKey="actual"
            stroke="var(--color-accent-primary)"
            fill="var(--color-accent-primary)"
            fillOpacity={0.3}
            isAnimationActive={true}
          />
          <Radar
            name="Benchmark"
            dataKey="benchmark"
            stroke="var(--color-text-muted)"
            fill="var(--color-text-muted)"
            fillOpacity={0.15}
            strokeDasharray="3 3"
            isAnimationActive={true}
          />
          <Legend wrapperStyle={{ fontSize: '12px', color: 'var(--color-text-secondary)' }} />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};
