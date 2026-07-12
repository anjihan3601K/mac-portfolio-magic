# AK Portfolio — macOS/iOS Style Portfolio OS

An immersive, dual-paradigm portfolio built by **Anjani Kumar** (AI & Data Science). The desktop experience mimics **macOS** (draggable windows, dock, menubar, genie animations) and the mobile experience mimics **iOS** (app grid, swipeable pages, bottom-sheets, haptic feedback). Powered by a **RAG-based AI Recruiter Assistant** grounded in a Pinecone vector store.

**Live:** https://mac-portfolio-magic.lovable.app

---

## ✨ Features

### Desktop (macOS-style)
- Draggable, resizable, minimizable windows with **traffic-light controls** and **genie effect** animations.
- **Dock** with real macOS-style PNG icons + magnification.
- **MenuBar** with fully-interactive dropdowns (File, Edit, View, Window, Help, Wi-Fi, Battery, Clock/Calendar, Spotlight ⌘K).
- **Desktop folders** (draggable, database-driven shortcuts).
- Persistent GSAP-animated welcome message.

### Mobile (iOS-style)
- 3-page swipeable home carousel + app grid.
- iOS-style bottom-sheet windows, glassmorphism, haptic vibration.
- Dedicated mobile About page, Gallery, and Finder hierarchy.

### Windows / Apps
- **About Me** — TextEdit-styled document.
- **Projects** — Table on desktop, list on mobile, full metadata.
- **Skills Radar Chart** — Recharts self-assessed proficiency (with legend explaining %).
- **Terminal** — CLI browsing of categorized AI/ML skills & projects.
- **Notes** — Interactive tech stack sidebar.
- **Gallery** — Supabase-driven lightbox photo gallery.
- **Achievements & Certifications** — Dynamic dedicated folder + viewer.
- **Resume Viewer** — iframe-based PDF viewer with open/download.
- **Contact** — Native `mailto:` (no server email pipeline).

### 🤖 AI Recruiter Experience
1. **AI Avatar Intro** — Clicking *About Me* triggers a fullscreen glassmorphism modal with a stylized AI avatar (breathing/blink/glow animations) that speaks a 15-second introduction via Web Speech TTS, with subtitles, mute, and skip.
2. **Recruiter Assistant** — Floating chatbot (`🤖 Recruiter Assistant`) with quick actions (Projects, Experience, Skills, Achievements, Resume, Contact).
3. **RAG-grounded answers** — Every response is retrieved from a **Pinecone** vector index of 16 curated knowledge chunks, then generated via the **Lovable AI Gateway** (`google/gemini-2.5-flash`).
4. **Fresh session** — Chat history clears on every page refresh; no persistence.

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                       Frontend (Vite + React 18)             │
│                                                              │
│  Desktop OS shell       Mobile OS shell     AI layer         │
│  ├─ WindowManager       ├─ MobileHome       ├─ AIIntroModal  │
│  ├─ Dock / MenuBar      ├─ MobileSheet      ├─ RecruiterChat │
│  └─ Windows/*           └─ MobileAbout      └─ aiStore       │
│                                                              │
│  State: Zustand (windowStore, aiStore)                       │
│  Data:  TanStack Query hooks → Supabase                      │
│  Style: Tailwind + semantic tokens + GSAP animations         │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                  Lovable Cloud (Supabase)                    │
│                                                              │
│  Postgres (RLS everywhere)                                   │
│  ├─ profiles, projects, skills, gallery, certifications      │
│  ├─ resume/photo assets in Storage                           │
│  └─ user_roles + public.has_role() SECURITY DEFINER          │
│                                                              │
│  Edge Functions (Deno)                                       │
│  ├─ recruiter-chat  → embed → Pinecone query → LLM answer    │
│  └─ seed-knowledge  → embed 16 chunks → upsert to Pinecone   │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  External services                                           │
│  ├─ Pinecone (1024-dim vector index) — knowledge base        │
│  └─ Lovable AI Gateway — embeddings + gemini-2.5-flash chat  │
└──────────────────────────────────────────────────────────────┘
```

### RAG Flow
1. User asks a question in the Recruiter Chat.
2. `recruiter-chat` edge function embeds the query via the AI Gateway (truncated to 1024 dims to match Pinecone index).
3. Top-K similar chunks are retrieved from **Pinecone**.
4. Retrieved context + system prompt (human-like, first-person Anjani persona) is sent to `google/gemini-2.5-flash`.
5. Grounded reply streamed back to the UI. Chat is session-only (no localStorage).

### Security
- **RLS on every public table** with explicit `GRANT`s.
- **Roles** stored in a separate `user_roles` table with `public.has_role(uuid, app_role)` SECURITY DEFINER to prevent recursive policies and privilege escalation.
- **Leaked-password protection (HIBP)** enabled on Supabase Auth.
- Admin dashboard `/admin` is role-gated (no public signup).

---

## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 18, Vite 5, TypeScript 5, Tailwind v3, shadcn/ui |
| State | Zustand, TanStack Query |
| Animation | GSAP, Framer Motion, CSS keyframes |
| Charts | Recharts |
| Backend | Lovable Cloud (Supabase) — Postgres, Auth, Storage, Edge Functions |
| AI | Lovable AI Gateway (Gemini 2.5 Flash + embeddings) |
| Vectors | Pinecone (1024-dim serverless index) |
| Deploy | Lovable hosting (SPA) |

---

## 📁 Project Structure

```
src/
├── assets/               # Profile photo, AI avatar, icons, wallpaper
├── components/
│   ├── ai/               # AIIntroModal, RecruiterChat
│   ├── desktop/          # WindowWrapper, Dock, MenuBar, Desktop
│   ├── mobile/           # MobileHome, MobileWindowSheet, SkillsRadarChart
│   └── windows/          # AboutWindow, ProjectsWindow, ResumeViewer, …
├── hooks/                # useGallery, useProfilePhotoUrl, useProjects, …
├── stores/               # windowStore, aiStore  (Zustand)
├── integrations/supabase # auto-generated client (do NOT edit)
└── pages/                # Index, Admin, NotFound

supabase/
├── functions/
│   ├── recruiter-chat/   # RAG chat endpoint
│   ├── seed-knowledge/   # One-shot Pinecone seeder
│   └── _shared/          # knowledge.ts (16 chunks), pinecone.ts
└── migrations/           # SQL migrations (RLS, roles, tables)
```

---

## 🚀 Local Development

```bash
npm install
npm run dev            # Vite on :8080
```

Edge functions deploy automatically via Lovable. To re-seed the knowledge base after editing `_shared/knowledge.ts`, invoke the `seed-knowledge` function.

### Required Secrets (Backend → Settings)
- `LOVABLE_API_KEY` — auto-provisioned
- `PINECONE_API_KEY`
- `PINECONE_INDEX_HOST` — e.g. `xxx.svc.aped-xxxx.pinecone.io`

---

## 🎨 Design Rules
- Semantic color/typography tokens in `src/index.css` — never hardcode `text-white`, `bg-black`, `#hex`.
- Desktop = macOS metaphors only. Mobile = iOS metaphors only. Do not cross-mix.
- Z-index: Welcome (0) < Desktop folders (10) < Windows (100+) < AI modals (9990+).

---

## 📬 Contact
**Anjani Kumar** — venkat.kanamarlapudi1906@gmail.com

Built with ❤️ on [Lovable](https://lovable.dev).
