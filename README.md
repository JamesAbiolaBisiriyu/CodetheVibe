## Prism Gallery · Luxe Product Cards

Prism Gallery is a small front‑end project that showcases a set of premium tech products using **semantic HTML**, **modern CSS (variables, animations, responsive layout)**, and **vanilla JavaScript** for interactivity. It was built as a checkpoint project to demonstrate core front‑end skills, UI polish, and problem‑solving.

---

## Features

- **Semantic layout**
  - `header` with brand logo and a theme toggle.
  - `main` section containing a `section` with a `h2` heading and individual product `article` cards.
  - `footer` with a concise summary of interactions.

- **Responsive, luxurious UI**
  - CSS variables (`:root` + `body.dark`) define a warm, luxurious palette (gold accents, cream backgrounds, deep dark mode).
  - Card grid is flexible and centers cards on all screen sizes.
  - Smooth hover states, shadows, and transitions for a refined feel.

- **Light / dark theme toggle**
  - Theme toggle button switches between light and dark modes.
  - Preference is saved to `localStorage` and also respects system `prefers-color-scheme`.

- **Animated product cards**
  - Each product card fades and slides in using an intersection observer when it enters the viewport.
  - Subtle staggered animation delays (`nth-child`) make cards appear one after another.
  - Reduced‑motion users get a non‑animated version via `prefers-reduced-motion`.

- **Interactive “Learn more” modal**
  - Each `learn more` button opens a modal dialog with:
    - Product title
    - Price
    - Short description
    - Extra “microcopy” line like **“Perfect for…”** to reward interaction
  - Luxury‑styled modal with glassy background, deep backdrop, and soft gold border.
  - Secondary ghost buttons: **Add to wishlist** and **Compare later** (visually present, ready for future wiring).
  - Accessible behavior:
    - Modal traps focus entry (focus moves to the dialog when opened).
    - Closes via close button, backdrop click, or `Escape` key.
    - Focus returns to the triggering button on close.

---

## Project structure

- `index.html` – Semantic page structure and product card markup.
- `style.css` – All styling, including:
  - Design tokens via CSS variables
  - Light/dark theme overrides
  - Card grid, hover effects, animations
  - Modal and button styling, luxury theme
- `script.js` – Behavior layer:
  - Theme toggle logic with `localStorage`
  - Intersection Observer card animations
  - Modal open/close, focus management, and content population

No build tools or frameworks are used; this is intentionally a **plain HTML/CSS/JS** project.

---

## How to run the project

You can run this project in two simple ways.

### Option 1: Open directly in a browser

1. Locate the project folder:
   - `C:\Users\paws0\Desktop\softwareDev\CodetheVibe`
2. Double‑click `index.html`  
   or right‑click `index.html` → **Open with** → your preferred browser (Chrome, Edge, etc.).

This is enough for the checkpoint; everything is pure front‑end.

### Option 2: Run a simple local server (recommended for dev)

From PowerShell:

```powershell
cd "$HOME\Desktop\softwareDev\CodetheVibe"
python -m http.server 5500
```

Then open your browser at:

```text
http://localhost:5500/
```

Press `Ctrl + C` in the terminal to stop the server.

---

## Accessibility considerations

- Uses **semantic elements** (`header`, `main`, `section`, `article`, `footer`).
- **Accessible buttons**:
  - Theme toggle has an `aria-label` and visible text.
  - “Learn more” controls are `<button>` elements, not generic spans.
- **Modal dialog**:
  - Marked with `role="dialog"` and `aria-modal="true"`.
  - Associated with its title via `aria-labelledby`.
  - Focus is moved into the dialog on open and restored on close.
  - Supports closing via Escape and backdrop/close button clicks.
- **Reduced motion support** using `prefers-reduced-motion` media query to disable entry animations for motion‑sensitive users.

---

## Possible future enhancements

- Hook up **“Add to wishlist”** / **“Compare later”** buttons to a real state store or backend.
- Add more products or categories to the gallery.
- Add keyboard focus trap within the modal (currently focus is moved in and restored, but not fully trapped).
- Extract styles into a simple design system (e.g. reusable button and card classes).

For the checkpoint, the current implementation already demonstrates strong HTML/CSS/JS skills, attention to user experience, and thoughtful problem‑solving.

