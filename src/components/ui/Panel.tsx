import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerContent?: ReactNode;
}

export function Panel({ title, children, className, headerContent }: PanelProps) {
  return (
    <div className={cn('panel', className)}>
      {(title || headerContent) && (
        <div className="panel-header">
          {title && <h3 className="panel-title">{title}</h3>}
          {headerContent}
        </div>
      )}
      <div className="panel-body">
        {children}
      </div>
    </div>
  );
}
