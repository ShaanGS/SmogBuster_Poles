import { useEffect, useState } from 'react';

export function JunctionSchematic() {
  const [vehiclePositions, setVehiclePositions] = useState([
    { id: 1, x: 50, y: 200, direction: 'right' },
    { id: 2, x: 350, y: 180, direction: 'left' },
    { id: 3, x: 200, y: 50, direction: 'down' },
    { id: 4, x: 180, y: 350, direction: 'up' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehiclePositions(prev => prev.map(v => {
        let newX = v.x;
        let newY = v.y;
        
        switch (v.direction) {
          case 'right':
            newX = v.x >= 350 ? 50 : v.x + 2;
            break;
          case 'left':
            newX = v.x <= 50 ? 350 : v.x - 2;
            break;
          case 'down':
            newY = v.y >= 350 ? 50 : v.y + 2;
            break;
          case 'up':
            newY = v.y <= 50 ? 350 : v.y - 2;
            break;
        }
        
        return { ...v, x: newX, y: newY };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        {/* Road texture */}
        <pattern id="roadPattern" patternUnits="userSpaceOnUse" width="20" height="20">
          <rect width="20" height="20" fill="hsl(215, 25%, 12%)" />
          <line x1="10" y1="0" x2="10" y2="20" stroke="hsl(215, 25%, 18%)" strokeWidth="1" strokeDasharray="4 4" />
        </pattern>

        {/* Streetlight glow */}
        <radialGradient id="streetlightGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(186, 100%, 42%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(186, 100%, 42%)" stopOpacity="0" />
        </radialGradient>

        {/* Emission gradient */}
        <radialGradient id="emission" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(0, 72%, 51%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(0, 72%, 51%)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="400" fill="hsl(222, 47%, 8%)" />

      {/* Roads */}
      {/* Horizontal road */}
      <rect x="0" y="160" width="400" height="80" fill="url(#roadPattern)" />
      {/* Vertical road */}
      <rect x="160" y="0" width="80" height="400" fill="url(#roadPattern)" />

      {/* Intersection */}
      <rect x="160" y="160" width="80" height="80" fill="hsl(215, 25%, 10%)" />

      {/* Road markings */}
      <line x1="0" y1="200" x2="160" y2="200" stroke="hsl(45, 93%, 47%)" strokeWidth="2" strokeDasharray="20 10" />
      <line x1="240" y1="200" x2="400" y2="200" stroke="hsl(45, 93%, 47%)" strokeWidth="2" strokeDasharray="20 10" />
      <line x1="200" y1="0" x2="200" y2="160" stroke="hsl(45, 93%, 47%)" strokeWidth="2" strokeDasharray="20 10" />
      <line x1="200" y1="240" x2="200" y2="400" stroke="hsl(45, 93%, 47%)" strokeWidth="2" strokeDasharray="20 10" />

      {/* Streetlight positions with modules */}
      {[
        { x: 140, y: 140 },
        { x: 260, y: 140 },
        { x: 140, y: 260 },
        { x: 260, y: 260 },
      ].map((pos, i) => (
        <g key={i}>
          {/* Glow effect */}
          <circle cx={pos.x} cy={pos.y} r="30" fill="url(#streetlightGlow)">
            <animate attributeName="r" values="28;35;28" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Streetlight pole */}
          <rect x={pos.x - 3} y={pos.y - 15} width="6" height="30" fill="hsl(215, 25%, 30%)" rx="1" />
          {/* Module */}
          <rect x={pos.x - 8} y={pos.y - 20} width="16" height="10" fill="hsl(186, 100%, 25%)" rx="2" stroke="hsl(186, 100%, 42%)" strokeWidth="1" />
          {/* Status indicator */}
          <circle cx={pos.x} cy={pos.y - 15} r="2" fill="hsl(142, 76%, 36%)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Vehicles with emissions */}
      {vehiclePositions.map(v => (
        <g key={v.id}>
          {/* Emission cloud */}
          <ellipse 
            cx={v.direction === 'right' ? v.x - 15 : v.direction === 'left' ? v.x + 15 : v.x} 
            cy={v.direction === 'down' ? v.y - 15 : v.direction === 'up' ? v.y + 15 : v.y} 
            rx="12" 
            ry="8" 
            fill="url(#emission)"
          />
          {/* Vehicle */}
          <rect 
            x={v.x - 10} 
            y={v.y - 6} 
            width="20" 
            height="12" 
            fill="hsl(215, 25%, 40%)" 
            rx="2"
            transform={v.direction === 'down' || v.direction === 'up' ? `rotate(90, ${v.x}, ${v.y})` : ''}
          />
        </g>
      ))}

      {/* Labels */}
      <text x="200" y="210" textAnchor="middle" fill="hsl(186, 100%, 42%)" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
        EXPOSURE ZONE
      </text>

      {/* Cluster label */}
      <text x="30" y="30" fill="hsl(var(--foreground))" fontSize="11" fontFamily="JetBrains Mono" opacity="0.7">
        CLUSTER OF UNITS
      </text>
      <line x1="30" y1="35" x2="130" y2="35" stroke="hsl(186, 100%, 42%)" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}
