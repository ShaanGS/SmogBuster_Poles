import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Panel } from '@/components/ui/Panel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SafetyDiagram } from '@/components/visualizations/SafetyDiagram';
import { Shield, Zap, Thermometer, Wind, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Safety() {
  const safetyChecks = [
    { name: 'ESP Chamber Sealed', status: 'pass', icon: Zap },
    { name: 'Ozone Level Normal', status: 'pass', icon: Wind, value: '0.026 ppm' },
    { name: 'Thermal Protection Active', status: 'pass', icon: Thermometer, value: '42°C' },
    { name: 'Fire Retardant Enclosure', status: 'pass', icon: Shield },
    { name: 'Ground Fault Protection', status: 'pass', icon: Zap },
    { name: 'Auto-Shutdown Ready', status: 'pass', icon: AlertTriangle },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Safety & Reliability</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Comprehensive safety systems and fail-safe mechanisms
            </p>
          </div>
          <StatusBadge status="safe" label="ALL SYSTEMS SAFE" />
        </div>

        {/* Safety Status Banner */}
        <Panel className="bg-success/5 border-success/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">System Safety Status: NOMINAL</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  All safety interlocks engaged. No anomalies detected.
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Last Safety Check</p>
              <p className="font-mono text-sm text-foreground">2 seconds ago</p>
            </div>
          </div>
        </Panel>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Safety Diagram */}
          <div className="col-span-7">
            <Panel title="Cross-Section Safety Diagram">
              <div className="aspect-[4/3]">
                <SafetyDiagram />
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-center">
                  <Zap className="w-5 h-5 text-destructive mx-auto mb-1" />
                  <p className="text-xs font-mono text-destructive">HIGH VOLTAGE</p>
                  <p className="text-[10px] text-muted-foreground">Enclosed Chamber</p>
                </div>
                <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg text-center">
                  <Thermometer className="w-5 h-5 text-warning mx-auto mb-1" />
                  <p className="text-xs font-mono text-warning">THERMAL</p>
                  <p className="text-[10px] text-muted-foreground">Auto-Cutoff at 65°C</p>
                </div>
                <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg text-center">
                  <Wind className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs font-mono text-primary">OZONE</p>
                  <p className="text-[10px] text-muted-foreground">Limit: 0.05 ppm</p>
                </div>
              </div>
            </Panel>
          </div>

          {/* Right Side */}
          <div className="col-span-5 space-y-6">
            {/* Safety Checklist */}
            <Panel title="Safety Checklist">
              <div className="space-y-3">
                {safetyChecks.map((check, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <check.icon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{check.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {check.value && (
                        <span className="text-xs font-mono text-muted-foreground">{check.value}</span>
                      )}
                      <CheckCircle className="w-4 h-4 text-success" />
                    </div>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Operating Parameters */}
            <Panel title="Operating Parameters">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">ESP Voltage</span>
                    <span className="font-mono text-foreground">18.2 kV</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-primary rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>0 kV</span>
                    <span>Max: 25 kV</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Chamber Temperature</span>
                    <span className="font-mono text-foreground">42°C</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[55%] bg-warning rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>20°C</span>
                    <span>Cutoff: 65°C</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Ozone Level</span>
                    <span className="font-mono text-success">0.026 ppm</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[52%] bg-success rounded-full" />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>0 ppm</span>
                    <span>Limit: 0.05 ppm</span>
                  </div>
                </div>
              </div>
            </Panel>

            {/* Fail-Safe Triggers */}
            <Panel title="Fail-Safe Triggers">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  <span>ESP auto-shutdown if ozone exceeds 0.05 ppm</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  <span>Thermal cutoff at chamber temp &gt; 65°C</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  <span>Ground fault interruption within 10ms</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                  <span>Fire detection triggers immediate power cut</span>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
