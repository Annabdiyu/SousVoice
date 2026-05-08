/**
 * RecipePage — Detail view + Cooking Mode.
 * HCI: Progressive Disclosure between overview and focused cooking.
 */
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useAccessibilityStore } from '../stores/accessibilityStore';
import { useVoiceController } from '../hooks/useVoiceController';
import { getRecipeById } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import RecipeHeader from '../components/RecipeHeader';
import VoiceOrb from '../components/VoiceOrb';

export default function RecipePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const recipe = getRecipeById(id || '');

  const {
    cookingMode, enterCookingMode, exitCookingMode,
    currentStepIndex, nextStep, prevStep,
    setActiveTimer, showToast,
  } = useAccessibilityStore(useShallow((state) => ({
    cookingMode: state.cookingMode,
    enterCookingMode: state.enterCookingMode,
    exitCookingMode: state.exitCookingMode,
    currentStepIndex: state.currentStepIndex,
    nextStep: state.nextStep,
    prevStep: state.prevStep,
    setActiveTimer: state.setActiveTimer,
    showToast: state.showToast,
  })));

  const [direction, setDirection] = useState(1);

  // Redirect if recipe not found
  useEffect(() => {
    if (!recipe) navigate('/recipes', { replace: true });
  }, [recipe, navigate]);

  // Keyboard shortcuts (WCAG 2.1.1)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!cookingMode) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); handleNext(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); handlePrev(); }
      else if (e.key === 'Escape') exitCookingMode();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [cookingMode, currentStepIndex]);

  const handleNext = useCallback(() => {
    if (!recipe) return;
    if (currentStepIndex < recipe.steps.length - 1) {
      setDirection(1);
      nextStep(recipe.steps.length);
    } else {
      showToast('🎉 All steps complete — enjoy your meal!', 'success');
    }
  }, [currentStepIndex, recipe, nextStep, showToast]);

  const handlePrev = useCallback(() => {
    if (currentStepIndex > 0) { setDirection(-1); prevStep(); }
  }, [currentStepIndex, prevStep]);

  const handleRepeat = useCallback(() => {
    if (!recipe) return;
    const step = recipe.steps[currentStepIndex];
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(step.instruction);
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  }, [currentStepIndex, recipe]);

  const handleStartTimer = useCallback(() => {
    if (!recipe) return;
    const step = recipe.steps[currentStepIndex];
    if (step.timerSeconds) setActiveTimer(step.timerSeconds);
    else showToast('No timer available for this step.', 'info');
  }, [currentStepIndex, recipe, setActiveTimer, showToast]);

  const { isListening, isSupported, toggleListening } = useVoiceController({
    onNext: handleNext,
    onBack: handlePrev,
    onRepeat: handleRepeat,
    onStartTimer: handleStartTimer,
  });

  if (!recipe) return null;

  const currentStep = recipe.steps[currentStepIndex];

  return (
    <div className="relative z-10 min-h-screen px-4 py-8 md:py-12">
      <AnimatePresence mode="wait">
        {!cookingMode ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <RecipeHeader recipe={recipe} onStartCooking={enterCookingMode} />
          </motion.div>
        ) : (
          <motion.div
            key="cooking"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex flex-col items-center gap-8 max-w-3xl mx-auto"
          >
            {/* Mode header */}
            <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--accent-primary)' }}>
                Cooking Mode
              </p>
              <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {recipe.title}
              </h2>
            </motion.div>

            {/* Floating card */}
            <RecipeCard
              step={currentStep}
              stepIndex={currentStepIndex}
              totalSteps={recipe.steps.length}
              direction={direction}
              onNext={handleNext}
              onPrev={handlePrev}
              onStartTimer={handleStartTimer}
            />

            {/* Voice orb */}
            <VoiceOrb isListening={isListening} isSupported={isSupported} onToggle={toggleListening} />

            <p className="text-xs text-center opacity-30" style={{ color: 'var(--text-muted)' }} aria-hidden="true">
              ← → Arrow keys to navigate · Esc to exit
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
