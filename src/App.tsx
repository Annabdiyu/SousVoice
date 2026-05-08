/**
 * App.tsx — Main router shell with persistent navigation.
 * HCI: Consistent navigation (Nielsen #4) across all pages.
 */
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useAccessibilityStore } from './stores/accessibilityStore';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SettingsPanel from './components/SettingsPanel';
import TimerDisplay from './components/TimerDisplay';
import ToastNotification from './components/ToastNotification';

import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import RecipePage from './pages/RecipePage';

export default function App() {
  const { colorMode, largeText, cookingMode } = useAccessibilityStore(useShallow((state) => ({
    colorMode: state.colorMode,
    largeText: state.largeText,
    cookingMode: state.cookingMode,
  })));
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Apply persisted theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode);
    document.documentElement.setAttribute('data-a11y-scale', String(largeText));
  }, [colorMode, largeText]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
        <Navbar onOpenSettings={() => setSettingsOpen(true)} />

        <main className="flex-1 relative">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<BrowsePage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
          </Routes>
        </main>

        {/* Footer hidden in cooking mode (progressive disclosure) */}
        {!cookingMode && <Footer />}

        {/* Overlays */}
        <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
        <TimerDisplay />
        <ToastNotification />
      </div>
    </BrowserRouter>
  );
}
