import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Panel } from '@/components/ui/Panel';
import { MetricDisplay } from '@/components/ui/MetricDisplay';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { JunctionSchematic } from '@/components/visualizations/JunctionSchematic';
import { Wind, Thermometer, Cloud, Activity } from 'lucide-react';

export default function Index() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Streetlight-Mounted, Cluster-Based Air Exposure Reduction System
            </p>
          </div>
          <StatusBadge status="active" label="CLUSTER ACTIVE" />
        </div>

        {/* Environmental Conditions Bar */}
        <Panel className="bg-card/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Wind:</span>
                <span className="font-mono font-semibold text-foreground">West 7 km/h</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-warning" />
                <span className="text-sm text-muted-foreground">Temp:</span>
                <span className="font-mono font-semibold text-foreground">25°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Humidity:</span>
                <span className="font-mono font-semibold text-foreground">62%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-success animate-pulse" />
              <span className="text-sm text-success font-mono">SIMULATION MODE</span>
            </div>
          </div>
        </Panel>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Junction Schematic - Main View */}
          <div className="col-span-8">
            <Panel 
              title="Traffic Junction - Top-Down View"
              headerContent={
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-muted-foreground">Cluster ID:</span>
                  <span className="font-mono font-bold text-primary">57</span>
                </div>
              }
            >
              <div className="aspect-square max-h-[500px] relative">
                <JunctionSchematic />
                
                {/* Legend Overlay */}
                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Legend</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Air Treatment Module</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-destructive" />
                      <span className="text-muted-foreground">Pollution Emission</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="w-3 h-3 rounded-full bg-warning" />
                      <span className="text-muted-foreground">Exposure Zone</span>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>

          {/* Right Side Metrics */}
          <div className="col-span-4 space-y-6">
            {/* Quick Stats */}
            <Panel title="Cluster Metrics">
              <div className="grid grid-cols-2 gap-4">
                <MetricDisplay label="Active Units" value="4" status="success" />
                <MetricDisplay label="Coverage" value="92" unit="%" status="normal" />
                <MetricDisplay label="Mean PM2.5" value="82" unit="µg/m³" status="warning" />
                <MetricDisplay label="Reduction" value="34" unit="%" status="success" />
              </div>
            </Panel>

            {/* System Status */}
            <Panel title="Unit Status">
              <div className="space-y-3">
                {[
                  { id: 'Unit NW', status: 'active' as const, pm: 78 },
                  { id: 'Unit NE', status: 'active' as const, pm: 85 },
                  { id: 'Unit SW', status: 'warning' as const, pm: 95 },
                  { id: 'Unit SE', status: 'active' as const, pm: 71 },
                ].map(unit => (
                  <div key={unit.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={`status-dot ${unit.status === 'active' ? 'status-active' : 'status-warning'}`} />
                      <span className="text-sm font-mono">{unit.id}</span>
                    </div>
                    <span className={`text-sm font-mono ${unit.status === 'warning' ? 'text-warning' : 'text-muted-foreground'}`}>
                      {unit.pm} µg/m³
                    </span>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Operating Mode */}
            <Panel title="Operating Mode">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Mode</span>
                  <StatusBadge status="warning" label="HIGH" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Fan Duty Cycle</span>
                  <span className="font-mono font-bold text-primary">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">ESP Voltage</span>
                  <span className="font-mono font-bold text-foreground">18.2 kV</span>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        {/* Physics Explanation Footer */}
        <Panel>
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-2">System Operation Principle</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The cluster of streetlight-mounted units operates collectively to reduce street-level air pollution exposure. 
                Each unit features directional intake aligned with traffic flow, electrostatic precipitation for particulate removal, 
                and vertical release of treated air. This creates a localized low-exposure zone at pedestrian height.
              </p>
            </div>
            <div className="w-px h-16 bg-border" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-2">Key Physics Concepts</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <span>• Pollutant dispersion management</span>
                <span>• Directional air intake</span>
                <span>• Electrostatic precipitation</span>
                <span>• Vertical treated air release</span>
                <span>• Cluster-level coordination</span>
                <span>• Wind-adaptive operation</span>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  );
}
