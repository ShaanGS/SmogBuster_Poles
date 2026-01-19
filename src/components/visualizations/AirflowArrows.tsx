interface AirflowArrowsProps {
  className?: string;
}

export function AirflowArrows({ className }: AirflowArrowsProps) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 400 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon 
            points="0 0, 10 3.5, 0 7" 
            fill="hsl(186, 100%, 42%)"
            opacity="0.8"
          />
        </marker>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(186, 100%, 42%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(186, 100%, 42%)" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Wind direction arrows - animated */}
      <g className="animate-pulse-glow">
        {/* Main flow arrows */}
        <path
          d="M 50 150 Q 100 140 150 150"
          stroke="url(#arrowGradient)"
          strokeWidth="3"
          strokeDasharray="8 4"
          markerEnd="url(#arrowhead)"
          className="flow-arrow"
          style={{ strokeDashoffset: 0 }}
        >
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
        </path>
        
        <path
          d="M 50 120 Q 120 100 180 110"
          stroke="url(#arrowGradient)"
          strokeWidth="2"
          strokeDasharray="6 3"
          markerEnd="url(#arrowhead)"
        >
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
        </path>

        <path
          d="M 50 180 Q 110 200 170 190"
          stroke="url(#arrowGradient)"
          strokeWidth="2"
          strokeDasharray="6 3"
          markerEnd="url(#arrowhead)"
        >
          <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.4s" repeatCount="indefinite" />
        </path>

        {/* Turbulence representation */}
        <path
          d="M 200 130 Q 230 120 250 140 Q 270 160 300 150"
          stroke="hsl(186, 100%, 42%)"
          strokeWidth="2"
          strokeOpacity="0.5"
          strokeDasharray="4 4"
          fill="none"
        >
          <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>

        <path
          d="M 200 170 Q 220 180 240 160 Q 260 140 290 150"
          stroke="hsl(186, 100%, 42%)"
          strokeWidth="2"
          strokeOpacity="0.5"
          strokeDasharray="4 4"
          fill="none"
        >
          <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.9s" repeatCount="indefinite" />
        </path>

        {/* Vertical release arrows */}
        <path
          d="M 200 200 L 200 160"
          stroke="hsl(142, 76%, 36%)"
          strokeWidth="3"
          strokeOpacity="0.7"
          markerEnd="url(#arrowhead)"
          strokeDasharray="6 3"
        >
          <animate attributeName="stroke-dashoffset" from="18" to="0" dur="0.6s" repeatCount="indefinite" />
        </path>

        <path
          d="M 250 200 L 250 165"
          stroke="hsl(142, 76%, 36%)"
          strokeWidth="2"
          strokeOpacity="0.6"
          markerEnd="url(#arrowhead)"
          strokeDasharray="5 3"
        >
          <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.7s" repeatCount="indefinite" />
        </path>

        <path
          d="M 150 200 L 150 170"
          stroke="hsl(142, 76%, 36%)"
          strokeWidth="2"
          strokeOpacity="0.6"
          markerEnd="url(#arrowhead)"
          strokeDasharray="5 3"
        >
          <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.8s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Labels */}
      <text x="30" y="100" fill="hsl(186, 100%, 42%)" fontSize="10" fontFamily="JetBrains Mono">
        WIND 7 km/h
      </text>
      <text x="190" y="220" fill="hsl(142, 76%, 36%)" fontSize="9" fontFamily="JetBrains Mono">
        TREATED AIR ↑
      </text>
    </svg>
  );
}
