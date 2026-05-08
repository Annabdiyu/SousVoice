/**
 * TimerDisplay — Floating countdown timer
 * HCI: Provides temporal awareness without requiring user to
 * track time mentally (reducing extraneous cognitive load).
 */
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useAccessibilityStore } from '../stores/accessibilityStore';

export default function TimerDisplay() {
  const { activeTimer, setActiveTimer, showToast } = useAccessibilityStore(useShallow((state) => ({
    activeTimer: state.activeTimer,
    setActiveTimer: state.setActiveTimer,
    showToast: state.showToast,
  })));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (activeTimer !== null && activeTimer > 0) {
      intervalRef.current = setInterval(() => {
        setActiveTimer(activeTimer - 1);
      }, 1000);
    } else if (activeTimer === 0) {
      showToast('⏰ Timer complete! Step is done.', 'success');
      setActiveTimer(null);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeTimer, setActiveTimer, showToast]);

  if (activeTimer === null) return null;

  const minutes = Math.floor(activeTimer / 60);
  const seconds = activeTimer % 60;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="fixed bottom-8 left-8 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl backdrop-blur-xl"
        style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-active)',
          boxShadow: 'var(--shadow-card)',
        }}
        role="timer"
        aria-live="polite"
        aria-label={`Timer: ${minutes} minutes ${seconds} seconds remaining`}
      >
        <span className="text-2xl">⏱️</span>
        <span
          className="text-2xl font-bold tabular-nums"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-primary)' }}
        >
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
        <button
          onClick={() => setActiveTimer(null)}
          className="ml-2 w-8 h-8 flex items-center justify-center rounded-full hover:scale-110 transition-transform"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          aria-label="Cancel timer"
          id="btn-cancel-timer"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
