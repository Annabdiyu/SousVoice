/**
 * SousVoice Type Definitions
 * Separated to support TypeScript verbatimModuleSyntax.
 */

export type ColorMode = 'standard' | 'protanopia' | 'high-contrast';

export interface RecipeStep {
  id: number;
  instruction: string;
  tip?: string;
  duration?: string;
  timerSeconds?: number;
}

export interface RecipeTag {
  label: string;
  icon: string;
  type: 'allergen' | 'spiciness' | 'dietary' | 'difficulty';
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  servings: number;
  prepTime: string;
  cookTime: string;
  tags: RecipeTag[];
  ingredients: string[];
  steps: RecipeStep[];
  imageUrl?: string;
}
