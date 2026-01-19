import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Panel } from '@/components/ui/Panel';
import { MetricDisplay } from '@/components/ui/MetricDisplay';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AirflowArrows } from '@/components/visualizations/AirflowArrows';
import { HeatmapOverlay } from '@/components/visualizations/HeatmapOverlay';
import { ClusterNode } from '@/components/visualizations/ClusterNode';
import { VarianceChart } from '@/components/charts/VarianceChart';
import { Wind, ArrowRight, Gauge } from 'lucide-react';

export default function ClusterPhysics() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes = [
    { id: 'N1', x: 80, y: 60, status: 'active' as const, pmValue: 78 },
    { id: 'N2', x: 200, y: 40, status: 'active' as const, pmValue: 82 },
    { id: 'N3', x: 320, y: 60, status: 'warning' as const, pmValue: 95 },
    { id: 'N4', x: 60, y: 150, status: 'active' as const, pmValue: 71 },
    { id: 'N5', x: 200, y: 140, status: 'active' as const, pmValue: 85 },
    { id: 'N6', x: 340, y: 150, status: 'active' as const, pmValue: 76 },
    { id: 'N7', x: 120, y: 240, status: 'idle' as const, pmValue: 45 },
    { id: 'N8', x: 280, y: 240, status: 'active' as const, pmValue: 88 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cluster Physics Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time airflow, dispersion, and pollution concentration visualization
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm bg-secondary/50 px-3 py-1.5 rounded-full">
              <Wind className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">West</span>
              <span className="font-mono font-bold text-foreground">7 km/h</span>
            </div>
            <StatusBadge status="active" label="LIVE SIMULATION" />
          </div>
        </div>

        {/* Main Visualization Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Main Cluster Map with Heatmap */}
          <div className="col-span-8">
            <Panel 
              title="Cluster Pollution Map"
              headerContent={
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-muted-foreground">8 nodes active</span>
                  </span>
                </div>
              }
            >
              <div className="relative aspect-[4/3] bg-background/50 rounded-lg overflow-hidden">
                {/* Grid background */}
                <div className="absolute inset-0 grid-pattern opacity-30" />
                
                {/* Heatmap layer */}
                <div className="absolute inset-0">
                  <HeatmapOverlay className="w-full h-full" animate />
                </div>

                {/* Airflow arrows layer */}
                <div className="absolute inset-0">
                  <AirflowArrows className="w-full h-full" />
                </div>

                {/* Cluster nodes */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                  {nodes.map(node => (
                    <ClusterNode
                      key={node.id}
                      {...node}
                      isSelected={selectedNode === node.id}
                      onClick={() => setSelectedNode(node.id)}
                    />
                  ))}

                  {/* Wind direction indicator */}
                  <g transform="translate(350, 30)">
                    <circle r="20" fill="hsl(215, 25%, 15%)" stroke="hsl(215, 25%, 25%)" strokeWidth="1" />
                    <path d="M -8 0 L 8 0 M 4 -4 L 8 0 L 4 4" stroke="hsl(186, 100%, 42%)" strokeWidth="2" fill="none" />
                    <text y="35" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8" fontFamily="JetBrains Mono">
                      WIND
                    </text>
                  </g>
                </svg>

                {/* Caption */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-xs text-muted-foreground font-mono">
                    Cluster-level airflow and exposure visualization
                  </p>
                </div>
              </div>

              {/* Physics concept labels */}
              <div className="mt-4 grid grid-cols-4 gap-4">
                {[
                  { label: 'Dispersion', icon: '↗', color: 'text-primary' },
                  { label: 'Turbulence', icon: '〰', color: 'text-warning' },
                  { label: 'Directional Intake', icon: '→', color: 'text-success' },
                  { label: 'Vertical Release', icon: '↑', color: 'text-primary' },
                ].map(concept => (
                  <div key={concept.label} className="flex items-center gap-2 bg-secondary/30 px-3 py-2 rounded-lg">
                    <span className={`text-lg ${concept.color}`}>{concept.icon}</span>
                    <span className="text-xs text-muted-foreground">{concept.label}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* Right Side Panels */}
          <div className="col-span-4 space-y-6">
            {/* Traffic Flow Indicator */}
            <Panel title="Traffic Flow Direction">
              <div className="flex items-center justify-center gap-4 py-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">Primary</span>
                </div>
                <div className="h-px w-16 bg-gradient-to-r from-primary to-transparent" />
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  </div>
                  <span className="text-xs text-muted-foreground">Secondary</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Intake orientation adapts to dominant traffic direction
              </p>
            </Panel>

            {/* Concentration Metrics */}
            <Panel title="Concentration Levels">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cluster Mean PM2.5</span>
                  <span className="font-mono font-bold text-warning text-lg">82 µg/m³</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Peak Concentration</span>
                  <span className="font-mono font-bold text-destructive">95 µg/m³</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Background Level</span>
                  <span className="font-mono font-bold text-success">45 µg/m³</span>
                </div>
                
                {/* Gradient legend */}
                <div className="mt-4">
                  <div className="h-3 rounded-full heatmap-gradient" />
                  <div className="flex justify-between mt-1 text-[10px] text-muted-foreground font-mono">
                    <span>LOW</span>
                    <span>MODERATE</span>
                    <span>HIGH</span>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Node Variance */}
            <Panel title="Node Variance Analysis">
              <VarianceChart />
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Variance coefficient:</span>
                <span className="font-mono text-primary">σ = 14.2</span>
              </div>
            </Panel>

            {/* Physics Summary */}
            <Panel title="Active Physics Models">
              <div className="space-y-2">
                {[
                  { name: 'Gaussian Dispersion', active: true },
                  { name: 'Wind Vector Field', active: true },
                  { name: 'Turbulence Model', active: true },
                  { name: 'Deposition Rate', active: false },
                ].map(model => (
                  <div key={model.name} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
                    <span className="text-sm text-muted-foreground">{model.name}</span>
                    <span className={`text-xs font-mono ${model.active ? 'text-success' : 'text-muted-foreground'}`}>
                      {model.active ? 'ENABLED' : 'DISABLED'}
                    </span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
