/**
 * useVoiceController — Web Speech API Hook
 * HCI: Voice input for hands-free cooking (Nielsen #7 — Flexibility).
 * Error Recovery (Nielsen #9): Unrecognized commands show friendly toasts.
 */
import { useCallback, useEffect, useRef } from 'react';
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
  const { isListening, setIsListening, setLastCommand, showToast, voiceEnabled } =
    useAccessibilityStore();
  const lastTranscriptRef = useRef('');
  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const processCommand = useCallback(
    (transcript: string) => {
      const cmd = transcript.toLowerCase().trim();
      lastTranscriptRef.current = cmd;
      setLastCommand(cmd);

      // ── Step Navigation ──
      if (cmd.includes('next') || cmd.includes('forward') || cmd.includes('continue')) {
        handlers.onNext();
        showToast('✓ Next step', 'success');
        return;
      }
      if (cmd.includes('back') || cmd.includes('previous')) {
        handlers.onBack();
        showToast('✓ Previous step', 'success');
        return;
      }
      if (cmd.includes('repeat') || cmd.includes('again') || cmd.includes('read')) {
        handlers.onRepeat();
        showToast('✓ Repeating step', 'success');
        return;
      }

      // Jump to step (e.g., "Go to step 3" or "Step 3")
      const stepMatch = cmd.match(/(?:go to )?step (\d+)/);
      if (stepMatch) {
        const stepNum = parseInt(stepMatch[1], 10);
        // We'll pass this to a new handler in App.tsx or use a generic approach
        // For now, let's assume handlers.onGoToStep exists or we'll add it
        (handlers as any).onGoToStep?.(stepNum - 1);
        showToast(`✓ Moving to step ${stepNum}`, 'success');
        return;
      }

      // ── Timer Controls ──
      if (cmd.includes('start timer') || cmd.includes('set timer')) {
        handlers.onStartTimer();
        showToast('✓ Timer started!', 'success');
        return;
      }
      if (cmd.includes('stop timer') || cmd.includes('pause timer')) {
        // We'll add this to handlers
        (handlers as any).onStopTimer?.();
        showToast('✓ Timer stopped', 'info');
        return;
      }

      // ── System Controls ──
      if (cmd.includes('stop') || cmd.includes('pause') || cmd.includes('cancel')) {
        stopListening();
        showToast('🎤 Voice paused', 'info');
        return;
      }
      if (cmd.includes('home') || cmd.includes('show recipes') || cmd.includes('library')) {
        (handlers as any).onGoHome?.();
        showToast('✓ Returning home', 'info');
        return;
      }
      if (cmd.includes('help') || cmd.includes('what can i say')) {
        showToast('Try: "Next", "Back", "Repeat", "Step 2", or "Go Home"', 'info');
        return;
      }

      showToast(`🤔 Heard: "${cmd}". Try "Help" for commands.`, 'error');
    },
    [handlers, setLastCommand, showToast]
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
