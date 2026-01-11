import { useState, useCallback, useEffect, useRef } from 'react';
import { speak, stopSpeaking, initRecognition, vibrate } from '@/utils/speech';

interface UseSpeechOptions {
  onTranscript?: (text: string) => void;
  speakOnMount?: string;
}

// Generic type for speech recognition instance
interface SpeechRecognitionLike {
  start: () => void;
  stop: () => void;
}

export const useSpeech = (options?: UseSpeechOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  // Speak text
  const sayText = useCallback((text: string) => {
    setIsSpeaking(true);
    vibrate(30);
    speak(text);
    
    // Estimate speech duration (rough: 150 words per minute)
    const words = text.split(' ').length;
    const duration = (words / 150) * 60 * 1000;
    
    setTimeout(() => {
      setIsSpeaking(false);
    }, Math.max(duration, 1000));
  }, []);

  // Stop speaking
  const stopTalking = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  // Start voice recognition
  const startListening = useCallback(() => {
    setError(null);
    vibrate([30, 50, 30]);
    
    if (!recognitionRef.current) {
      recognitionRef.current = initRecognition(
        (text) => {
          setTranscript(text);
          options?.onTranscript?.(text);
        },
        () => {
          setIsListening(false);
        },
        (err) => {
          setError(err);
          setIsListening(false);
        }
      );
    }
    
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [options]);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Toggle listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Speak on mount if provided
  useEffect(() => {
    if (options?.speakOnMount) {
      // Delay slightly for better UX
      const timer = setTimeout(() => {
        sayText(options.speakOnMount!);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [options?.speakOnMount, sayText]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    isListening,
    isSpeaking,
    transcript,
    error,
    sayText,
    stopTalking,
    startListening,
    stopListening,
    toggleListening,
    vibrate,
  };
};

export default useSpeech;
