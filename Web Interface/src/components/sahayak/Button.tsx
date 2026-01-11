import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SahayakButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost' | 'emergency';
  size?: 'default' | 'lg' | 'xl' | 'fab';
  icon?: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-dark',
  accent: 'bg-accent text-accent-foreground hover:bg-accent-dark',
  outline: 'border-2 border-primary text-primary hover:bg-primary/10',
  ghost: 'text-charcoal hover:bg-secondary',
  emergency: 'border-2 border-error text-error bg-white hover:bg-error/10',
};

const sizes = {
  default: 'h-14 px-6 text-base',
  lg: 'h-16 px-8 text-lg',
  xl: 'h-20 px-10 text-xl',
  fab: 'w-16 h-16 p-0',
};

export const SahayakButton = React.forwardRef<HTMLButtonElement, SahayakButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'default', 
    icon, 
    children, 
    isLoading,
    fullWidth,
    className, 
    disabled,
    ...props 
  }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 0.98 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        className={cn(
          'inline-flex items-center justify-center gap-3',
          'rounded-button font-heading font-semibold',
          'shadow-soft transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <motion.div
            className="w-6 h-6 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            aria-label="Loading"
          />
        ) : (
          <>
            {icon && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
            {children && <span>{children}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

SahayakButton.displayName = 'SahayakButton';

export default SahayakButton;
