/**
 * HomePage — Landing page with hero, features, and call-to-action.
 * HCI: First impression matters — convey trust and capability immediately.
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: '🎤',
    title: 'Voice-First Design',
    description: 'Navigate recipes hands-free with natural voice commands. Say "Next," "Back," or "Start Timer" while your hands are busy cooking.',
    tag: 'Hands-Free',
  },
  {
    icon: '👁️',
    title: 'Color-Blind Safe',
    description: 'Three scientifically-designed color modes — Standard, Protanopia, and High Contrast — ensure every user can cook confidently.',
    tag: 'WCAG 2.1',
  },
  {
    icon: '🪐',
    title: 'Antigravity Interface',
    description: 'Physics-based floating cards with spring animations reduce cognitive load by presenting one step at a time with delightful motion.',
    tag: 'Focus Mode',
  },
  {
    icon: '⏱️',
    title: 'Built-In Timers',
    description: 'Step-aware countdown timers that trigger automatically — no more burnt garlic or overcooked pasta.',
    tag: 'Smart Timer',
  },
  {
    icon: '🔤',
    title: 'Scalable Typography',
    description: '1.5× text scaling with a single toggle. Large, legible instructions that are easy to read from across the kitchen.',
    tag: 'Low-Vision',
  },
  {
    icon: '🛡️',
    title: 'Error Recovery',
    description: 'Misheard commands trigger friendly notifications with manual override buttons — the system never leaves you stranded.',
    tag: 'Safety Net',
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } },
};

export default function HomePage() {
  const particles = useRef(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      dur: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }))
  ).current;

  return (
    <div className="relative">
      {/* Ambient particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: p.size, height: p.size,
              background: 'var(--accent-primary)', opacity: 0.08,
            }}
            animate={{ y: [0, -50, 0], x: [0, 20, -20, 0], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-15" style={{ background: 'var(--accent-primary)' }} />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-[100px] opacity-10" style={{ background: 'var(--accent-secondary)' }} />
      </div>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative z-10 min-h-[85vh] flex items-center justify-center px-6 py-20">
        <motion.div
          className="text-center max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{
                background: 'var(--accent-glow)',
                color: 'var(--accent-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--success)' }} />
              Accessibility-First Design
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span style={{ color: 'var(--text-primary)' }}>Cook with </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'var(--accent-gradient)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              Your Voice
            </span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>Not Your Fingers</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            SousVoice is an accessible recipe reader designed for everyone — featuring hands-free voice navigation, color-blind safe themes, and a physics-based focus mode that makes cooking a joy.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/recipes">
              <motion.button
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold no-underline"
                style={{
                  background: 'var(--accent-gradient)',
                  color: '#fff',
                  boxShadow: 'var(--shadow-glow)',
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                id="cta-browse-recipes"
              >
                🍽️ Browse Recipes
              </motion.button>
            </Link>
            <Link to="/recipes" className="no-underline">
              <motion.button
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold"
                style={{
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
                whileHover={{ scale: 1.04, borderColor: 'var(--accent-primary)' }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More ↓
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-8 mt-14"
          >
            {[
              { value: '3', label: 'Color Modes' },
              { value: '5+', label: 'Voice Commands' },
              { value: 'AAA', label: 'WCAG Contrast' },
              { value: '100%', label: 'Keyboard Nav' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-primary)' }}>
                  {stat.value}
                </div>
                <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ FEATURES GRID ═══════════ */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Designed for <span style={{ color: 'var(--accent-primary)' }}>Everyone</span>
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Every feature is grounded in HCI research and WCAG 2.1 accessibility standards.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="group relative rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                }}
                whileHover={{ boxShadow: 'var(--shadow-card)' }}
              >
                {/* Tag */}
                <span
                  className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-4"
                  style={{
                    background: 'var(--accent-glow)',
                    color: 'var(--accent-secondary)',
                  }}
                >
                  {f.tag}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
                >
                  {f.icon}
                </div>

                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {f.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════ CTA BANNER ═══════════ */}
      <section className="relative z-10 px-6 pb-24">
        <motion.div
          className="max-w-4xl mx-auto text-center rounded-3xl p-10 md:p-14"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        >
          <span className="text-4xl mb-4 block">👨‍🍳</span>
          <h2
            className="text-2xl sm:text-3xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Ready to Start Cooking?
          </h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Choose from our curated collection of recipes, each optimized for step-by-step voice-guided cooking.
          </p>
          <Link to="/recipes">
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold"
              style={{ background: 'var(--accent-gradient)', color: '#fff', boxShadow: 'var(--shadow-glow)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Recipes →
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
