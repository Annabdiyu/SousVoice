/**
 * BrowsePage — Recipe grid browser.
 * HCI: Card-based scanning reduces search time (Hick's Law).
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { recipes } from '../data/recipes';

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } },
};

const recipeEmojis: Record<string, string> = {
  'creamy-tuscan-pasta': '🍝',
  'honey-garlic-salmon': '🐟',
  'classic-margherita-pizza': '🍕',
  'thai-green-curry': '🍛',
};

export default function BrowsePage() {
  return (
    <div className="relative z-10 min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Recipe <span style={{ color: 'var(--accent-primary)' }}>Collection</span>
          </h1>
          <p className="text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Each recipe is designed for step-by-step voice-guided cooking with full accessibility support.
          </p>
        </motion.div>

        {/* Recipe Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {recipes.map((recipe) => (
            <motion.div key={recipe.id} variants={fadeUp}>
              <Link to={`/recipe/${recipe.id}`} className="block no-underline group">
                <motion.article
                  className="relative rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: 'var(--shadow-float)',
                    borderColor: 'var(--border-active)',
                  }}
                >
                  {/* Card image placeholder with emoji and gradient */}
                  <div
                    className="h-44 flex items-center justify-center relative overflow-hidden"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'var(--accent-gradient)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-shift 6s ease infinite',
                      }}
                    />
                    <span className="text-7xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {recipeEmojis[recipe.id] || '🍽️'}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {recipe.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.label}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                          style={{
                            background: 'var(--bg-elevated)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-card)',
                          }}
                        >
                          <span aria-hidden="true">{tag.icon}</span>
                          {tag.label}
                        </span>
                      ))}
                    </div>

                    <h2
                      className="text-xl font-bold mb-2 group-hover:text-[var(--accent-primary)] transition-colors"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                    >
                      {recipe.title}
                    </h2>
                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {recipe.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span className="flex items-center gap-1">
                        <span aria-hidden="true">👥</span> {recipe.servings} servings
                      </span>
                      <span className="flex items-center gap-1">
                        <span aria-hidden="true">🔪</span> {recipe.prepTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <span aria-hidden="true">🔥</span> {recipe.cookTime}
                      </span>
                      <span className="ml-auto flex items-center gap-1 font-semibold" style={{ color: 'var(--accent-primary)' }}>
                        {recipe.steps.length} steps →
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
