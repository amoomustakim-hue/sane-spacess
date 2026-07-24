# SaneSpace

AI-powered mental health companion built for Nigerians — available 24/7, in the language people actually speak.

## What it does

SaneSpace combines culturally aware conversation with structured emotional memory and a responsible safety pipeline:

- **Adaptive chat** — Listener, Coach, Explorer, Companion, and Care modes selected per message based on emotion, intent, and risk
- **Language profiles** — Nigerian Pidgin, Lagos English, Student English, Nigerian Home English, Neutral/International
- **Crisis tier system** — safe / monitor / escalate / stop, with a hard-stop UI and human handoff guidance when risk is high
- **Reasoning transparency** — each AI response shows how it was processed (language detection, risk classification, mode selection)
- **Emotional memory** — recurring triggers, resilience anchors, and mood trends surfaced on the dashboard, with live confidence scoring
- **Mood check-ins** — quick daily logging with streaks and AI-generated insight
- **Architecture demo** (`/architecture`) — a live animated walkthrough of the 8-step AI pipeline, public and unauthenticated

See [PRD_ADDENDUM_AI_READINESS.md](./PRD_ADDENDUM_AI_READINESS.md) for the full AI reasoning pipeline, risk thresholds, and evaluation metrics.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS with a CSS-variable dark mode system (`next-themes`)
- Framer Motion for animation, React Three Fiber/Drei for the landing page 3D hero
- Clerk for authentication
- Groq for LLM inference

## Local development

```bash
npm install
cp .env.example .env.local   # fill in Clerk + Groq keys
npm run dev
```

## Deploying to Vercel

1. Import this repo in Vercel.
2. Add the environment variables from `.env.example` in the Vercel project settings.
3. Deploy — no build configuration needed, Vercel auto-detects Next.js.
