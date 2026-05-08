/**
 * RecipeHeader — Recipe overview displayed before Cooking Mode
 *
 * HCI: Shows all metadata (tags, ingredients, times) upfront so users
 * can prepare before cooking. This is hidden in Cooking Mode to reduce
 * cognitive load ("Progressive Disclosure").
 *
 * Tags use icon + text label (WCAG 1.4.1 — never color alone).
 */
import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Recipe } from '../types';

interface RecipeHeaderProps {
  recipe: Recipe;
  onStartCooking: () => void;
  onBack: () => void;
}

const RecipeHeader = memo(function RecipeHeader({ recipe, onStartCooking, onBack }: RecipeHeaderProps) {
  const tagStyles: Record<string, string> = {
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
      {/* ── Back Navigation (HCI: Contextual Navigation) ── */}
      <motion.button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 text-sm font-bold opacity-60 hover:opacity-100 transition-all hover:-translate-x-1"
        style={{ color: 'var(--text-secondary)' }}
        aria-label="Return to recipe discovery"
      >
        ← Back to Discovery
      </motion.button>

      {/* ── Title Section ── */}
      <div className="text-center mb-8">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-3 leading-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
        >
          {recipe.title}
        </motion.h1>
        <p
          className="text-lg leading-relaxed max-w-xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          {recipe.description}
        </p>
      </div>

      {/* ── Metadata Chips ── */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <MetaChip icon="👥" label={`${recipe.servings} servings`} />
        <MetaChip icon="🔪" label={`Prep: ${recipe.prepTime}`} />
        <MetaChip icon="🔥" label={`Cook: ${recipe.cookTime}`} />
      </div>

      {/* ── Tags (icon + text, never color alone per WCAG 1.4.1) ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-8" role="list" aria-label="Recipe tags">
        {recipe.tags.map((tag) => (
          <span
            key={tag.label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: 'var(--bg-card)',
              color: tagStyles[tag.type] || 'var(--text-secondary)',
              border: `1px solid ${tagStyles[tag.type] || 'var(--border-subtle)'}`,
            }}
            role="listitem"
          >
            <span aria-hidden="true">{tag.icon}</span>
            {tag.label}
          </span>
        ))}
      </div>

      {/* ── Ingredients ── */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <h2
          className="text-lg font-bold mb-4 flex items-center gap-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          🛒 Ingredients
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2" role="list">
          {recipe.ingredients.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span style={{ color: 'var(--accent-primary)' }}>•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Start Cooking CTA ── */}
      <div className="text-center">
        <motion.button
          onClick={onStartCooking}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-lg font-bold transition-all"
          style={{
            background: 'var(--accent-primary)',
            color: 'var(--bg-primary)',
            boxShadow: '0 8px 30px var(--accent-glow)',
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          id="btn-start-cooking"
          aria-label={`Start cooking ${recipe.title} — ${recipe.steps.length} steps`}
        >
          👨‍🍳 Start Cooking
          <span className="text-sm font-normal opacity-80">
            ({recipe.steps.length} steps)
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
});

export default RecipeHeader;

function MetaChip({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
      style={{
        background: 'var(--bg-card)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </div>
  );
}
