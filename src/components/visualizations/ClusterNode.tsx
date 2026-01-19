import { cn } from '@/lib/utils';

interface ClusterNodeProps {
  id: string;
  x: number;
  y: number;
  status: 'active' | 'warning' | 'idle';
  pmValue: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export function ClusterNode({ 
  id, 
  x, 
  y, 
  status, 
  pmValue,
  isSelected,
  onClick 
}: ClusterNodeProps) {
  const statusColors = {
    active: {
      ring: 'stroke-success',
      fill: 'fill-success/20',
      glow: '0 0 20px hsl(142, 76%, 36%, 0.5)',
      text: 'text-success'
    },
    warning: {
      ring: 'stroke-warning',
      fill: 'fill-warning/20',
      glow: '0 0 20px hsl(45, 93%, 47%, 0.5)',
      text: 'text-warning'
    },
    idle: {
      ring: 'stroke-muted-foreground',
      fill: 'fill-muted/20',
      glow: 'none',
      text: 'text-muted-foreground'
    }
  };

  const config = statusColors[status];

  return (
    <g 
      transform={`translate(${x}, ${y})`} 
      onClick={onClick}
      className="cursor-pointer"
    >
      {/* Outer glow ring */}
      <circle
        r="28"
        className={cn('fill-none', config.ring)}
        strokeWidth="1"
        strokeOpacity="0.3"
        style={{ filter: isSelected ? config.glow : 'none' }}
      >
        <animate 
          attributeName="r" 
          values="26;30;26" 
          dur="2s" 
          repeatCount="indefinite" 
        />
        <animate 
          attributeName="stroke-opacity" 
          values="0.3;0.6;0.3" 
          dur="2s" 
          repeatCount="indefinite" 
        />
      </circle>

      {/* Main node circle */}
      <circle
        r="20"
        className={cn(config.fill, config.ring)}
        strokeWidth="2"
      />

      {/* Inner indicator */}
      <circle
        r="6"
        className={cn({
          'fill-success': status === 'active',
          'fill-warning': status === 'warning',
          'fill-muted-foreground': status === 'idle',
        })}
      >
        <animate 
          attributeName="opacity" 
          values="0.5;1;0.5" 
          dur="1.5s" 
          repeatCount="indefinite" 
        />
      </circle>

      {/* Node ID */}
      <text
        y="-30"
        textAnchor="middle"
        className="fill-foreground text-[10px] font-mono font-semibold"
      >
        {id}
      </text>

      {/* PM Value */}
      <text
        y="40"
        textAnchor="middle"
        className={cn('text-[9px] font-mono', config.text)}
      >
        {pmValue} µg/m³
      </text>
    </g>
  );
}
