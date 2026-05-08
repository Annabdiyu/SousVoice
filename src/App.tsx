/**
 * ============================================================================
 * App.tsx — SousVoice Main Layout
 * ============================================================================
 *
 * HCI Design Principles Applied:
 *
 * 1. PROGRESSIVE DISCLOSURE: In Cooking Mode, the sidebar and recipe
 *    overview are hidden to reduce cognitive load, showing only the
 *    current step card, voice orb, and timer.
 *
 * 2. CONSISTENCY (Nielsen #4): The top nav persists across modes,
 *    providing a reliable anchor point.
 *
 * 3. USER CONTROL (Nielsen #3): Users can exit Cooking Mode at any
 *    time via the "Exit" button or the Escape key.
 *
 * 4. VISIBILITY OF SYSTEM STATUS (Nielsen #1): The voice orb, timer,
 *    and progress bar continuously inform the user about system state.
 *
 * 5. ANTIGRAVITY DESIGN: Spring physics on all transitions create a
 *    cohesive "weightless" feel throughout the application.
 * ============================================================================
 */
<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
=======
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
>>>>>>> a3b55610c9229bbfd33f67e76509c5179842f339
import { useAccessibilityStore } from './stores/accessibilityStore';
import { useVoiceController } from './hooks/useVoiceController';
import { recipes } from './data/recipes';

import RecipeCard from './components/RecipeCard';
import RecipeHeader from './components/RecipeHeader';
import RecipeGallery from './components/RecipeGallery';
import VoiceOrb from './components/VoiceOrb';
import SettingsPanel from './components/SettingsPanel';
import TimerDisplay from './components/TimerDisplay';
import ToastNotification from './components/ToastNotification';

