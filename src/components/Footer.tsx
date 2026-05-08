/**
 * Footer — Consistent branding and accessibility statement.
 */
import { memo } from 'react';
import { Link } from 'react-router-dom';

const Footer = memo(function Footer() {
  return (
    <footer
      className="relative mt-auto"
      style={{ borderTop: '1px solid var(--border-card)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent-gradient)' }}
              >
                <span className="text-sm">🍳</span>
              </div>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                Sous<span style={{ color: 'var(--accent-primary)' }}>Voice</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              An accessibility-first recipe reader with voice control and physics-based UI design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
              Navigate
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/recipes', label: 'Browse Recipes' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm no-underline transition-colors hover:underline"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
              Accessibility
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Built to WCAG 2.1 AA/AAA standards. Supports keyboard navigation, screen readers, color-blind themes, and voice control.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid var(--border-card)', color: 'var(--text-muted)' }}
        >
          <span>© 2026 SousVoice — HCI Course Project</span>
          <span className="flex items-center gap-1.5">
            Built with <span style={{ color: 'var(--accent-primary)' }}>♥</span> for accessibility
          </span>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
