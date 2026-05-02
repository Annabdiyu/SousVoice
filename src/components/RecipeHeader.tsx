/**
 * RecipeHeader — Recipe overview with accessible tag rendering.
 * Tags use icon + text label (WCAG 1.4.1 — never color alone).
 * Hidden during Cooking Mode (progressive disclosure).
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Recipe } from '../types';

interface RecipeHeaderProps {
  recipe: Recipe;
  onStartCooking: () => void;
}

const recipeEmojis: Record<string, string> = {
  'creamy-tuscan-pasta': '🍝',
  'honey-garlic-salmon': '🐟',
  'classic-margherita-pizza': '🍕',
  'thai-green-curry': '🍛',
};

export default function RecipeHeader({ recipe, onStartCooking }: RecipeHeaderProps) {
  const tagColors: Record<string, string> = {
    allergen: 'var(--danger)',
    spiciness: 'var(--warning)',
    dietary: 'var(--success)',
    difficulty: 'var(--info)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 18 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Breadcrumb */}
      <Link
        to="/recipes"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 no-underline transition-colors"
        style={{ color: 'var(--text-muted)' }}
      >
        ← Back to Recipes
      </Link>

      {/* Hero card */}
      <div
        className="rounded-2xl overflow-hidden mb-8"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}
      >
        {/* Image area */}
        <div
          className="h-48 md:h-56 flex items-center justify-center relative overflow-hidden"
          style={{ background: 'var(--bg-elevated)' }}
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{ background: 'var(--accent-gradient)', backgroundSize: '200% 200%', animation: 'gradient-shift 6s ease infinite' }}
          />
          <motion.span
            className="text-8xl md:text-9xl relative z-10"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {recipeEmojis[recipe.id] || '🍽️'}
          </motion.span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {recipe.title}
          </h1>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            {recipe.description}
          </p>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { icon: '👥', text: `${recipe.servings} servings` },
              { icon: '🔪', text: `Prep: ${recipe.prepTime}` },
              { icon: '🔥', text: `Cook: ${recipe.cookTime}` },
              { icon: '📋', text: `${recipe.steps.length} steps` },
            ].map((m) => (
              <div
                key={m.text}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-card)' }}
              >
                <span aria-hidden="true">{m.icon}</span> {m.text}
              </div>
            ))}
          </div>

          {/* Tags (icon + text, never color alone — WCAG 1.4.1) */}
          <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Recipe tags">
            {recipe.tags.map((tag) => (
              <span
                key={tag.label}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: 'var(--bg-primary)',
                  color: tagColors[tag.type] || 'var(--text-secondary)',
                  border: `1px solid ${tagColors[tag.type] || 'var(--border-card)'}`,
                }}
                role="listitem"
              >
                <span aria-hidden="true">{tag.icon}</span>
                {tag.label}
              </span>
            ))}
          </div>

          {/* Start Cooking CTA */}
          <motion.button
            onClick={onStartCooking}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-base font-bold transition-all"
            style={{ background: 'var(--accent-gradient)', color: '#fff', boxShadow: 'var(--shadow-glow)' }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            id="btn-start-cooking"
            aria-label={`Start cooking ${recipe.title}`}
          >
            👨‍🍳 Start Cooking
          </motion.button>
        </div>
      </div>

      {/* Ingredients card */}
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}
      >
        <h2
          className="text-lg font-bold mb-5 flex items-center gap-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          🛒 Ingredients
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3" role="list">
          {recipe.ingredients.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm py-1.5"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5"
                style={{ background: 'var(--accent-glow)', color: 'var(--accent-primary)' }}
              >
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