export default function App() {
<<<<<<< HEAD
  const { colorMode, largeText, cookingMode } = useAccessibilityStore(useShallow((state) => ({
    colorMode: state.colorMode,
    largeText: state.largeText,
    cookingMode: state.cookingMode,
  })));
  const [settingsOpen, setSettingsOpen] = useState(false);
=======
  const {
    cookingMode,
    enterCookingMode,
    exitCookingMode,
    selectedRecipeId,
    setSelectedRecipe,
    setSearchQuery,
    currentStepIndex,
    setCurrentStep,
    nextStep,
    prevStep,
    colorMode,
    largeText,
    reducedMotion,
    autoReadSteps,
    setActiveTimer,
    showToast,
    speak,
  } = useAccessibilityStore();
>>>>>>> a3b55610c9229bbfd33f67e76509c5179842f339

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [direction, setDirection] = useState(1);

  // Find the currently active recipe
  const recipe = recipes.find(r => r.id === selectedRecipeId) || recipes[0];

  // ── Apply persisted theme on mount ──
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode);
    document.documentElement.setAttribute('data-a11y-scale', String(largeText));
  }, []);

  // ── Auto-Read Step Logic (HCI: Accessibility) ──
  useEffect(() => {
    if (cookingMode && autoReadSteps && selectedRecipeId) {
      const step = recipe.steps[currentStepIndex];
      const timer = setTimeout(() => {
        speak(`Step ${currentStepIndex + 1}: ${step.instruction}`);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStepIndex, cookingMode, autoReadSteps, recipe.steps, speak, selectedRecipeId]);

  // ── Keyboard shortcuts (WCAG 2.1.1 — Keyboard accessible) ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!cookingMode) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        exitCookingMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cookingMode, currentStepIndex]);

  // ── Navigation handlers ──
  const handleNext = useCallback(() => {
    if (currentStepIndex < recipe.steps.length - 1) {
      setDirection(1);
      nextStep(recipe.steps.length);
    } else {
      showToast('🎉 You\'ve completed all steps!', 'success');
      speak("Congratulations! You've completed all steps.");
    }
  }, [currentStepIndex, recipe.steps.length, nextStep, showToast, speak]);

  const handlePrev = useCallback(() => {
    if (currentStepIndex > 0) {
      setDirection(-1);
      prevStep();
    }
  }, [currentStepIndex, prevStep]);

  const handleRepeat = useCallback(() => {
    const step = recipe.steps[currentStepIndex];
    speak(step.instruction);
  }, [currentStepIndex, recipe.steps, speak]);

  const handleStartTimer = useCallback(() => {
    const step = recipe.steps[currentStepIndex];
    if (step.timerSeconds) {
      setActiveTimer(step.timerSeconds);
    } else {
      showToast('No timer available for this step.', 'info');
    }
  }, [currentStepIndex, recipe.steps, setActiveTimer, showToast]);

  const handleStopTimer = useCallback(() => {
    setActiveTimer(null);
  }, [setActiveTimer]);

  const handleGoToStep = useCallback((index: number) => {
    if (index >= 0 && index < recipe.steps.length) {
      setDirection(index > currentStepIndex ? 1 : -1);
      setCurrentStep(index);
    } else {
      showToast('Invalid step number.', 'error');
    }
  }, [currentStepIndex, recipe.steps.length, setCurrentStep, showToast]);

  const handleGoHome = useCallback(() => {
    exitCookingMode();
    setSelectedRecipe(null);
  }, [exitCookingMode, setSelectedRecipe]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    handleGoHome(); // Go to library to show results
    
    const results = recipes.filter(r => 
      r.title.toLowerCase().includes(query.toLowerCase()) || 
      r.ingredients.some(i => i.toLowerCase().includes(query.toLowerCase()))
    );

    if (results.length > 0) {
      speak(`I found ${results.length} recipes with ${query}.`);
      showToast(`🔍 Found ${results.length} results for "${query}"`, 'success');
    } else {
      speak(`I couldn't find any recipes with ${query}.`);
      showToast(`∅ No results for "${query}"`, 'info');
    }
  }, [handleGoHome, setSearchQuery, showToast, speak]);

  // ── Voice controller integration ──
  const { isListening, isSupported, toggleListening } = useVoiceController({
    onNext: handleNext,
    onBack: handlePrev,
    onRepeat: handleRepeat,
    onStartTimer: handleStartTimer,
    onStopTimer: handleStopTimer,
    onGoToStep: handleGoToStep,
    onGoHome: handleGoHome,
    onSearch: handleSearch,
  } as any);

  const currentStep = recipe.steps[currentStepIndex];

  // ── Floating particle effect for ambiance ──
  const particles = useRef(
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 4,
    }))
  ).current;

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-colors duration-500"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ── Ambient Particles (decorative) ── */}
      {!reducedMotion && (
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: 'var(--accent-primary)',
                opacity: 0.15,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 15, -15, 0],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Top Navigation Bar ── */}
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
            onClick={handleGoHome}
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
              onClick={exitCookingMode}
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
            onClick={() => setSettingsOpen(true)}
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

      {/* ── Main Content Area ── */}
      <main className="relative z-10 px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {!selectedRecipeId ? (
            /* ── Recipe Library Mode ── */
            <motion.div
              key="library"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  Discover Recipes
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Select a recipe or filter by category to get started.
                </p>
              </div>
              <RecipeGallery />
            </motion.div>
          ) : !cookingMode ? (
            /* ── Recipe Overview Mode ── */
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <RecipeHeader recipe={recipe} onStartCooking={enterCookingMode} onBack={handleGoHome} />
            </motion.div>
          ) : (
            /* ── Cooking (Focus) Mode ── */
            <motion.div
              key="cooking"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="flex flex-col items-center gap-8 max-w-3xl mx-auto"
            >
              {/* Step info header */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p
                  className="text-sm font-medium uppercase tracking-widest mb-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Cooking Mode
                </p>
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                >
                  {recipe.title}
                </h2>
              </motion.div>

              {/* ── The Floating Recipe Card ── */}
              <RecipeCard
                step={currentStep}
                stepIndex={currentStepIndex}
                totalSteps={recipe.steps.length}
                direction={direction}
                onNext={handleNext}
                onPrev={handlePrev}
                onStartTimer={handleStartTimer}
              />

              {/* ── Voice Orb ── */}
              <VoiceOrb
                isListening={isListening}
                isSupported={isSupported}
                onToggle={toggleListening}
              />

              {/* ── Keyboard hints ── */}
              <p
                className="text-xs text-center opacity-40"
                style={{ color: 'var(--text-muted)' }}
                aria-hidden="true"
              >
                ← → Arrow keys to navigate · Esc to exit
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Overlay Components ── */}
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <TimerDisplay />
      <ToastNotification />
    </div>
  );
}
