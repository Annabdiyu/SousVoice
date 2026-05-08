# 🍳 SousVoice — Accessibility-First Recipe Reader

A high-fidelity React prototype for an **accessibility-first, voice-controlled recipe reader** with physics-based "Antigravity" UI design. Built for a Human-Computer Interaction (HCI) course.

## ✨ Features

- **Antigravity Focus Mode** — One-step-at-a-time floating cards with Framer Motion spring physics and drag-to-navigate gestures
- **Multimodal Voice Assistant** — Hands-free navigation via Web Speech API ("Next", "Back", "Repeat", "Start Timer")
- **Color-Blind Optimization** — Three color modes: Standard, Protanopia (red-blind), and High Contrast (WCAG AAA)
- **Cognitive Load Reduction** — Progressive disclosure hides secondary UI during active cooking
- **Error Recovery** — Friendly toast notifications when voice commands are misunderstood, with manual override buttons

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React + TypeScript | UI framework with strict type safety |
| Vite | Build tooling and HMR |
| Tailwind CSS | Utility-first styling with rapid theme switching |
| Framer Motion | Spring-based physics animations |
| Zustand | Lightweight state management with persistence |
| Web Speech API | Voice recognition and text-to-speech |

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── RecipeCard.tsx        # Animated floating step card
│   ├── RecipeHeader.tsx      # Recipe overview with tags
│   ├── VoiceOrb.tsx          # Pulsing voice feedback indicator
│   ├── SettingsPanel.tsx     # Accessibility controls sidebar
│   ├── TimerDisplay.tsx      # Floating countdown timer
│   └── ToastNotification.tsx # Error recovery notifications
├── hooks/
│   └── useVoiceController.ts # Web Speech API integration
├── stores/
│   └── accessibilityStore.ts # Zustand state management
├── data/
│   └── recipes.ts            # Sample recipe dataset
├── types.ts                  # Shared TypeScript interfaces
├── App.tsx                   # Main layout with mode switching
├── main.tsx                  # Application entry point
└── index.css                 # Design tokens and theme system
```

## ♿ Accessibility (WCAG 2.1)

- **1.4.1 Use of Color** — All tags use icon + text labels, never color alone
- **1.4.3 Contrast** — High Contrast mode provides ≥7:1 ratios (AAA)
- **1.4.4 Resize Text** — 1.5× typography scaling toggle
- **2.1.1 Keyboard** — Full arrow key and Escape navigation
- **2.4.7 Focus Visible** — 3px accent-colored focus rings on all interactive elements

## 🎨 Color Modes

| Mode | Accent Color | Target Users |
|------|-------------|--------------|
| Standard | Violet (#8b5cf6) | General users |
| Protanopia | Sky Blue (#38bdf8) | Red-blind (deuteranopia/protanopia) |
| High Contrast | Yellow (#ffdd00) | Low-vision users |

## 🎤 Voice Commands

| Command | Action |
|---------|--------|
| "Next" / "Forward" | Go to next step |
| "Back" / "Previous" | Go to previous step |
| "Repeat" / "Again" | Read current step aloud |
| "Start Timer" | Start step countdown |
| "Stop" / "Pause" | Pause voice control |

## 📚 HCI Principles

- **Nielsen's Heuristics**: Visibility of system status (#1), User control (#3), Consistency (#4), Error prevention (#5), Flexibility (#7), Error recovery (#9)
- **Cognitive Load Theory**: Minimized extraneous load via progressive disclosure
- **Fitts's Law**: Large touch targets for cooking scenarios
- **Miller's Law**: One-step-at-a-time reduces working memory demands


