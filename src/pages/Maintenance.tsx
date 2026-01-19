import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Panel } from '@/components/ui/Panel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MaintenanceChart } from '@/components/charts/MaintenanceChart';
import { Wrench, AlertTriangle, Calendar, TrendingUp, CheckCircle } from 'lucide-react';

export default function Maintenance() {
  const maintenanceItems = [
    { component: 'Pre-Filter', health: 82, nextService: '14 days', status: 'good' as const },
    { component: 'HEPA Filter', health: 63, nextService: '7 days', status: 'warning' as const },
    { component: 'ESP Plates', health: 78, nextService: '21 days', status: 'good' as const },
    { component: 'Fan Assembly', health: 91, nextService: '45 days', status: 'good' as const },
    { component: 'Ozone Sensor', health: 95, nextService: '60 days', status: 'good' as const },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in-up">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Maintenance & Degradation Monitoring</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Predictive maintenance alerts and component health tracking
            </p>
          </div>
          <StatusBadge status="warning" label="1 ALERT PENDING" />
        </div>

        {/* Maintenance Philosophy Banner */}
        <Panel className="bg-primary/5 border-primary/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Maintenance-by-Design Philosophy</h3>
              <p className="text-xs text-muted-foreground mt-1">
                The system continuously monitors component degradation to prevent silent performance loss. 
                Predictive alerts ensure maintenance is scheduled before efficiency drops below acceptable thresholds.
              </p>
            </div>
          </div>
        </Panel>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Degradation Charts */}
          <div className="col-span-8">
            <div className="grid grid-cols-2 gap-6">
              {/* Filter Pressure */}
              <Panel title="Filter Clogging Trend">
                <MaintenanceChart type="pressure" />
                <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <span className="text-xs text-warning font-medium">
                      Approaching maintenance threshold
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Filter replacement recommended within 7 days
                  </p>
                </div>
              </Panel>

              {/* ESP Dust */}
              <Panel title="ESP Dust Accumulation">
                <MaintenanceChart type="dust" />
                <div className="mt-4 p-3 bg-secondary/30 border border-border rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Normal accumulation rate
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Next cleaning: estimated 21 days
                  </p>
                </div>
              </Panel>
            </div>

            {/* Predictive Maintenance Schedule */}
            <Panel title="Predictive Maintenance Schedule" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Component
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Health
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Next Service
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceItems.map((item, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="py-3 px-4 text-sm text-foreground font-medium">
                          {item.component}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  item.health > 80 ? 'bg-success' : 
                                  item.health > 60 ? 'bg-warning' : 'bg-destructive'
                                }`}
                                style={{ width: `${item.health}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">
                              {item.health}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-mono text-foreground">
                              {item.nextService}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {item.status === 'good' ? (
                            <span className="inline-flex items-center gap-1 text-xs text-success">
                              <CheckCircle className="w-3 h-3" /> Good
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-warning">
                              <AlertTriangle className="w-3 h-3" /> Attention
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>

          {/* Right Side */}
          <div className="col-span-4 space-y-6">
            {/* Active Alerts */}
            <Panel title="Active Alerts">
              <div className="space-y-3">
                <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warning">HEPA Filter Degradation</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Efficiency dropped to 63%. Schedule replacement within 7 days.
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-2 font-mono">
                        Alert generated: 2 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>

            {/* System Uptime */}
            <Panel title="System Uptime">
              <div className="text-center py-4">
                <p className="text-4xl font-mono font-bold text-primary">99.7%</p>
                <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 bg-secondary/30 rounded-lg">
                  <p className="text-lg font-mono font-bold text-foreground">720</p>
                  <p className="text-[10px] text-muted-foreground">Hours Run</p>
                </div>
                <div className="text-center p-2 bg-secondary/30 rounded-lg">
                  <p className="text-lg font-mono font-bold text-foreground">2</p>
                  <p className="text-[10px] text-muted-foreground">Incidents</p>
                </div>
                <div className="text-center p-2 bg-secondary/30 rounded-lg">
                  <p className="text-lg font-mono font-bold text-foreground">0</p>
                  <p className="text-[10px] text-muted-foreground">Failures</p>
                </div>
              </div>
            </Panel>

            {/* Maintenance Log */}
            <Panel title="Recent Maintenance Log">
              <div className="space-y-3">
                {[
                  { date: 'Jan 12', action: 'Pre-filter replaced', tech: 'System' },
                  { date: 'Jan 05', action: 'ESP plates cleaned', tech: 'System' },
                  { date: 'Dec 28', action: 'Sensor calibration', tech: 'Auto' },
                  { date: 'Dec 20', action: 'Fan bearing lubed', tech: 'System' },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                    <span className="text-xs font-mono text-muted-foreground w-14">{log.date}</span>
                    <span className="text-sm text-foreground flex-1">{log.action}</span>
                    <span className="text-[10px] text-muted-foreground">{log.tech}</span>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Performance Note */}
            <Panel className="bg-secondary/30">
              <div className="flex items-start gap-3">
                <Wrench className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">No Silent Performance Loss</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    System continuously monitors efficiency metrics. Users are alerted before 
                    performance degrades noticeably.
                  </p>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
