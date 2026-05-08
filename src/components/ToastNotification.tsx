/**
 * ToastNotification — Error Recovery & Feedback
 *
 * HCI (Nielsen #9): "Help users recognize, diagnose, and recover."
 * Toasts auto-dismiss but provide a manual close. Error toasts include
 * a manual override button suggestion, ensuring the user is never stuck.
 */
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useAccessibilityStore } from '../stores/accessibilityStore';

export default function ToastNotification() {
  const { toastMessage, toastType, clearToast } = useAccessibilityStore(useShallow((state) => ({
    toastMessage: state.toastMessage,
    toastType: state.toastType,
    clearToast: state.clearToast,
  })));

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(clearToast, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  const bgMap = {
    success: 'var(--success)',
    error: 'var(--danger)',
    info: 'var(--accent-primary)',
  };

  return (
    <AnimatePresence>
      {toastMessage && toastType && (
        <motion.div
          initial={{ y: -60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -60, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl max-w-md"
          style={{
            background: 'var(--bg-card)',
            border: `2px solid ${bgMap[toastType]}`,
            color: 'var(--text-primary)',
          }}
          role="alert"
          aria-live="assertive"
          id="toast-notification"
        >
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: bgMap[toastType] }}
          />
          <p className="text-sm font-medium flex-1">{toastMessage}</p>
          <button
            onClick={clearToast}
            className="text-xs opacity-60 hover:opacity-100 transition-opacity ml-2"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
