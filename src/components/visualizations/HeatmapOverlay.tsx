import { useEffect, useState } from 'react';

interface HeatmapOverlayProps {
  className?: string;
  animate?: boolean;
}

export function HeatmapOverlay({ className, animate = true }: HeatmapOverlayProps) {
  const [opacity, setOpacity] = useState(0.7);

  useEffect(() => {
    if (!animate) return;
    
    const interval = setInterval(() => {
      setOpacity(prev => {
        const newVal = prev + (Math.random() - 0.5) * 0.1;
        return Math.max(0.5, Math.min(0.9, newVal));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [animate]);

  return (
    <svg 
      className={className} 
      viewBox="0 0 400 300" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Pollution concentration gradient */}
        <radialGradient id="pollutionCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(0, 72%, 51%)" stopOpacity="0.9" />
          <stop offset="30%" stopColor="hsl(30, 80%, 50%)" stopOpacity="0.7" />
          <stop offset="60%" stopColor="hsl(45, 93%, 47%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity="0.1" />
        </radialGradient>

        {/* Secondary pollution zones */}
        <radialGradient id="pollutionSecondary" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(45, 93%, 47%)" stopOpacity="0.7" />
          <stop offset="50%" stopColor="hsl(80, 60%, 45%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity="0.1" />
        </radialGradient>

        {/* Clean zone gradient */}
        <radialGradient id="cleanZone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(142, 76%, 36%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity="0.05" />
        </radialGradient>

        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
        </filter>
      </defs>

      {/* Main pollution concentration at intersection */}
      <ellipse 
        cx="200" 
        cy="150" 
        rx="80" 
        ry="60" 
        fill="url(#pollutionCenter)"
        filter="url(#blur)"
        opacity={opacity}
      >
        <animate 
          attributeName="rx" 
          values="75;85;75" 
          dur="4s" 
          repeatCount="indefinite" 
        />
        <animate 
          attributeName="ry" 
          values="55;65;55" 
          dur="4s" 
          repeatCount="indefinite" 
        />
      </ellipse>

      {/* Secondary pollution zones */}
      <ellipse 
        cx="120" 
        cy="100" 
        rx="50" 
        ry="35" 
        fill="url(#pollutionSecondary)"
        filter="url(#blur)"
        opacity={opacity * 0.7}
      />
      
      <ellipse 
        cx="280" 
        cy="180" 
        rx="45" 
        ry="30" 
        fill="url(#pollutionSecondary)"
        filter="url(#blur)"
        opacity={opacity * 0.6}
      />

      {/* Clean zones where treated air is released */}
      <ellipse 
        cx="200" 
        cy="80" 
        rx="40" 
        ry="25" 
        fill="url(#cleanZone)"
        filter="url(#blur)"
        opacity="0.6"
      >
        <animate 
          attributeName="opacity" 
          values="0.4;0.7;0.4" 
          dur="3s" 
          repeatCount="indefinite" 
        />
      </ellipse>

      <ellipse 
        cx="320" 
        cy="100" 
        rx="35" 
        ry="25" 
        fill="url(#cleanZone)"
        filter="url(#blur)"
        opacity="0.5"
      />
    </svg>
  );
}
