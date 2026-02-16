# MyThoughts 📝

A minimalist personal blog/journaling platform with **public reading** and **private writing**. Built with React, Tailwind CSS, and Supabase.

![Design](https://img.shields.io/badge/Design-Soft%20%26%20Manly-blue)
![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Supabase-green)

## Design Philosophy: "Medium-esque but Soft & Manly"

- **Typography**: Inter (headings) + Merriweather (body) for professional readability
- **Colors**: Stone-50 backgrounds, Slate-900 text, Slate-600 accents
- **Layout**: Single-column centered design (max-w-2xl) with generous whitespace
- **UI**: Clean, minimalist navbar—no sidebar clutter

---

## Features

✅ **Public Reading** - Anyone can browse and read your posts  
✅ **Private Writing** - Only authenticated admins can create/edit/delete  
✅ **Row-Level Security** - Database-level protection via Supabase RLS  
✅ **Clean Editor** - Distraction-free writing interface  
✅ **Responsive** - Beautiful on mobile and desktop  

---

## Quick Start

### 1. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and paste the contents of `supabase-setup.sql`
4. Click **Run** to create the table and RLS policies
5. Go to **Authentication → Providers** and enable **Email**
6. Go to **Authentication → Users** and create your admin account

### 2. Configure the Project

```bash
cd mythoughts

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: **Supabase Dashboard → Settings → API**

### 3. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

---

## Project Structure

```
mythoughts/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top nav with login/write toggle
│   │   └── ProtectedRoute.jsx  # Auth wrapper
│   ├── pages/
│   │   ├── Home.jsx            # Public post feed
│   │   ├── PostView.jsx        # Full post view
│   │   ├── Login.jsx           # Admin login
│   │   └── Editor.jsx          # Writing interface
│   ├── hooks/
│   │   └── useAuth.js          # Authentication hook
│   ├── lib/
│   │   └── supabase.js         # Supabase client
│   ├── App.jsx                 # Main app with routes
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind + custom styles
├── supabase-setup.sql          # Database schema & RLS
└── package.json
```

---

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Homepage with post feed |
| `/post/:id` | Public | Read individual post |
| `/login` | Public | Admin login page |
| `/editor` | Protected | Create/edit posts |

---

## How It Works

### Public vs Private Access

**Public (Unauthenticated):**
- ✅ View all published posts
- ✅ Read full post content
- ❌ No edit/delete buttons visible

**Admin (Authenticated):**
- ✅ All public access
- ✅ "Write" button in navbar
- ✅ "Edit" links on all posts
- ✅ Create/edit/delete posts

### Database Security

Row-Level Security (RLS) policies enforce access control:

```sql
-- Anyone can read
SELECT: TO anon, authenticated USING (true)

-- Only authenticated users can write
INSERT/UPDATE/DELETE: TO authenticated WHERE auth.uid() = user_id
```

---

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder ready for deployment.

### Deploy to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
2. Create a new project
3. Connect your Git repository OR upload the `dist/` folder
4. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy!

Your site will be live at `https://your-project.pages.dev`

### Other Hosting Options

- **Vercel**: Connect repo → Deploy
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` branch

---

## Customization

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  paper: '#fafaf9',    // Background
  ink: '#0f172a',      // Text
  accent: '#475569',   // Buttons/links
}
```

### Change Fonts

Edit `src/index.css` to import different fonts, then update `tailwind.config.js`:

```js
fontFamily: {
  'sans': ['Your-Sans-Font', 'system-ui', 'sans-serif'],
  'serif': ['Your-Serif-Font', 'Georgia', 'serif'],
}
```

### Adjust Layout Width

Edit `max-w-2xl` in components to `max-w-3xl`, `max-w-4xl`, etc.

---

## Usage Guide

### Create Your First Post

1. Go to `/login` and sign in
2. Click **Write** in the navbar
3. Enter your title and content
4. Click **Publish**

### Edit a Post

1. From the homepage, click **Edit** on any post
2. Make your changes
3. Click **Publish** to save

### Delete a Post

1. Open the post you want to delete
2. Click **Delete Post** at the bottom
3. Confirm deletion

---

## Troubleshooting

### Can't Log In

- Verify you created a user in Supabase Dashboard
- Check that Email auth provider is enabled
- Ensure `.env` has correct credentials

### Posts Not Showing

- Check Supabase Table Editor for existing posts
- Verify RLS policies were created correctly
- Check browser console for errors

### Build Errors

- Run `npm install` to ensure dependencies are installed
- Check Node.js version (18+ required)
- Verify all environment variables are set

---

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Backend (PostgreSQL + Auth)
- **React Router** - Client-side routing

---

## Roadmap

- [ ] Markdown support in editor
- [ ] Draft vs Published toggle
- [ ] Tags/categories
- [ ] Search functionality
- [ ] Dark mode
- [ ] RSS feed
- [ ] Reading time estimates
- [ ] Comments system

---

## License

MIT License - Free to use for personal projects!

---

Built with ❤️ using React, Tailwind CSS, and Supabase.
