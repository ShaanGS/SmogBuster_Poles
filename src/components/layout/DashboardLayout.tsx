import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Activity, 
  Users, 
  Brain, 
  Shield, 
  Wrench,
  Zap
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'System Overview', href: '/', icon: LayoutGrid },
  { name: 'Cluster Physics', href: '/cluster-physics', icon: Activity },
  { name: 'Human Exposure', href: '/human-exposure', icon: Users },
  { name: 'Cluster Intelligence', href: '/cluster-intelligence', icon: Brain },
  { name: 'Safety & Reliability', href: '/safety', icon: Shield },
  { name: 'Maintenance', href: '/maintenance', icon: Wrench },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">SLEIS</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Street-Level Exposure Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* System Status Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">System Status</span>
            <div className="flex items-center gap-2">
              <span className="status-dot status-active" />
              <span className="text-success font-mono">ONLINE</span>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground font-mono">
            Last sync: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Visualization based on sensor aggregation and predictive modeling
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Cluster Status:</span>
              <span className="font-mono font-bold text-success glow-text-success">ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Mode:</span>
              <span className="font-mono font-bold text-warning glow-text-warning">HIGH</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Fan Duty:</span>
              <span className="font-mono font-bold text-primary">855</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 grid-pattern">
          {children}
        </div>
      </main>
    </div>
  );
}
