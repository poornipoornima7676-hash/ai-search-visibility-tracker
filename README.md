# AI Search Visibility Tracker

A lightweight tracker to monitor AI search engine visibility (ChatGPT, Claude, Gemini, etc.) for multiple websites and keywords.

---

## 🌐 Deployed App

**Vercel URL:** [https://ai-search-visibility-tracker-59wgcdc5u.vercel.app](https://ai-search-visibility-tracker-59wgcdc5u.vercel.app)

**Test Credentials:**
- Username: `testuser@example.com`
- Password: `TestPassword123`

---

## 💾 GitHub Repository

[https://github.com/poornipoornima7676-hash/ai-search-visibility-tracker](https://github.com/poornipoornima7676-hash/ai-search-visibility-tracker)

---

## 🚀 Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/poornipoornima7676-hash/ai-search-visibility-tracker.git
cd aeo-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Run the app locally:
```bash
npm run dev
```

4. Access the app at [http://localhost:3000](http://localhost:3000)

---

## 📚 Database Schema

**Tables**:

1. `users` — stores user information
   - Columns: `id`, `name`, `email`, `password_hash`

2. `websites` — stores tracked websites
   - Columns: `id`, `url`, `user_id`

3. `keywords` — stores keywords for tracking
   - Columns: `id`, `keyword`, `website_id`

4. `visibility_results` — stores AI search visibility results
   - Columns: `id`, `keyword_id`, `ai_engine`, `rank`, `timestamp`

---

## 🔒 Row Level Security (RLS) Notes

- RLS is enabled on tables to ensure users can **only access their own data**.
- Policies are applied per table:
  - `users` → each user can read their own record
  - `websites` → only accessible by the owner
  - `keywords` → restricted by website ownership
  - `visibility_results` → restricted by keyword ownership
- Seed script temporarily disables RLS during initial data insertion.

---

## 📑 Seed Script

Generates sample data for testing:
```bash
cd scripts
node seed.js
```
- Populates tables with demo users, websites, keywords, and visibility results.
- Ensure **RLS is temporarily disabled** if required.

---

## 🔧 AI Tools Used

- **GitHub Copilot**: Assisted with boilerplate code and repetitive functions.
- **Claude Code**: Debugged complex SQL queries and data transformations.
- **Cursor**: Accelerated file navigation and multi-file edits.

---

---

## ⚡ Notes

- This project is built using **Next.js**, **Supabase**, and **Vercel**.
- All credentials, seed scripts, and schema are included for testing and evaluation.
