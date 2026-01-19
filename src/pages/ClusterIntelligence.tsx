import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Panel } from '@/components/ui/Panel';
import { MetricDisplay } from '@/components/ui/MetricDisplay';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { NetworkDiagram } from '@/components/visualizations/NetworkDiagram';
import { VarianceChart } from '@/components/charts/VarianceChart';
import { Brain, GitBranch, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ClusterIntelligence() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cluster Intelligence & Control</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Aggregate decision-making and multi-node coordination
            </p>
          </div>
          <StatusBadge status="active" label="CLUSTER MODE" />
        </div>

        {/* Key Insight Banner */}
        <Panel className="bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Cluster-Level Decision Making</h3>
              <p className="text-xs text-muted-foreground mt-1">
                No single sensor controls the system. Decisions are made by aggregating data across all nodes 
                to ensure robust and reliable operation even when individual sensors experience variance.
              </p>
            </div>
          </div>
        </Panel>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Network Diagram */}
          <div className="col-span-7">
            <Panel 
              title="Cluster Network Topology"
              headerContent={
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">8 nodes connected</span>
                </div>
              }
            >
              <div className="aspect-[4/3] relative">
                <NetworkDiagram />
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Node Status</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-success" />
                      <span className="text-muted-foreground">Active & Reporting</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-warning" />
                      <span className="text-muted-foreground">Elevated Reading</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-muted-foreground" />
                      <span className="text-muted-foreground">Idle / Low Activity</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">Aggregation Logic:</strong> Node values are weighted by 
                  confidence scores and spatial proximity. Outliers are automatically rejected using 
                  statistical methods to prevent false triggers.
                </p>
              </div>
            </Panel>
          </div>

          {/* Right Side Panels */}
          <div className="col-span-5 space-y-6">
            {/* Cluster Statistics */}
            <Panel title="Cluster Statistics">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Cluster ID</span>
                  <span className="font-mono font-bold text-primary text-lg">57</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Mean PM2.5</span>
                  <span className="font-mono font-bold text-warning">82 µg/m³</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">Confidence in Data</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="font-mono font-bold text-success">HIGH</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">Outlier Rejection</span>
                  <span className="font-mono text-primary">AUTO</span>
                </div>
              </div>
            </Panel>

            {/* Variance Analysis */}
            <Panel title="Variance Across Nodes">
              <VarianceChart />
              <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Node N3 showing elevated variance. Weighted lower in cluster decision.
                </p>
              </div>
            </Panel>

            {/* Control State */}
            <Panel title="Control State Machine">
              <div className="space-y-3">
                {[
                  { state: 'SAFE', condition: 'PM2.5 < 50', active: false },
                  { state: 'NORMAL', condition: '50 ≤ PM2.5 < 75', active: false },
                  { state: 'ACTIVE', condition: '75 ≤ PM2.5 < 100', active: true },
                  { state: 'HIGH', condition: 'PM2.5 ≥ 100', active: false },
                ].map(item => (
                  <div 
                    key={item.state}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      item.active 
                        ? 'bg-primary/10 border-primary' 
                        : 'bg-secondary/30 border-border/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${item.active ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
                      <span className={`font-mono font-semibold ${item.active ? 'text-primary' : 'text-muted-foreground'}`}>
                        {item.state}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{item.condition}</span>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Aggregation Arrows Visual */}
            <Panel title="Data Aggregation Flow">
              <svg viewBox="0 0 200 100" className="w-full h-24">
                <defs>
                  <marker id="aggArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M 0 0 L 6 3 L 0 6 Z" fill="hsl(186, 100%, 42%)" />
                  </marker>
                </defs>
                
                {/* Node circles */}
                {[30, 60, 90, 120, 150].map((x, i) => (
                  <g key={i}>
                    <circle cx={x} cy="20" r="8" fill="hsl(215, 25%, 20%)" stroke="hsl(186, 100%, 42%)" strokeWidth="1" />
                    <text x={x} y="24" textAnchor="middle" fill="hsl(186, 100%, 42%)" fontSize="6" fontFamily="JetBrains Mono">
                      N{i + 1}
                    </text>
                    <line 
                      x1={x} y1="30" x2="100" y2="70" 
                      stroke="hsl(186, 100%, 42%)" 
                      strokeWidth="1" 
                      strokeOpacity="0.5"
                      markerEnd="url(#aggArrow)"
                    />
                  </g>
                ))}
                
                {/* Central aggregation */}
                <circle cx="100" cy="80" r="15" fill="hsl(186, 100%, 20%)" stroke="hsl(186, 100%, 42%)" strokeWidth="2" />
                <text x="100" y="84" textAnchor="middle" fill="hsl(186, 100%, 42%)" fontSize="7" fontFamily="JetBrains Mono">
                  AGG
                </text>
              </svg>
              <p className="text-xs text-muted-foreground text-center">
                Multi-node data flows to cluster aggregation layer
              </p>
            </Panel>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
