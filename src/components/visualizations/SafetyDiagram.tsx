import { Shield, Thermometer, Wind, Zap, AlertTriangle } from 'lucide-react';

export function SafetyDiagram() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="chamberGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(215, 25%, 25%)" />
          <stop offset="100%" stopColor="hsl(215, 25%, 15%)" />
        </linearGradient>

        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main enclosure */}
      <rect
        x="100"
        y="50"
        width="200"
        height="200"
        rx="8"
        fill="url(#chamberGradient)"
        stroke="hsl(215, 25%, 35%)"
        strokeWidth="2"
      />

      {/* Fire-retardant label */}
      <text x="200" y="40" textAnchor="middle" fill="hsl(45, 93%, 47%)" fontSize="9" fontFamily="JetBrains Mono">
        FIRE-RETARDANT ENCLOSURE
      </text>

      {/* Inner chamber (ESP) */}
      <rect
        x="130"
        y="80"
        width="140"
        height="100"
        rx="4"
        fill="hsl(215, 25%, 12%)"
        stroke="hsl(0, 72%, 51%)"
        strokeWidth="1"
        strokeDasharray="4 2"
      />

      {/* High voltage warning lines */}
      <g stroke="hsl(0, 72%, 51%)" strokeWidth="1" opacity="0.6">
        <line x1="145" y1="100" x2="145" y2="160" />
        <line x1="165" y1="100" x2="165" y2="160" />
        <line x1="185" y1="100" x2="185" y2="160" />
        <line x1="205" y1="100" x2="205" y2="160" />
        <line x1="225" y1="100" x2="225" y2="160" />
        <line x1="245" y1="100" x2="245" y2="160" />
      </g>

      {/* ESP label */}
      <text x="200" y="130" textAnchor="middle" fill="hsl(0, 72%, 51%)" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
        HIGH-VOLTAGE ESP
      </text>
      <text x="200" y="145" textAnchor="middle" fill="hsl(0, 72%, 51%)" fontSize="8" fontFamily="JetBrains Mono" opacity="0.7">
        18.2 kV ENCLOSED
      </text>

      {/* Ozone sensor */}
      <circle cx="280" cy="100" r="15" fill="hsl(215, 25%, 20%)" stroke="hsl(142, 76%, 36%)" strokeWidth="2" />
      <text x="280" y="104" textAnchor="middle" fill="hsl(142, 76%, 36%)" fontSize="8" fontFamily="JetBrains Mono">O₃</text>
      <text x="280" y="130" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="7" fontFamily="JetBrains Mono" opacity="0.7">
        OZONE
      </text>
      <text x="280" y="140" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="7" fontFamily="JetBrains Mono" opacity="0.7">
        MONITOR
      </text>

      {/* Thermal sensor */}
      <circle cx="120" cy="100" r="15" fill="hsl(215, 25%, 20%)" stroke="hsl(45, 93%, 47%)" strokeWidth="2" />
      <text x="120" y="104" textAnchor="middle" fill="hsl(45, 93%, 47%)" fontSize="10" fontFamily="JetBrains Mono">🌡</text>
      <text x="120" y="130" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="7" fontFamily="JetBrains Mono" opacity="0.7">
        THERMAL
      </text>
      <text x="120" y="140" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="7" fontFamily="JetBrains Mono" opacity="0.7">
        PROTECT
      </text>

      {/* Airflow paths */}
      <path
        d="M 150 200 L 150 190 Q 200 185 250 190 L 250 200"
        fill="none"
        stroke="hsl(186, 100%, 42%)"
        strokeWidth="2"
        strokeOpacity="0.5"
      />
      <text x="200" y="215" textAnchor="middle" fill="hsl(186, 100%, 42%)" fontSize="8" fontFamily="JetBrains Mono">
        AIR INTAKE
      </text>

      {/* Output */}
      <path
        d="M 200 50 L 200 30"
        fill="none"
        stroke="hsl(142, 76%, 36%)"
        strokeWidth="3"
        markerEnd="url(#arrowhead)"
      />
      <text x="200" y="20" textAnchor="middle" fill="hsl(142, 76%, 36%)" fontSize="8" fontFamily="JetBrains Mono">
        TREATED AIR OUT
      </text>

      {/* Auto-shutdown indicator */}
      <rect x="130" y="255" width="140" height="30" rx="4" fill="hsl(0, 72%, 51%)" fillOpacity="0.1" stroke="hsl(0, 72%, 51%)" strokeWidth="1" />
      <text x="200" y="274" textAnchor="middle" fill="hsl(0, 72%, 51%)" fontSize="9" fontFamily="JetBrains Mono">
        AUTO-SHUTDOWN ENABLED
      </text>
    </svg>
  );
}
