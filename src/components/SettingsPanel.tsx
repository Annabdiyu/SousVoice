/**
 * SettingsPanel — Accessibility Controls Sidebar
 *
 * HCI: "User Control & Freedom" (Nielsen #3) — Users can customize
 * their experience at any time. Settings are grouped by category
 * for scannability (Gestalt proximity).
 *
 * Hidden during Cooking Mode to reduce cognitive load
 * ("Progressive Disclosure" pattern).
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useAccessibilityStore } from '../stores/accessibilityStore';
import type { ColorMode } from '../types';

const colorModes: { mode: ColorMode; label: string; icon: string; desc: string }[] = [
  { mode: 'standard', label: 'Standard', icon: '🎨', desc: 'Default dark theme' },
  { mode: 'protanopia', label: 'Protanopia', icon: '👁️', desc: 'Red-blind optimized' },
  { mode: 'high-contrast', label: 'High Contrast', icon: '◐', desc: 'Maximum visibility' },
];

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const {
    colorMode, setColorMode,
    largeText, toggleLargeText,
    reducedMotion, toggleReducedMotion,
    voiceEnabled, toggleVoice,
<<<<<<< HEAD
  } = useAccessibilityStore(useShallow((state) => ({
    colorMode: state.colorMode,
    setColorMode: state.setColorMode,
    largeText: state.largeText,
    toggleLargeText: state.toggleLargeText,
    voiceEnabled: state.voiceEnabled,
    toggleVoice: state.toggleVoice,
  })));
=======
    autoReadSteps, toggleAutoReadSteps,
  } = useAccessibilityStore();
>>>>>>> a3b55610c9229bbfd33f67e76509c5179842f339

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 overflow-y-auto p-6"
            style={{
              background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-subtle)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Accessibility Settings"
            id="settings-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                ⚙️ Settings
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl transition-all hover:scale-105"
                style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}
                aria-label="Close settings"
                id="btn-close-settings"
              >
                ✕
              </button>
            </div>

            {/* ── Color Mode Section ── */}
            <section className="mb-8">
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                Color Vision Mode
              </h3>
              <div className="space-y-2">
                {colorModes.map(({ mode, label, icon, desc }) => (
                  <button
                    key={mode}
                    onClick={() => setColorMode(mode)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:scale-[1.02]"
                    style={{
                      background: colorMode === mode ? 'var(--accent-primary)' : 'var(--bg-card)',
                      color: colorMode === mode ? 'var(--bg-primary)' : 'var(--text-primary)',
                      border: `1px solid ${colorMode === mode ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                    }}
                    aria-pressed={colorMode === mode}
                    id={`btn-color-${mode}`}
                  >
                    <span className="text-xl">{icon}</span>
                    <div>
                      <div className="font-semibold text-sm">{label}</div>
                      <div className="text-xs opacity-70">{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* ── Text Size Toggle ── */}
            <section className="mb-8">
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                Typography & Motion
              </h3>
              <div className="space-y-3">
                <ToggleRow
                  label="Large Text (1.5×)"
                  description="Increases text size for readability"
                  icon="🔤"
                  checked={largeText}
                  onToggle={toggleLargeText}
                  id="toggle-large-text"
                />
                <ToggleRow
                  label="Reduced Motion"
                  description="Disables decorative animations"
                  icon="🧊"
                  checked={reducedMotion}
                  onToggle={toggleReducedMotion}
                  id="toggle-reduced-motion"
                />
              </div>
            </section>

            {/* ── Voice Toggle ── */}
            <section className="mb-8">
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                Voice Assistant
              </h3>
              <div className="space-y-3">
                <ToggleRow
                  label="Voice Commands"
                  description="Hands-free navigation"
                  icon="🎤"
                  checked={voiceEnabled}
                  onToggle={toggleVoice}
                  id="toggle-voice"
                />
                <ToggleRow
                  label="Auto-Read Steps"
                  description="Reads instructions aloud automatically"
                  icon="🔊"
                  checked={autoReadSteps}
                  onToggle={toggleAutoReadSteps}
                  id="toggle-auto-read"
                />
              </div>
            </section>

            {/* ── Command Reference ── */}
            <section>
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                What can I say?
              </h3>
              <div
                className="rounded-xl p-4 space-y-2 text-sm"
                style={{ background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
              >
                {[
                  ['"Next" / "Continue"', 'Next step'],
                  ['"Back"', 'Previous step'],
                  ['"Repeat" / "Read"', 'Hear step again'],
                  ['"Step 3"', 'Jump to step 3'],
                  ['"Start Timer"', 'Start step timer'],
                  ['"Help"', 'Show commands'],
                ].map(([cmd, desc]) => (
                  <div key={cmd} className="flex justify-between">
                    <code
                      className="font-semibold"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      {cmd}
                    </code>
                    <span>{desc}</span>
                  </div>
                ))}
              </div>
            </section>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Reusable Toggle Row ── */
function ToggleRow({
  label, description, icon, checked, onToggle, id,
}: {
  label: string;
  description: string;
  icon: string;
  checked: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:scale-[1.02]"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
      }}
      role="switch"
      aria-checked={checked}
      id={id}
    >
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</div>
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{description}</div>
      </div>
      <div
        className="w-11 h-6 rounded-full relative transition-colors"
        style={{ background: checked ? 'var(--accent-primary)' : 'var(--bg-secondary)' }}
      >
        <motion.div
          className="absolute top-0.5 w-5 h-5 rounded-full"
          style={{ background: 'var(--text-primary)' }}
          animate={{ left: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </button>
  );
}
