import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon, IconName } from './Icon';

interface ToastProps {
  isVisible: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onDismiss?: () => void;
  duration?: number;
}

const toastStyles = {
  success: {
    bg: 'bg-success/95',
    text: 'text-success-foreground',
    icon: 'check' as IconName,
  },
  error: {
    bg: 'bg-error/95',
    text: 'text-error-foreground',
    icon: 'alert' as IconName,
  },
  warning: {
    bg: 'bg-warning/95',
    text: 'text-warning-foreground',
    icon: 'alert' as IconName,
  },
  info: {
    bg: 'bg-primary/95',
    text: 'text-primary-foreground',
    icon: 'brain' as IconName,
  },
};

export const Toast: React.FC<ToastProps> = ({
  isVisible,
  message,
  type = 'info',
  onDismiss,
  duration = 4000,
}) => {
  const styles = toastStyles[type];

  React.useEffect(() => {
    if (isVisible && onDismiss && duration > 0) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss, duration]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className={cn(
            'fixed top-20 left-4 right-4 z-[110] mx-auto max-w-md',
            'rounded-card p-4 shadow-elevated backdrop-blur-sm',
            'flex items-center gap-3',
            styles.bg,
            styles.text
          )}
          role="alert"
          aria-live="polite"
        >
          <Icon name={styles.icon} size="lg" />
          <p className="flex-1 font-medium">{message}</p>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Dismiss"
            >
              <Icon name="close" size="sm" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for managing toast state
export const useToast = () => {
  const [toast, setToast] = React.useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    isVisible: false,
    message: '',
    type: 'info',
  });

  const showToast = React.useCallback((
    message: string, 
    type: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) => {
    setToast({ isVisible: true, message, type });
  }, []);

  const hideToast = React.useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast,
    ToastComponent: (
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onDismiss={hideToast}
      />
    ),
  };
};

export default Toast;
