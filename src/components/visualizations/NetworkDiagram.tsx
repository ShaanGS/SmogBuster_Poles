import { ClusterNode } from './ClusterNode';

interface NodeData {
  id: string;
  x: number;
  y: number;
  status: 'active' | 'warning' | 'idle';
  pmValue: number;
}

export function NetworkDiagram() {
  const nodes: NodeData[] = [
    { id: 'N1', x: 100, y: 80, status: 'active', pmValue: 78 },
    { id: 'N2', x: 200, y: 50, status: 'active', pmValue: 82 },
    { id: 'N3', x: 300, y: 80, status: 'warning', pmValue: 95 },
    { id: 'N4', x: 80, y: 180, status: 'active', pmValue: 71 },
    { id: 'N5', x: 200, y: 160, status: 'active', pmValue: 85 },
    { id: 'N6', x: 320, y: 180, status: 'active', pmValue: 76 },
    { id: 'N7', x: 150, y: 260, status: 'idle', pmValue: 45 },
    { id: 'N8', x: 250, y: 260, status: 'active', pmValue: 88 },
  ];

  const connections = [
    ['N1', 'N2'], ['N2', 'N3'], ['N1', 'N4'], ['N2', 'N5'],
    ['N3', 'N6'], ['N4', 'N5'], ['N5', 'N6'], ['N4', 'N7'],
    ['N5', 'N7'], ['N5', 'N8'], ['N6', 'N8'], ['N7', 'N8'],
  ];

  const getNodeById = (id: string) => nodes.find(n => n.id === id);

  return (
    <svg viewBox="0 0 400 320" className="w-full h-full">
      <defs>
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(186, 100%, 42%)" stopOpacity="0.1" />
          <stop offset="50%" stopColor="hsl(186, 100%, 42%)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(186, 100%, 42%)" stopOpacity="0.1" />
        </linearGradient>

        <marker
          id="dataFlow"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <circle r="2" cx="3" cy="3" fill="hsl(186, 100%, 42%)" opacity="0.6" />
        </marker>
      </defs>

      {/* Connections */}
      {connections.map(([from, to], i) => {
        const fromNode = getNodeById(from);
        const toNode = getNodeById(to);
        if (!fromNode || !toNode) return null;

        return (
          <g key={i}>
            <line
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="hsl(186, 100%, 42%)"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
            {/* Data flow animation */}
            <line
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="hsl(186, 100%, 42%)"
              strokeWidth="2"
              strokeDasharray="4 8"
              strokeOpacity="0.5"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="12"
                to="0"
                dur={`${1 + i * 0.1}s`}
                repeatCount="indefinite"
              />
            </line>
          </g>
        );
      })}

      {/* Central aggregation indicator */}
      <circle
        cx="200"
        cy="160"
        r="50"
        fill="none"
        stroke="hsl(186, 100%, 42%)"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeDasharray="4 4"
      >
        <animate
          attributeName="r"
          values="45;55;45"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Nodes */}
      {nodes.map(node => (
        <ClusterNode
          key={node.id}
          {...node}
        />
      ))}

      {/* Aggregation label */}
      <text
        x="200"
        y="160"
        textAnchor="middle"
        fill="hsl(186, 100%, 42%)"
        fontSize="8"
        fontFamily="JetBrains Mono"
        opacity="0.7"
      >
        CLUSTER
      </text>
      <text
        x="200"
        y="172"
        textAnchor="middle"
        fill="hsl(186, 100%, 42%)"
        fontSize="8"
        fontFamily="JetBrains Mono"
        opacity="0.7"
      >
        AGGREGATION
      </text>
    </svg>
  );
}
