import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Web Speech API
if (typeof window !== 'undefined') {
  (window as any).SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || class {
    start = vi.fn();
    stop = vi.fn();
    abort = vi.fn();
    onresult = null;
    onerror = null;
    onend = null;
  };

  (window as any).speechSynthesis = {
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn(() => []),
  };

  (window as any).SpeechSynthesisUtterance = class {
    text = '';
    lang = '';
    rate = 1;
    pitch = 1;
    volume = 1;
    onend = null;
    constructor(text: string) {
      this.text = text;
    }
  };
}

// Mock ScrollTo for components
window.scrollTo = vi.fn();

// Mock crypto.randomUUID
if (!crypto.randomUUID) {
  (crypto as any).randomUUID = () => Math.random().toString(36).substring(2);
}
