import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAccessibilityStore } from './accessibilityStore';

describe('accessibilityStore', () => {
  beforeEach(() => {
    // Clear storage/reset state if needed
    const { 
      setColorMode, 
      setSelectedRecipe, 
      exitCookingMode, 
      clearShoppingList,
      clearToast 
    } = useAccessibilityStore.getState();
    
    setColorMode('standard');
    setSelectedRecipe(null);
    exitCookingMode();
    clearShoppingList();
    clearToast();
  });

  it('should initialize with default values', () => {
    const state = useAccessibilityStore.getState();
    expect(state.colorMode).toBe('standard');
    expect(state.largeText).toBe(false);
    expect(state.cookingMode).toBe(false);
    expect(state.shoppingList).toEqual([]);
  });

  describe('Color & Vision', () => {
    it('should update color mode and set data attribute', () => {
      const { setColorMode } = useAccessibilityStore.getState();
      setColorMode('protanopia');
      expect(useAccessibilityStore.getState().colorMode).toBe('protanopia');
      expect(document.documentElement.getAttribute('data-theme')).toBe('protanopia');
    });

    it('should toggle large text scale', () => {
      const { toggleLargeText } = useAccessibilityStore.getState();
      toggleLargeText();
      expect(useAccessibilityStore.getState().largeText).toBe(true);
      expect(document.documentElement.getAttribute('data-a11y-scale')).toBe('true');
      
      toggleLargeText();
      expect(useAccessibilityStore.getState().largeText).toBe(false);
      expect(document.documentElement.getAttribute('data-a11y-scale')).toBe('false');
    });
  });

  describe('Cooking Flow', () => {
    it('should enter and exit cooking mode', () => {
      const { enterCookingMode, exitCookingMode } = useAccessibilityStore.getState();
      
      enterCookingMode();
      expect(useAccessibilityStore.getState().cookingMode).toBe(true);
      expect(useAccessibilityStore.getState().currentStepIndex).toBe(0);
      
      exitCookingMode();
      expect(useAccessibilityStore.getState().cookingMode).toBe(false);
    });

    it('should navigate through steps correctly', () => {
      const { enterCookingMode, nextStep, prevStep } = useAccessibilityStore.getState();
      enterCookingMode();
      
      nextStep(5); // Advance to step 1
      expect(useAccessibilityStore.getState().currentStepIndex).toBe(1);
      
      nextStep(5); // Advance to step 2
      expect(useAccessibilityStore.getState().currentStepIndex).toBe(2);
      
      prevStep(); // Go back to step 1
      expect(useAccessibilityStore.getState().currentStepIndex).toBe(1);
    });

    it('should stay within step boundaries', () => {
      const { nextStep, prevStep, setCurrentStep } = useAccessibilityStore.getState();
      
      setCurrentStep(0);
      prevStep();
      expect(useAccessibilityStore.getState().currentStepIndex).toBe(0);
      
      setCurrentStep(4);
      nextStep(5);
      expect(useAccessibilityStore.getState().currentStepIndex).toBe(4);
    });
  });

  describe('Shopping List', () => {
    it('should add multiple items from a recipe', () => {
      const { addToShoppingList } = useAccessibilityStore.getState();
      const ingredients = ['Tomato', 'Garlic', 'Basil'];
      
      addToShoppingList(ingredients, 'Mock Pasta');
      
      const list = useAccessibilityStore.getState().shoppingList;
      expect(list).toHaveLength(3);
      expect(list[0].recipeTitle).toBe('Mock Pasta');
      expect(list[1].name).toBe('Garlic');
    });

    it('should toggle item completion status', () => {
      const { addToShoppingList, toggleShoppingItem } = useAccessibilityStore.getState();
      addToShoppingList(['Ingredient 1'], 'Recipe 1');
      
      const itemId = useAccessibilityStore.getState().shoppingList[0].id;
      toggleShoppingItem(itemId);
      expect(useAccessibilityStore.getState().shoppingList[0].completed).toBe(true);
      
      toggleShoppingItem(itemId);
      expect(useAccessibilityStore.getState().shoppingList[0].completed).toBe(false);
    });

    it('should remove a single item', () => {
      const { addToShoppingList, removeFromShoppingList } = useAccessibilityStore.getState();
      addToShoppingList(['Item A', 'Item B'], 'Recipe');
      
      const itemId = useAccessibilityStore.getState().shoppingList[0].id;
      removeFromShoppingList(itemId);
      
      const list = useAccessibilityStore.getState().shoppingList;
      expect(list).toHaveLength(1);
      expect(list[0].name).toBe('Item B');
    });

    it('should clear the entire list', () => {
      const { addToShoppingList, clearShoppingList } = useAccessibilityStore.getState();
      addToShoppingList(['A', 'B'], 'Test');
      
      clearShoppingList();
      expect(useAccessibilityStore.getState().shoppingList).toHaveLength(0);
    });
  });

  describe('Speech Synthesis', () => {
    it('should call speechSynthesis.speak when speak action is called', () => {
      const { speak } = useAccessibilityStore.getState();
      const mockSpeak = vi.spyOn(window.speechSynthesis, 'speak');
      
      speak('Hello Chef');
      
      expect(mockSpeak).toHaveBeenCalled();
      expect(window.speechSynthesis.cancel).toHaveBeenCalled();
    });
  });

  describe('Toast Notifications', () => {
    it('should show and clear toasts', () => {
      const { showToast, clearToast } = useAccessibilityStore.getState();
      
      showToast('Task Done', 'success');
      expect(useAccessibilityStore.getState().toastMessage).toBe('Task Done');
      expect(useAccessibilityStore.getState().toastType).toBe('success');
      
      clearToast();
      expect(useAccessibilityStore.getState().toastMessage).toBe(null);
    });
  });
});
