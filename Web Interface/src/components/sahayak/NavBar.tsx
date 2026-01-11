import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon, IconName } from './Icon';

interface NavItem {
  path: string;
  icon: IconName;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/timeline', icon: 'clock', label: 'Timeline' },
  { path: '/faces', icon: 'users', label: 'Faces' },
  { path: '/hud', icon: 'eye', label: 'Neural' },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-white/90 backdrop-blur-md border-t border-border',
        'safe-bottom'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around h-20 max-w-lg mx-auto px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1',
                'w-16 h-16 rounded-2xl transition-colors',
                'touch-target',
                isActive ? 'text-primary' : 'text-slate hover:text-charcoal'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-2xl"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon name={item.icon} size="lg" className="relative z-10" />
              <span className="text-xs font-medium relative z-10">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

// Top header bar
interface TopBarProps {
  title?: string;
  showBack?: boolean;
  rightContent?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({
  title,
  showBack = false,
  rightContent,
}) => {
  const navigate = useNavigate();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-primary/90 backdrop-blur-md',
        'safe-top'
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {showBack ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center text-primary-foreground"
              aria-label="Go back"
            >
              <Icon name="back" size="lg" />
            </motion.button>
          ) : (
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center"
              >
                <Icon name="brain" size="sm" className="text-primary-foreground" />
              </motion.div>
              <span className="text-xl font-heading font-bold text-primary-foreground">
                {title || 'Sahayak'}
              </span>
            </div>
          )}
        </div>
        
        {rightContent && (
          <div className="flex items-center gap-3">
            {rightContent}
          </div>
        )}
      </div>
    </header>
  );
};

export default BottomNav;
