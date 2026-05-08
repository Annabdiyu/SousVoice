/**
 * VoiceOrb — Pulsing visual feedback for voice input
 *
 * HCI: A pulsing orb provides continuous visual feedback that the
 * system is listening (Norman's Gulf of Evaluation). The animation
 * uses spring physics for a "weightless" feel. The orb changes
 * state to indicate: idle, listening, and processing.
 *
 * Accessibility: The orb has aria-live="polite" and descriptive
 * labels so screen readers announce state changes.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibilityStore } from '../stores/accessibilityStore';

interface VoiceOrbProps {
  isListening: boolean;
  isSupported: boolean;
  onToggle: () => void;
}

export default function VoiceOrb({ isListening, isSupported, onToggle }: VoiceOrbProps) {
  const { lastCommand } = useAccessibilityStore();

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={onToggle}
        disabled={!isSupported}
        className="relative flex items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-4"
        style={{
          width: 72,
          height: 72,
          background: isListening
            ? 'var(--accent-primary)'
            : 'var(--bg-card)',
          border: `2px solid ${isListening ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
          color: isListening ? 'var(--bg-primary)' : 'var(--text-primary)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={
          isListening
            ? { boxShadow: ['0 0 0 0px var(--accent-glow)', '0 0 0 20px transparent'] }
            : {}
        }
        transition={
          isListening
            ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            : { type: 'spring', stiffness: 300, damping: 20 }
        }
        aria-label={
          !isSupported
            ? 'Voice control not supported'
            : isListening
              ? 'Voice active — click to stop'
              : 'Click to start voice control'
        }
        aria-live="polite"
        id="voice-orb-toggle"
      >
        {/* Outer pulse rings when listening */}
        {isListening && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid var(--accent-primary)' }}
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid var(--accent-primary)' }}
              animate={{ scale: [1, 2], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            />
          </>
        )}
        <span className="text-2xl relative z-10" aria-hidden="true">
          {!isSupported ? '🚫' : isListening ? '🎤' : '🎙️'}
        </span>
      </motion.button>

      {/* Transcription display (HCI: Visibility of System Status) */}
      <div className="h-10 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {lastCommand && isListening ? (
            <motion.div
              key={lastCommand}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md border shadow-lg max-w-[280px] truncate"
              style={{
                background: 'var(--bg-glass)',
                color: 'var(--accent-primary)',
                borderColor: 'var(--border-active)',
              }}
              role="status"
              aria-live="polite"
            >
              <span className="opacity-60 mr-2">Heard:</span>
              "{lastCommand}"
            </motion.div>
          ) : isListening ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="text-xs tracking-widest uppercase font-bold"
              style={{ color: 'var(--text-muted)' }}
            >
              Listening…
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Status label */}
      <span
        className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40"
        style={{ color: isListening ? 'var(--accent-primary)' : 'var(--text-muted)' }}
      >
        {!isSupported
          ? 'Voice Not Supported'
          : isListening
            ? 'Voice Active'
            : 'Voice Idle'}
      </span>
    </div>
  );
}
