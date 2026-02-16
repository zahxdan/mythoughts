# MyThoughts - Quick Setup Guide

## 3-Step Setup (5 Minutes)

### Step 1: Supabase Setup (2 min)

1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project
3. **SQL Editor** → Paste `supabase-setup.sql` → **Run**
4. **Authentication → Providers** → Enable **Email**
5. **Authentication → Users → Add User** (your admin account)
6. **Settings → API** → Copy URL and anon key

### Step 2: Local Setup (2 min)

```bash
cd mythoughts
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

### Step 3: First Post (1 min)

1. Visit `http://localhost:5173`
2. Go to `/login`
3. Sign in
4. Click **Write** → Create first post!

---

## Project Overview

```
Routes:
  /             → Public feed
  /post/:id     → Read post (public)
  /login        → Admin login
  /editor       → Write/edit (protected)

Key Files:
  supabase-setup.sql    → Run this in Supabase first!
  .env.example          → Copy to .env
  src/pages/Home.jsx    → Post feed
  src/pages/PostView.jsx → Reading view
  src/pages/Editor.jsx   → Writing interface
```

---

## Design Specs

**Typography:**
- Headings: Inter (sans-serif, bold)
- Body: Merriweather (serif, elegant)

**Colors:**
- Background: Stone-50 (#fafaf9)
- Text: Slate-900 (#0f172a)
- Accents: Slate-600 (#475569)

**Layout:**
- Max width: 2xl (672px)
- Single column, centered
- Generous whitespace

---

## Database (RLS Policies)

```sql
Public Read:
  SELECT → Anyone (anon + authenticated)

Private Write:
  INSERT/UPDATE/DELETE → Authenticated only
  Must own the post (auth.uid() = user_id)
```

---

## Deploy to Cloudflare Pages

```bash
npm run build
# Upload dist/ folder to Cloudflare Pages
# Add environment variables in settings
```

---

## Troubleshooting

**Can't login?**
→ Check user exists in Supabase Dashboard

**Posts not showing?**
→ Verify RLS policies ran correctly

**Build errors?**
→ Run `npm install` again

---

For detailed docs, see **README.md**
