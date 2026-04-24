import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: "6px",
      padding: "10px 14px",
      fontSize: "12px",
      fontFamily: "Inter, system-ui, sans-serif",
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      minWidth: "140px",
    }}>
      <p style={{ fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "6px" }}>{d.capital}</p>
      <p style={{ color: "var(--color-accent-primary)", marginBottom: "2px" }}>
        Attuale: <strong>{(d.actual * 100).toFixed(0)}</strong>/100
      </p>
      <p style={{ color: "var(--color-text-muted)" }}>
        Benchmark: {(d.benchmark * 100).toFixed(0)}/100
      </p>
    </div>
  );
};

const CustomTick = ({ payload, x, y, cx, cy }) => {
  const dx = x - cx;
  const isRight = dx > 1;
  const isLeft = dx < -1;
  return (
    <text
      x={x + (isRight ? 8 : isLeft ? -8 : 0)}
      y={y}
      textAnchor={isRight ? "start" : isLeft ? "end" : "middle"}
      dominantBaseline="central"
      fill="var(--color-text-secondary)"
      fontSize={12}
      fontFamily="Inter, system-ui, sans-serif"
    >
      {payload.value}
    </text>
  );
};

export const RadarChart = ({ data }) => {
  return (
    <div className="w-full h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="58%" data={data}>
          <PolarGrid stroke="var(--color-border-subtle)" />
          <PolarAngleAxis dataKey="capital" tick={<CustomTick />} />
          <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />

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
