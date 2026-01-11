import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icon } from './Icon';
import { useSpeech } from '@/hooks/useSpeech';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Ask Sahayak... (e.g., Where are my keys?)",
  value,
  onChange,
  onSearch,
  className,
  autoFocus = false,
}) => {
  const [localValue, setLocalValue] = useState(value ?? '');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { isListening, toggleListening, transcript } = useSpeech({
    onTranscript: (text) => {
      const newValue = text;
      setLocalValue(newValue);
      onChange?.(newValue);
      onSearch?.(newValue);
    },
  });

  // Sync external value
  React.useEffect(() => {
    if (value !== undefined && value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  // Update transcript
  React.useEffect(() => {
    if (transcript && transcript !== localValue) {
      setLocalValue(transcript);
      onChange?.(transcript);
    }
  }, [transcript]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(localValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange?.('');
    inputRef.current?.focus();
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn('search-hero', className)}
      role="search"
    >
      <Icon name="search" size="lg" className="text-slate flex-shrink-0" />
      
      <input
        ref={inputRef}
        type="search"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="flex-1 min-w-0"
        aria-label="Search memories"
      />
      
      <AnimatePresence>
        {localValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={handleClear}
            className="w-8 h-8 flex items-center justify-center text-slate hover:text-charcoal transition-colors"
            aria-label="Clear search"
          >
            <Icon name="close" size="sm" />
          </motion.button>
        )}
      </AnimatePresence>
      
      <motion.button
        type="button"
        onClick={toggleListening}
        whileTap={{ scale: 0.9 }}
        className={cn(
          'w-12 h-12 flex items-center justify-center rounded-full transition-all ml-2',
          isListening 
            ? 'bg-accent text-accent-foreground animate-pulse-gentle' 
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        )}
        aria-label={isListening ? 'Stop listening' : 'Start voice search'}
        aria-pressed={isListening}
      >
        <Icon name={isListening ? 'mic' : 'mic'} size="lg" />
      </motion.button>
    </form>
  );
};

export default SearchBar;
