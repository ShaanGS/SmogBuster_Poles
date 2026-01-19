import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'active' | 'warning' | 'critical' | 'idle' | 'normal' | 'safe';
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const statusConfig = {
    active: { bg: 'bg-success/20', text: 'text-success', border: 'border-success/50' },
    safe: { bg: 'bg-success/20', text: 'text-success', border: 'border-success/50' },
    normal: { bg: 'bg-primary/20', text: 'text-primary', border: 'border-primary/50' },
    warning: { bg: 'bg-warning/20', text: 'text-warning', border: 'border-warning/50' },
    critical: { bg: 'bg-destructive/20', text: 'text-destructive', border: 'border-destructive/50' },
    idle: { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-muted-foreground/50' },
  };

  const config = statusConfig[status];

  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs font-semibold uppercase',
      config.bg,
      config.text,
      config.border,
      className
    )}>
      <span className={cn('w-2 h-2 rounded-full animate-pulse', {
        'bg-success': status === 'active' || status === 'safe',
        'bg-primary': status === 'normal',
        'bg-warning': status === 'warning',
        'bg-destructive': status === 'critical',
        'bg-muted-foreground': status === 'idle',
      })} />
      {label || status}
    </div>
  );
}
