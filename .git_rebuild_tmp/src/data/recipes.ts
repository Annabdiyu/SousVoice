/**
 * Sample Recipe Data
 * HCI: Each tag uses icon + text (never color alone) per WCAG 1.4.1.
 */
import type { Recipe } from '../types';

export const sampleRecipe: Recipe = {
  id: 'creamy-tuscan-pasta',
  title: 'Creamy Tuscan Sun-Dried Tomato Pasta',
  description: 'A rich, restaurant-quality pasta with sun-dried tomatoes, spinach, and a velvety garlic parmesan cream sauce.',
  servings: 4,
  prepTime: '10 min',
  cookTime: '25 min',
  tags: [
    { label: 'Contains Dairy', icon: '🥛', type: 'allergen' },
    { label: 'Contains Gluten', icon: '🌾', type: 'allergen' },
    { label: 'Mild', icon: '🌿', type: 'spiciness' },
    { label: 'Vegetarian', icon: '🥬', type: 'dietary' },
    { label: 'Intermediate', icon: '👨‍🍳', type: 'difficulty' },
  ],
  ingredients: [
    '400g penne pasta',
    '2 tbsp olive oil',
    '4 cloves garlic, minced',
    '½ cup sun-dried tomatoes, chopped',
    '3 cups fresh spinach',
    '1 cup heavy cream',
    '½ cup parmesan cheese, grated',
    '1 tsp Italian seasoning',
    'Salt & pepper to taste',
    'Fresh basil for garnish',
  ],
  steps: [
    { id: 1, instruction: 'Bring a large pot of salted water to a rolling boil. Cook the penne pasta according to package directions until al dente. Reserve ½ cup of pasta water, then drain.', tip: 'Salt the water generously — it should taste like the sea.', duration: '10 minutes', timerSeconds: 600 },
    { id: 2, instruction: 'While the pasta cooks, heat olive oil in a large skillet over medium heat. Add the minced garlic and sauté for 60 seconds until fragrant — do not let it brown.', tip: 'Low and slow with garlic prevents bitterness.', duration: '1 minute', timerSeconds: 60 },
    { id: 3, instruction: 'Add the chopped sun-dried tomatoes to the skillet and cook for 2 minutes, stirring occasionally, until they soften and release their oils.', duration: '2 minutes', timerSeconds: 120 },
    { id: 4, instruction: 'Pour in the heavy cream and stir well. Bring to a gentle simmer — avoid a full boil to prevent the cream from splitting.', tip: 'If sauce is too thick, add a splash of the reserved pasta water.', duration: '3 minutes', timerSeconds: 180 },
    { id: 5, instruction: 'Reduce heat to low. Add the grated parmesan cheese and Italian seasoning. Stir continuously until the cheese melts into a smooth, velvety sauce.', duration: '2 minutes', timerSeconds: 120 },
    { id: 6, instruction: 'Toss in the fresh spinach and stir until it wilts completely into the sauce — about 1 to 2 minutes.', duration: '2 minutes', timerSeconds: 120 },
    { id: 7, instruction: 'Add the drained pasta to the skillet and toss everything together until each piece is evenly coated in the creamy sauce.', tip: 'Use tongs for the best tossing control.' },
    { id: 8, instruction: 'Season with salt and pepper to taste. Serve immediately, garnished with fresh basil leaves and an extra sprinkle of parmesan.', tip: 'Pasta is best served right away — the sauce thickens as it cools.' },
  ],
};
