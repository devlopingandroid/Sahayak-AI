// Voice synthesis and recognition utilities for Sahayak

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

let speechSynthesisInstance: SpeechSynthesis | null = null;
let recognition: SpeechRecognitionInstance | null = null;

// Initialize speech synthesis
export const initSpeech = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    speechSynthesisInstance = window.speechSynthesis;
  }
};

// Speak text aloud
export const speak = (text: string, options?: { rate?: number; pitch?: number; volume?: number }) => {
  if (!speechSynthesisInstance) {
    initSpeech();
  }
  
  if (speechSynthesisInstance) {
    // Cancel any ongoing speech
    speechSynthesisInstance.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options?.rate ?? 0.9; // Slightly slower for elderly users
    utterance.pitch = options?.pitch ?? 1;
    utterance.volume = options?.volume ?? 1;
    
    // Try to get a natural voice
    const voices = speechSynthesisInstance.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Natural')) 
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    speechSynthesisInstance.speak(utterance);
  }
};

// Stop speaking
export const stopSpeaking = () => {
  if (speechSynthesisInstance) {
    speechSynthesisInstance.cancel();
  }
};

// Initialize speech recognition
export const initRecognition = (
  onResult: (text: string) => void,
  onEnd?: () => void,
  onError?: (error: string) => void
): SpeechRecognitionInstance | null => {
  const SpeechRecognitionAPI = (window as Window & { 
    SpeechRecognition?: SpeechRecognitionConstructor; 
    webkitSpeechRecognition?: SpeechRecognitionConstructor; 
  }).SpeechRecognition || (window as Window & { 
    webkitSpeechRecognition?: SpeechRecognitionConstructor; 
  }).webkitSpeechRecognition;
  
  if (!SpeechRecognitionAPI) {
    onError?.('Speech recognition not supported in this browser');
    return null;
  }
  
  recognition = new SpeechRecognitionAPI();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  
  recognition.onend = () => {
    onEnd?.();
  };
  
  recognition.onerror = (event) => {
    onError?.(event.error);
  };
  
  return recognition;
};

// Start listening
export const startListening = () => {
  if (recognition) {
    recognition.start();
  }
};

// Stop listening
export const stopListening = () => {
  if (recognition) {
    recognition.stop();
  }
};

// Haptic feedback
export const vibrate = (pattern: number | number[] = 50) => {
  if (typeof window !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
  }
};
