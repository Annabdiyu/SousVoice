/**
 * useVoiceController — Web Speech API Hook
 * HCI: Voice input for hands-free cooking (Nielsen #7 — Flexibility).
 * Error Recovery (Nielsen #9): Unrecognized commands show friendly toasts.
 */
import { useCallback, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAccessibilityStore } from '../stores/accessibilityStore';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}
declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

interface VoiceHandlers {
  onNext: () => void;
  onBack: () => void;
  onRepeat: () => void;
  onStartTimer: () => void;
}

export function useVoiceController(handlers: VoiceHandlers) {
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const isListeningRef = useRef(false);
  const handlersRef = useRef(handlers);

  // Update handlers ref on every render to avoid stale closures without tearing down recognition
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  const { isListening, setIsListening, setLastCommand, showToast, voiceEnabled } =
    useAccessibilityStore(useShallow((state) => ({
      isListening: state.isListening,
      setIsListening: state.setIsListening,
      setLastCommand: state.setLastCommand,
      showToast: state.showToast,
      voiceEnabled: state.voiceEnabled,
    })));
  const lastTranscriptRef = useRef('');
  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const processCommand = useCallback(
    (transcript: string) => {
      const cmd = transcript.toLowerCase().trim();
      lastTranscriptRef.current = cmd;
      setLastCommand(cmd);

      if (cmd.includes('next') || cmd.includes('forward') || cmd.includes('continue')) {
        handlersRef.current.onNext();
        showToast('✓ Next step', 'success');
        return;
      }
      if (cmd.includes('back') || cmd.includes('previous')) {
        handlersRef.current.onBack();
        showToast('✓ Previous step', 'success');
        return;
      }
      if (cmd.includes('repeat') || cmd.includes('again')) {
        handlersRef.current.onRepeat();
        showToast('✓ Repeating step', 'success');
        return;
      }
      if (cmd.includes('timer')) {
        handlersRef.current.onStartTimer();
        showToast('✓ Timer started!', 'success');
        return;
      }
      if (cmd.includes('stop') || cmd.includes('pause')) {
        stopListening();
        showToast('🎤 Voice paused', 'info');
        return;
      }
      showToast(`🤔 Heard: "${cmd}". Try "Next", "Back", or "Repeat".`, 'error');
    },
    [setLastCommand, showToast]
  );

  const startListening = useCallback(() => {
    if (!isSupported) {
      showToast('Voice not supported in this browser.', 'error');
      return;
    }
    if (recognitionRef.current) recognitionRef.current.abort();
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.continuous = true;
    r.interimResults = false;
    r.lang = 'en-US';
    r.onstart = () => { isListeningRef.current = true; setIsListening(true); };
    r.onresult = (e: SpeechRecognitionEvent) => {
      const last = e.results[e.results.length - 1];
      if (last.isFinal) processCommand(last[0].transcript);
    };
    r.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error === 'no-speech' || e.error === 'aborted') return;
      showToast(`Mic error: ${e.error}`, 'error');
    };
    r.onend = () => {
      if (isListeningRef.current) { try { r.start(); } catch {} }
      else setIsListening(false);
    };
    recognitionRef.current = r;
    try { r.start(); } catch { showToast('Could not start voice.', 'error'); }
  }, [isSupported, processCommand, setIsListening, showToast]);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    setIsListening(false);
    recognitionRef.current?.abort();
    recognitionRef.current = null;
  }, [setIsListening]);

  const toggleListening = useCallback(() => {
    isListening ? stopListening() : startListening();
  }, [isListening, startListening, stopListening]);

  useEffect(() => () => { recognitionRef.current?.abort(); }, []);

  useEffect(() => {
    if (voiceEnabled && !isListening) startListening();
    else if (!voiceEnabled && isListening) stopListening();
  }, [voiceEnabled]);

  return { isListening, isSupported, startListening, stopListening, toggleListening, lastTranscript: lastTranscriptRef.current };
}
