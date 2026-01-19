import { cn } from '@/lib/utils';

interface MetricDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'critical' | 'success';
  className?: string;
}

export function MetricDisplay({ 
  label, 
  value, 
  unit, 
  status = 'normal',
  className 
}: MetricDisplayProps) {
  const statusColors = {
    normal: 'text-primary glow-text-primary',
    warning: 'text-warning glow-text-warning',
    critical: 'text-destructive glow-text-danger',
    success: 'text-success glow-text-success',
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <span className="metric-label">{label}</span>
      <div className="flex items-baseline">
        <span className={cn('metric-value', statusColors[status])}>
          {value}
        </span>
        {unit && <span className="metric-unit">{unit}</span>}
      </div>
    </div>
  );
}
