import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { node: 'N1', pm: 78 },
  { node: 'N2', pm: 82 },
  { node: 'N3', pm: 95 },
  { node: 'N4', pm: 71 },
  { node: 'N5', pm: 85 },
  { node: 'N6', pm: 76 },
  { node: 'N7', pm: 45 },
  { node: 'N8', pm: 88 },
];

const getBarColor = (value: number) => {
  if (value < 60) return 'hsl(142, 76%, 36%)';
  if (value < 85) return 'hsl(45, 93%, 47%)';
  return 'hsl(0, 72%, 51%)';
};

export function VarianceChart() {
  return (
    <div className="w-full h-32">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <XAxis 
            dataKey="node" 
            stroke="hsl(215, 20%, 55%)" 
            fontSize={8}
            fontFamily="JetBrains Mono"
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(215, 20%, 55%)" 
            fontSize={8}
            fontFamily="JetBrains Mono"
            tickLine={false}
            axisLine={false}
          />
          <Bar dataKey="pm" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.pm)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-[9px] text-muted-foreground text-center font-mono">Variance across nodes (µg/m³)</p>
    </div>
  );
}
