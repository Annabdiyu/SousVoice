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
import { memo } from 'react';
import { motion } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useAccessibilityStore } from '../stores/accessibilityStore';

interface VoiceOrbProps {
  isListening: boolean;
  isSupported: boolean;
  onToggle: () => void;
}

const VoiceOrb = memo(function VoiceOrb({ isListening, isSupported, onToggle }: VoiceOrbProps) {
  const { lastCommand } = useAccessibilityStore(useShallow((state) => ({ lastCommand: state.lastCommand })));

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
          focusRingColor: 'var(--accent-primary)',
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

      {/* Status label */}
      <span
        className="text-xs font-medium tracking-wide"
        style={{ color: isListening ? 'var(--accent-primary)' : 'var(--text-muted)' }}
      >
        {!isSupported
          ? 'Not Supported'
          : isListening
            ? 'Listening…'
            : 'Voice Off'}
      </span>

      {/* Last heard command */}
      {lastCommand && isListening && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs px-3 py-1 rounded-full max-w-[180px] truncate"
          style={{
            background: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          "{lastCommand}"
        </motion.span>
      )}
    </div>
  );
});

export default VoiceOrb;
