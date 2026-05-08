/**
 * RecipeGallery — The "Discovery" Home Screen
 * 
 * HCI: Recognition over Recall (#6). Users can see all recipes with
 * visual icons. Functional tags allow for immediate filtering,
 * satisfying the "Flexibility & Efficiency" heuristic (#7).
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibilityStore } from '../stores/accessibilityStore';
import { recipes } from '../data/recipes';

export default function RecipeGallery() {
  const { setSelectedRecipe, filterTag, setFilterTag } = useAccessibilityStore();

  const filteredRecipes = filterTag
    ? recipes.filter((r) => r.tags.some((t) => t.label === filterTag))
    : recipes;

  const allTags = Array.from(
    new Set(recipes.flatMap((r) => r.tags.map((t) => t.label)))
  ).sort();

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* ── Category Filters (Functional Tags) ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setFilterTag(null)}
          className="px-4 py-2 rounded-full text-sm font-bold transition-all"
          style={{
            background: filterTag === null ? 'var(--accent-primary)' : 'var(--bg-card)',
            color: filterTag === null ? 'var(--bg-primary)' : 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          All Recipes
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className="px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105"
            style={{
              background: filterTag === tag ? 'var(--accent-primary)' : 'var(--bg-card)',
              color: filterTag === tag ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: `1px solid ${filterTag === tag ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ── Recipe Grid ── */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredRecipes.map((recipe) => (
            <motion.div
              layout
              key={recipe.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl p-6 cursor-pointer overflow-hidden border transition-all"
              style={{
                background: 'var(--bg-glass)',
                borderColor: 'var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
              }}
              onClick={() => setSelectedRecipe(recipe.id)}
            >
              {/* Card Background Glow */}
              <div 
                className="absolute -inset-20 bg-[radial-gradient(circle,var(--accent-glow),transparent)] opacity-0 group-hover:opacity-100 transition-opacity"
              />

              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
                  {recipe.id === 'creamy-tuscan-pasta' && '🍝'}
                  {recipe.id === 'margherita-pizza' && '🍕'}
                  {recipe.id === 'lemon-herb-chicken' && '🍗'}
                  {recipe.id === 'avocado-toast' && '🥑'}
                  {recipe.id === 'spicy-beef-tacos' && '🌮'}
                  {recipe.id === 'doro-wat' && '🍗'}
                  {recipe.id === 'misir-wat' && '🥣'}
                  {recipe.id === 'gomen-wat' && '🥬'}
                  {recipe.id === 'shiro-wat' && '🍲'}
                  {recipe.id === 'kitfo' && '🥩'}
                </div>
                
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {recipe.title}
                </h3>
                
                <p className="text-sm line-clamp-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {recipe.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag.label}
                      className="text-[10px] px-2 py-1 rounded-md uppercase tracking-wider font-bold"
                      style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
                    >
                      {tag.icon} {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-20 opacity-50">
          <p className="text-xl">No recipes found matching this tag.</p>
        </div>
      )}
    </div>
  );
}
