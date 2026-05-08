import React from 'react';
import { motion } from 'framer-motion';

interface TopNavProps {
  cookingMode: boolean;
  onGoHome: () => void;
  onExitCooking: () => void;
  onOpenSettings: () => void;
  onOpenShoppingList: () => void;
}

const TopNav: React.FC<TopNavProps> = ({
  cookingMode,
  onGoHome,
  onExitCooking,
  onOpenSettings,
  onOpenShoppingList,
}) => {
  return (
    <nav
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 backdrop-blur-xl"
      style={{
        background: 'var(--bg-glass)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          onClick={onGoHome}
        >
          <span className="text-2xl">🍳</span>
          <h1
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Sous<span style={{ color: 'var(--accent-primary)' }}>Voice</span>
          </h1>
        </motion.div>
      </div>

      {/* Nav Actions */}
      <div className="flex items-center gap-3">
        {cookingMode && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onExitCooking}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: 'var(--bg-card)',
              color: 'var(--danger)',
              border: '1px solid var(--danger)',
            }}
            id="btn-exit-cooking"
            aria-label="Exit cooking mode"
          >
            ✕ Exit
          </motion.button>
        )}

        <button
          onClick={onOpenShoppingList}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
          }}
          aria-label="Open shopping list"
        >
          🛒 <span className="hidden sm:inline">List</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
          }}
          id="btn-open-settings"
          aria-label="Open accessibility settings"
        >
          ⚙️ <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </nav>
  );
};

export default TopNav;
