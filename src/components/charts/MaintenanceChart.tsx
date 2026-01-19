import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface MaintenanceChartProps {
  type: 'pressure' | 'dust';
}

const pressureData = [
  { day: 'D1', value: 15 },
  { day: 'D7', value: 22 },
  { day: 'D14', value: 35 },
  { day: 'D21', value: 48 },
  { day: 'D28', value: 58 },
  { day: 'D35', value: 72 },
  { day: 'D42', value: 85 },
];

const dustData = [
  { day: 'D1', value: 5 },
  { day: 'D7', value: 12 },
  { day: 'D14', value: 25 },
  { day: 'D21', value: 38 },
  { day: 'D28', value: 52 },
  { day: 'D35', value: 68 },
  { day: 'D42', value: 78 },
];

export function MaintenanceChart({ type }: MaintenanceChartProps) {
  const data = type === 'pressure' ? pressureData : dustData;
  const thresholdValue = type === 'pressure' ? 70 : 65;
  const label = type === 'pressure' ? 'Filter Pressure (Pa)' : 'ESP Dust Load (%)';
  const color = 'hsl(186, 100%, 42%)';

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(215, 25%, 20%)" />
          <XAxis 
            dataKey="day" 
            stroke="hsl(215, 20%, 55%)" 
            fontSize={10}
            fontFamily="JetBrains Mono"
          />
          <YAxis 
            stroke="hsl(215, 20%, 55%)" 
            fontSize={10}
            fontFamily="JetBrains Mono"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(222, 47%, 10%)',
              border: '1px solid hsl(215, 25%, 20%)',
              borderRadius: '4px',
              fontFamily: 'JetBrains Mono',
              fontSize: '11px',
            }}
            labelStyle={{ color: 'hsl(210, 40%, 96%)' }}
          />
          <ReferenceLine 
            y={thresholdValue} 
            stroke="hsl(45, 93%, 47%)" 
            strokeDasharray="5 5"
            label={{ 
              value: 'MAINTENANCE THRESHOLD', 
              position: 'right',
              fill: 'hsl(45, 93%, 47%)',
              fontSize: 9,
              fontFamily: 'JetBrains Mono'
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-muted-foreground text-center mt-2 font-mono">{label}</p>
    </div>
  );
}
