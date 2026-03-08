# 🖥️ Anjani Kumar — macOS-Style Portfolio

An interactive, macOS-inspired portfolio website built with React, featuring a dynamic backend powered by Lovable Cloud (Supabase).

**Live URL**: [mac-portfolio-magic.lovable.app](https://mac-portfolio-magic.lovable.app)

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Database Setup — Step by Step](#-database-setup--step-by-step)
- [Authentication & Admin System](#-authentication--admin-system)
- [Key Concepts Used](#-key-concepts-used)
- [Project Structure](#-project-structure)
- [Local Development](#-local-development)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui, GSAP (animations) |
| **State Management** | Zustand (UI state), TanStack Query (server state) |
| **Backend / Database** | Supabase (PostgreSQL) via Lovable Cloud |
| **Auth** | Supabase Auth (email/password) |
| **File Storage** | Supabase Storage (resume, profile photo) |
| **Routing** | React Router v6 |
| **Deployment** | Lovable Publish / Vercel |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────┐
│                  Frontend                    │
│  React + TypeScript + Tailwind + shadcn/ui  │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │ Desktop  │  │  Mobile  │  │   Admin   │ │
│  │  (macOS) │  │  (iOS)   │  │ Dashboard │ │
│  └──────────┘  └──────────┘  └───────────┘ │
│         │              │            │        │
│         └──────────────┼────────────┘        │
│                        │                     │
│              ┌─────────▼─────────┐           │
│              │  Supabase Client  │           │
│              │  (JS SDK)         │           │
│              └─────────┬─────────┘           │
└────────────────────────┼─────────────────────┘
                         │
              ┌──────────▼──────────┐
              │   Supabase Backend  │
              │                     │
              │  ┌───────────────┐  │
              │  │  PostgreSQL   │  │
              │  │  (Tables +    │  │
              │  │   RLS)        │  │
              │  └───────────────┘  │
              │  ┌───────────────┐  │
              │  │  Auth System  │  │
              │  │  (email/pwd)  │  │
              │  └───────────────┘  │
              │  ┌───────────────┐  │
              │  │   Storage     │  │
              │  │  (files/imgs) │  │
              │  └───────────────┘  │
              └─────────────────────┘
```

---

## 🗄️ Database Setup — Step by Step

### Step 1: Enable Lovable Cloud
- The project uses **Lovable Cloud** which provides a full Supabase backend automatically
- This gives you: **Database**, **Authentication**, **Storage** — no external account needed

### Step 2: Create Database Tables

Four tables were created using SQL migrations:

#### a) `projects` — Stores portfolio projects
```sql
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  technologies TEXT[],          -- PostgreSQL array type
  github_url TEXT,
  demo_url TEXT,
  display_order INTEGER DEFAULT 0,
  show_on_desktop BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### b) `achievements` — Certifications & awards
```sql
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  date TEXT NOT NULL,
  type TEXT NOT NULL,            -- 'certification', 'award', 'achievement'
  description TEXT,
  credential_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### c) `gallery` — Photo gallery images
```sql
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  src TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### d) `user_roles` — Admin role management
```sql
-- First, create a custom enum type
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)      -- One role per user
);
```

### Step 3: Row Level Security (RLS)

RLS controls **who can read/write** each table at the database level.

```sql
-- Enable RLS on each table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ: Anyone (even unauthenticated) can view
CREATE POLICY "Anyone can view projects"
  ON public.projects FOR SELECT
  USING (true);

-- ADMIN WRITE: Only users with 'admin' role can modify
CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
```

> Same pattern applied to `achievements`, `gallery`, and `user_roles` tables.

### Step 4: Security Definer Function

A helper function to check roles **without triggering recursive RLS**:

```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER              -- Runs with owner privileges, bypasses RLS
SET search_path = public      -- Prevents search_path injection
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

**Why `SECURITY DEFINER`?**
- RLS policies on `user_roles` call `has_role()`
- `has_role()` queries `user_roles`
- Without `SECURITY DEFINER`, this creates an infinite loop
- `SECURITY DEFINER` makes the function run as the DB owner, bypassing RLS

### Step 5: File Storage Bucket

```sql
-- Create a public bucket for portfolio assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true);

-- Anyone can view files
CREATE POLICY "Anyone can view portfolio assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-assets');

-- Only admins can upload/update/delete
CREATE POLICY "Admins can upload portfolio assets"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'portfolio-assets'
    AND public.has_role(auth.uid(), 'admin')
  );
```

### Step 6: Seed Initial Data

```sql
INSERT INTO public.projects (name, description, category, technologies, display_order)
VALUES
  ('Car Price Prediction', 'Regression-based ML system...', 'Machine Learning',
   ARRAY['Python','Scikit-learn','Pandas','NumPy'], 1),
  ('Dynamic Pricing Model', '...', 'Machine Learning',
   ARRAY['Python','Gradient Boosting','Pandas','Flask'], 2);

INSERT INTO public.achievements (title, organization, date, type, display_order)
VALUES
  ('AWS Certified Cloud Practitioner', 'Amazon Web Services', '2024', 'certification', 1);
```

---

## 🔐 Authentication & Admin System

### Flow
1. User navigates to `/admin` (secret route)
2. Login form appears — **no sign-up** (admin-only)
3. On sign-in, `useAuth` hook checks `user_roles` table for `admin` role
4. If admin → show dashboard; if not → "Access Denied"

### Auth Hook (`useAuth.tsx`)
```typescript
// Listens for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  setUser(session?.user ?? null);
  if (session?.user) checkAdminStatus(session.user.id);
});

// Checks admin role in database
const checkAdminStatus = async (userId: string) => {
  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .maybeSingle();
  setIsAdmin(!!data);
};
```

### Assigning Admin Role
```sql
-- After user signs up, manually assign admin role:
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid-from-auth', 'admin');
```

---

## 📚 Key Concepts Used

| Concept | What It Does | Where Used |
|---------|-------------|------------|
| **PostgreSQL** | Relational database engine | All data storage |
| **UUID** | Universally unique identifiers for primary keys | All table IDs |
| **ENUM Types** | Restricts column values to predefined set | `app_role` ('admin', 'user') |
| **Array Columns** | Store lists in a single column | `technologies TEXT[]` |
| **RLS (Row Level Security)** | Database-level access control per row | All tables |
| **SECURITY DEFINER** | Function runs with owner privileges | `has_role()` function |
| **Foreign Keys** | Referential integrity between tables | `user_roles.user_id → auth.users.id` |
| **ON DELETE CASCADE** | Auto-delete child rows when parent deleted | User deletion → roles cleanup |
| **Storage Buckets** | File upload/management system | Resume PDF, profile photos |
| **Supabase Auth** | Email/password authentication | Admin login |
| **JWT Tokens** | Session management & API auth | Every authenticated request |
| **Supabase JS Client** | Frontend SDK to query database | `supabase.from('table').select()` |
| **TanStack Query** | Server state management with caching | `useQuery`, `useMutation` |
| **Zustand** | Lightweight client state management | Window positions, open/close state |
| **React Context** | Share auth state across components | `AuthProvider` + `useAuth` |

---

## 📁 Project Structure

```
src/
├── assets/                    # Static images (profile photo, dock icons)
├── components/
│   ├── admin/                 # Admin dashboard components
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── ProjectsManager.tsx
│   │   ├── AchievementsManager.tsx
│   │   ├── GalleryManager.tsx
│   │   ├── ResumeManager.tsx
│   │   └── ProfilePhotoManager.tsx
│   ├── desktop/               # macOS desktop UI
│   │   ├── Desktop.tsx
│   │   ├── Dock.tsx
│   │   ├── MenuBar.tsx
│   │   ├── WindowWrapper.tsx
│   │   └── WelcomeScreen.tsx
│   ├── mobile/                # iOS-style mobile UI
│   │   ├── MobileHomeScreen.tsx
│   │   └── MobileWindowSheet.tsx
│   ├── windows/               # Individual window content
│   │   ├── AboutWindow.tsx
│   │   ├── FinderWindow.tsx
│   │   ├── TerminalWindow.tsx
│   │   ├── ResumeViewer.tsx
│   │   └── ...
│   └── ui/                    # shadcn/ui components
├── hooks/
│   ├── useAuth.tsx            # Authentication context & hook
│   ├── usePortfolioData.tsx   # Data fetching hooks (TanStack Query)
│   └── use-mobile.tsx         # Responsive detection
├── integrations/supabase/
│   ├── client.ts              # Auto-generated Supabase client
│   └── types.ts               # Auto-generated TypeScript types
├── stores/
│   ├── windowStore.ts         # Zustand store for window management
│   └── locationStore.ts       # Navigation state
├── pages/
│   ├── Index.tsx              # Main portfolio page
│   ├── Admin.tsx              # Admin route
│   └── NotFound.tsx
└── App.tsx                    # Root component with routing
```

---

## 💻 Local Development

```sh
# Clone the repo
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Environment Variables (auto-configured by Lovable Cloud)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...
```

---

## 🚀 Deployment

- **Lovable**: Click Publish → Update
- **Vercel**: Push to GitHub → auto-deploys (needs `vercel.json` for SPA routing)

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

Built with ❤️ using [Lovable](https://lovable.dev)
