import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon, IconName } from './Icon';
import { vibrate } from '@/utils/speech';

interface FABProps {
  icon: IconName;
  variant?: 'primary' | 'accent';
  pulse?: boolean;
  onClick?: () => void;
  label: string;
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
  className?: string;
}

const positions = {
  'bottom-right': 'right-6',
  'bottom-center': 'left-1/2 -translate-x-1/2',
  'bottom-left': 'left-6',
};

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-dark',
  accent: 'bg-accent text-accent-foreground hover:bg-accent-dark',
};

export const FAB: React.FC<FABProps> = ({
  icon,
  variant = 'accent',
  pulse = false,
  onClick,
  label,
  position = 'bottom-right',
  className,
}) => {
  const handleClick = () => {
    vibrate(50);
    onClick?.();
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={cn(
        'fixed bottom-28 z-40',
        'w-16 h-16 rounded-full',
        'flex items-center justify-center',
        'shadow-soft transition-colors',
        variants[variant],
        positions[position],
        pulse && 'animate-pulse-gentle',
        className
      )}
      aria-label={label}
    >
      <Icon name={icon} size="lg" />
    </motion.button>
  );
};

export default FAB;
