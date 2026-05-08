# 🍳 SousVoice — Accessibility-First Recipe Reader

![SousVoice Mockup](file:///home/ashenafi/.gemini/antigravity/brain/7ed39f80-e835-4f2c-bab2-0bb99774e657/sousvoice_mockup_design_1778654744064.png)

> **"Experience the future of hands-free cooking."**
> SousVoice is a high-fidelity React prototype designed for an **accessibility-first, voice-controlled recipe experience**. Built with advanced spring physics and a "weightless" Antigravity UI, it redefines how we interact with technology in the kitchen.

---

## ✨ Core Innovation: The Antigravity Experience

SousVoice isn't just a recipe app; it's a study in **Human-Computer Interaction (HCI)**.

- **🌌 Antigravity Focus Mode**: Navigate through steps with floating cards powered by `framer-motion` spring physics. Every interaction feels fluid, responsive, and weightless.
- **🎤 Multimodal Voice Assistant**: Total hands-free control using the Web Speech API. Start timers, navigate steps, and search recipes—all while your hands are busy cooking.
- **🧠 Cognitive Load Reduction**: Through **Progressive Disclosure**, SousVoice hides secondary UI elements during active cooking, keeping you focused on the task at hand.
- **🧩 Error Recovery**: Friendly toast notifications and manual overrides ensure that even if a voice command is misunderstood, the user remains in control.

---

## 🛠️ Modern Tech Stack

| Feature | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Voice / TTS** | [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) |
| **Build Tool** | [Vite](https://vitejs.dev/) |

---

## ♿ Inclusive Design (WCAG 2.1 Compliance)

SousVoice was built from the ground up to be accessible to everyone, following strict WCAG 2.1 guidelines:

*   **1.4.1 Use of Color**: Information is never conveyed by color alone. Tags and indicators use both text and iconography.
*   **1.4.3 Contrast (AAA)**: Includes a **High Contrast Mode** providing ≥7:1 ratios for low-vision users.
*   **1.4.4 Resize Text**: Built-in 1.5× typography scaling for improved readability.
*   **2.1.1 Keyboard Accessible**: Full navigation support via arrow keys and Escape.
*   **Color-Blind Optimization**: Three distinct modes:
    *   **Standard**: Deep Violet (#8b5cf6)
    *   **Protanopia**: Sky Blue (#38bdf8)
    *   **High Contrast**: Sharp Yellow (#ffdd00)

---

## 🎤 Command Your Kitchen

| Command | Action |
| :--- | :--- |
| `"Next"` / `"Forward"` | Advance to the next cooking step |
| `"Back"` / `"Previous"` | Revert to the previous step |
| `"Repeat"` / `"Again"` | Hear the current step read aloud |
| `"Start Timer"` | Automatically set a timer for the current step |
| `"Search [Recipe]"` | Find a specific dish in the library |
| `"Stop"` / `"Pause"` | Temporarily disable voice recognition |

---

## 🚀 Getting Started

Experience SousVoice on your local machine in seconds:

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Launch the development server**:
    ```bash
    npm run dev
    ```
3.  **Explore**: Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Architecture

```bash
src/
├── components/           # Modular UI (RecipeCards, VoiceOrb, etc.)
├── hooks/                # Voice controller logic & Speech API integration
├── stores/               # Global state for a11y & cooking flow
├── data/                 # Curated recipe library
└── index.css             # Radical design tokens & theme system
```

---

## 📚 HCI Foundations

*   **Nielsen's Heuristics**: Applied for system status visibility, user control, and consistency.
*   **Fitts's Law**: Implementation of large, generous touch targets for messy cooking scenarios.
*   **Miller's Law**: Reducing working memory demands by presenting one step at a time.

---

## 📝 License

Developed for academic purposes as part of a Human-Computer Interaction course. Built with 🍳 and 💜.
