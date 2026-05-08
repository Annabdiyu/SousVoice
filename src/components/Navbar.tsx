/**
 * Navbar — Persistent navigation with glassmorphism styling.
 * HCI: Consistency (Nielsen #4) — the nav persists across all pages.
 */
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAccessibilityStore } from '../stores/accessibilityStore';

interface NavbarProps {
  onOpenSettings: () => void;
}

export default function Navbar({ onOpenSettings }: NavbarProps) {
  const location = useLocation();
  const { cookingMode, exitCookingMode } = useAccessibilityStore();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/recipes', label: 'Recipes' },
  ];

  return (
    <nav
      className="sticky top-0 z-40 backdrop-blur-2xl"
      style={{
        background: 'var(--bg-glass)',
        borderBottom: '1px solid var(--border-card)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group" aria-label="SousVoice Home">
          <motion.div
            className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{ background: 'var(--accent-gradient)' }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <span className="text-lg">🍳</span>
          </motion.div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Sous<span style={{ color: 'var(--accent-primary)' }}>Voice</span>
          </span>
        </Link>

        {/* Center Links */}
        {!cookingMode && (
          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors no-underline"
                  style={{
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: 'var(--accent-primary)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {cookingMode && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={exitCookingMode}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: 'rgba(248,113,113,0.1)',
                color: 'var(--danger)',
                border: '1px solid rgba(248,113,113,0.3)',
              }}
              id="btn-exit-cooking"
              aria-label="Exit cooking mode"
            >
              ✕ Exit Cooking
            </motion.button>
          )}
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
            style={{
              background: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-card)',
            }}
            id="btn-open-settings"
            aria-label="Open accessibility settings"
          >
            ⚙️ <span className="hidden sm:inline">Accessibility</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
