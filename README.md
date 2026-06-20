# ColapintoReveal

A full-screen, dark-themed hero section for Franco Colapinto — Alpine F1 driver #43.

The signature feature is a **cursor-following spotlight** that reveals a second image (Colapinto with his helmet) through a soft circular mask on top of the base photo. Move your mouse over the hero to see it in action.

## Stack

- **React 18 + TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **lucide-react**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output goes to `dist/`.

## How the spotlight works

`RevealLayer` owns its own `mousemove` listener and a `requestAnimationFrame` lerp loop. On every frame it builds a CSS `radial-gradient` string and writes it directly to `div.style.maskImage` — no React state, no canvas, no `toDataURL`. The result is fully GPU-composited and runs at 60 fps with zero re-renders on the hot path.

The lerp factor (`0.075`) gives the spotlight a cinematic trailing lag — the circle follows the cursor with a slight delay that makes the reveal feel intentional and premium.
