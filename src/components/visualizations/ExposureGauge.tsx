import { useEffect, useState } from 'react';

interface ExposureGaugeProps {
  value: number;
  max?: number;
  label?: string;
}

export function ExposureGauge({ value, max = 100, label = 'Exposure Index' }: ExposureGaugeProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const step = value / 30;
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [value]);

  const percentage = (displayValue / max) * 100;
  const angle = (percentage / 100) * 180 - 90;

  const getColor = (pct: number) => {
    if (pct < 33) return 'hsl(142, 76%, 36%)';
    if (pct < 66) return 'hsl(45, 93%, 47%)';
    return 'hsl(0, 72%, 51%)';
  };

  const color = getColor(percentage);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(142, 76%, 36%)" />
            <stop offset="50%" stopColor="hsl(45, 93%, 47%)" />
            <stop offset="100%" stopColor="hsl(0, 72%, 51%)" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="hsl(215, 25%, 20%)"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Filled arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${percentage * 2.51} 251`}
          style={{ transition: 'stroke-dasharray 0.3s ease' }}
        />

        {/* Needle */}
        <g transform={`rotate(${angle}, 100, 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="35"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="8" fill={color} />
          <circle cx="100" cy="100" r="4" fill="hsl(222, 47%, 8%)" />
        </g>

        {/* Value text */}
        <text
          x="100"
          y="85"
          textAnchor="middle"
          fill={color}
          fontSize="24"
          fontFamily="JetBrains Mono"
          fontWeight="bold"
        >
          {Math.round(displayValue)}
        </text>

        {/* Scale labels */}
        <text x="25" y="115" fill="hsl(142, 76%, 36%)" fontSize="10" fontFamily="JetBrains Mono">LOW</text>
        <text x="170" y="115" fill="hsl(0, 72%, 51%)" fontSize="10" fontFamily="JetBrains Mono">HIGH</text>
      </svg>
      <span className="text-xs text-muted-foreground uppercase tracking-wider mt-2">{label}</span>
    </div>
  );
}
