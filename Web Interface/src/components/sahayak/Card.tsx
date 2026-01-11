import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SahayakCardProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'soft' | 'flat' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: React.ReactNode;
}

const variants = {
  glass: 'bg-white/80 backdrop-blur-sm shadow-glass',
  soft: 'bg-card shadow-soft',
  flat: 'bg-card',
  outline: 'bg-transparent border-2 border-border',
};

const paddings = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const SahayakCard = React.forwardRef<HTMLDivElement, SahayakCardProps>(
  ({ 
    variant = 'soft', 
    padding = 'md',
    interactive = false,
    children, 
    className, 
    ...props 
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={interactive ? { scale: 1.02, y: -2 } : undefined}
        whileTap={interactive ? { scale: 0.98 } : undefined}
        className={cn(
          'rounded-card',
          variants[variant],
          paddings[padding],
          interactive && 'cursor-pointer transition-shadow hover:shadow-elevated',
          className
        )}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

SahayakCard.displayName = 'SahayakCard';

// Quick Action Card - for dashboard grid items
interface QuickActionCardProps extends Omit<SahayakCardProps, 'children'> {
  icon: React.ReactNode;
  label: string;
  bgColor?: string;
  onClick?: () => void;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  label,
  bgColor,
  onClick,
  className,
  ...props
}) => {
  return (
    <SahayakCard
      variant="soft"
      padding="md"
      interactive
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center gap-3 min-h-[120px] touch-target',
        bgColor,
        className
      )}
      {...props}
    >
      <div className="text-3xl" aria-hidden="true">
        {icon}
      </div>
      <span className="font-heading font-semibold text-center text-charcoal">
        {label}
      </span>
    </SahayakCard>
  );
};

// Hero Card - for main dashboard content
interface HeroCardProps extends SahayakCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  backgroundElement?: React.ReactNode;
}

export const HeroCard: React.FC<HeroCardProps> = ({
  title,
  subtitle,
  action,
  backgroundElement,
  children,
  className,
  ...props
}) => {
  return (
    <SahayakCard
      variant="glass"
      padding="lg"
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      {backgroundElement && (
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          {backgroundElement}
        </div>
      )}
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-charcoal mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate text-lg">{subtitle}</p>
        )}
        {children}
        {action && (
          <div className="mt-6">
            {action}
          </div>
        )}
      </div>
    </SahayakCard>
  );
};

export default SahayakCard;
