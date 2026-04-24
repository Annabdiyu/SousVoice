/**
 * ============================================================================
 * ACCESSIBILITY STORE — Zustand State Management
 * ============================================================================
 *
 * HCI Justification: Centralizing accessibility preferences in a global store
 * ensures consistent behavior across all components. This follows the
 * "Consistency & Standards" heuristic (Nielsen #4) — users shouldn't have
 * to wonder whether different words, situations, or actions mean the same thing.
 *
 * The store persists user preferences to localStorage so settings survive
 * page reloads, respecting the "Recognition over Recall" heuristic (#6).
 * ============================================================================
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ColorMode } from '../types';

// Re-export types for convenience
export type { ColorMode, RecipeStep, RecipeTag, Recipe } from '../types';

interface AccessibilityState {
  // ── Color & Vision Settings ──
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;

  // ── Typography Scaling ──
  // HCI: 1.5x scaling provides a significant readability improvement
  // for users with low vision without breaking layout.
  largeText: boolean;
  toggleLargeText: () => void;

  // ── Cooking Mode (Focus Mode) ──
  // HCI: "Progressive Disclosure" — hide secondary UI elements to reduce
  // cognitive load when the user is actively cooking.
  cookingMode: boolean;
  toggleCookingMode: () => void;
  enterCookingMode: () => void;
  exitCookingMode: () => void;

  // ── Recipe Navigation State ──
  currentStepIndex: number;
  setCurrentStep: (index: number) => void;
  nextStep: (totalSteps: number) => void;
  prevStep: () => void;

  // ── Voice Control State ──
  voiceEnabled: boolean;
  toggleVoice: () => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  lastCommand: string;
  setLastCommand: (command: string) => void;

  // ── Timer State ──
  activeTimer: number | null; // seconds remaining
  setActiveTimer: (seconds: number | null) => void;

  // ── Toast / Error Recovery ──
  toastMessage: string | null;
  toastType: 'info' | 'error' | 'success' | null;
  showToast: (message: string, type: 'info' | 'error' | 'success') => void;
  clearToast: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      // ── Color & Vision ──
      colorMode: 'standard',
      setColorMode: (mode) => {
        document.documentElement.setAttribute('data-theme', mode);
        set({ colorMode: mode });
      },

      // ── Typography ──
      largeText: false,
      toggleLargeText: () =>
        set((state) => {
          const next = !state.largeText;
          document.documentElement.setAttribute('data-a11y-scale', String(next));
          return { largeText: next };
        }),

      // ── Cooking Mode ──
      cookingMode: false,
      toggleCookingMode: () => set((state) => ({ cookingMode: !state.cookingMode })),
      enterCookingMode: () => set({ cookingMode: true, currentStepIndex: 0 }),
      exitCookingMode: () => set({ cookingMode: false, currentStepIndex: 0, activeTimer: null }),

      // ── Recipe Navigation ──
      currentStepIndex: 0,
      setCurrentStep: (index) => set({ currentStepIndex: index }),
      nextStep: (totalSteps) =>
        set((state) => ({
          currentStepIndex: Math.min(state.currentStepIndex + 1, totalSteps - 1),
        })),
      prevStep: () =>
        set((state) => ({
          currentStepIndex: Math.max(state.currentStepIndex - 1, 0),
        })),

      // ── Voice Control ──
      voiceEnabled: false,
      toggleVoice: () => set((state) => ({ voiceEnabled: !state.voiceEnabled })),
      isListening: false,
      setIsListening: (listening) => set({ isListening: listening }),
      lastCommand: '',
      setLastCommand: (command) => set({ lastCommand: command }),

      // ── Timer ──
      activeTimer: null,
      setActiveTimer: (seconds) => set({ activeTimer: seconds }),

      // ── Toast / Error Recovery ──
      toastMessage: null,
      toastType: null,
      showToast: (message, type) => set({ toastMessage: message, toastType: type }),
      clearToast: () => set({ toastMessage: null, toastType: null }),
    }),
    {
      name: 'sousvoice-accessibility',
      // Only persist user preferences, not transient UI state
      partialize: (state) => ({
        colorMode: state.colorMode,
        largeText: state.largeText,
        voiceEnabled: state.voiceEnabled,
      }),
    }
  )
);
