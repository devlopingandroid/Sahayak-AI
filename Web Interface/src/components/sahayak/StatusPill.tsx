import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatusPillProps {
  status: 'online' | 'offline' | 'warning' | 'error';
  label?: string;
  showDot?: boolean;
  className?: string;
}

const statusStyles = {
  online: {
    bg: 'bg-success/20',
    text: 'text-success',
    dot: 'bg-success',
  },
  offline: {
    bg: 'bg-slate/20',
    text: 'text-slate',
    dot: 'bg-slate',
  },
  warning: {
    bg: 'bg-warning/20',
    text: 'text-warning',
    dot: 'bg-warning',
  },
  error: {
    bg: 'bg-error/20',
    text: 'text-error',
    dot: 'bg-error',
  },
};

const defaultLabels = {
  online: 'Online',
  offline: 'Offline',
  warning: 'Warning',
  error: 'Error',
};

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  label,
  showDot = true,
  className,
}) => {
  const styles = statusStyles[status];
  const displayLabel = label ?? defaultLabels[status];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full',
        'text-sm font-medium',
        styles.bg,
        styles.text,
        className
      )}
      role="status"
      aria-label={displayLabel}
    >
      {showDot && (
        <motion.span
          className={cn('w-2 h-2 rounded-full', styles.dot)}
          animate={status === 'online' ? { scale: [1, 1.2, 1] } : undefined}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        />
      )}
      <span>{displayLabel}</span>
    </div>
  );
};

// Battery indicator
interface BatteryIndicatorProps {
  percentage: number;
  className?: string;
}

export const BatteryIndicator: React.FC<BatteryIndicatorProps> = ({
  percentage,
  className,
}) => {
  const getColor = () => {
    if (percentage > 50) return 'text-success';
    if (percentage > 20) return 'text-warning';
    return 'text-error';
  };

  return (
    <div
      className={cn('flex items-center gap-1.5', getColor(), className)}
      role="status"
      aria-label={`Battery at ${percentage}%`}
    >
      <svg 
        className="w-6 h-6" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        aria-hidden="true"
      >
        <rect x="2" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="4" y="8" width={`${(percentage / 100) * 14}`} height="8" rx="1" />
        <rect x="20" y="9" width="2" height="6" rx="0.5" />
      </svg>
      <span className="text-sm font-mono font-medium">{percentage}%</span>
    </div>
  );
};

export default StatusPill;
