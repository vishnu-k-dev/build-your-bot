# Build Your Bot

A plug-and-play AI chatbot builder for small businesses. Answer 10 questions about your business, upload your content (optional), and get a fully functional AI support bot — powered by Grok (xAI) and Supabase pgvector.

---

## What it does

- **Survey-based setup** — 10 questions shape your bot's personality, tone, and behavior
- **Knowledge base** — Upload PDFs, scrape URLs, or paste FAQ text
- **RAG-powered chat** — Answers come strictly from your content, with source citations
- **Embeddable widget** — One script tag drops the bot onto any website

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend + API | Next.js 14 (App Router) |
| Database + Vector | Supabase + pgvector |
| LLM | Grok via xAI API |
| Embeddings | xAI embeddings (`text-embedding-3-small`) |
| PDF parsing | `pdf-parse` |
| URL scraping | `cheerio` |
| Styling | Tailwind CSS |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)
- An [xAI API key](https://x.ai) for Grok

---

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/build-your-bot.git
cd build-your-bot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GROQ_API_KEY=your_groq_api_key
COHERE_API_KEY=your_cohere_api_key
ADMIN_PASSWORD=pick_a_strong_password   # gates the /admin dashboard
```

You can find these in:
- **Supabase** → Project Settings → API
- **Groq** → [console.groq.com](https://console.groq.com) (chat LLM)
- **Cohere** → [dashboard.cohere.com](https://dashboard.cohere.com) (embeddings, 384-dim)
- **`ADMIN_PASSWORD`** — any secret you choose; required to open `/admin`

### 4. Set up the database

Go to your **Supabase dashboard → SQL Editor → New query**, then copy in and run the full [`supabase_setup.sql`](supabase_setup.sql). It's idempotent (safe to re-run) and creates every table the app needs: `bot_config`, `sources`, `chunks` (384-dim embeddings), `students`, `questions`, and `feedback`, plus the `match_chunks` vector-search function.

> **Already ran an older version?** Just run `supabase_setup.sql` again — it uses `create table if not exists` and `add column if not exists`, so it self-heals a `students` table that predates the `usn`/`branch`/`semester` columns and adds the newer `questions` log table without touching your data.

> **Free-tier note:** Supabase pauses inactive projects after ~1 week. A paused project makes all writes fail silently (student logins and questions won't be saved) — if data stops appearing, check the project isn't paused in the Supabase dashboard and resume it.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll land on the setup wizard.

---

## User Flow

```
/           → auto-redirects based on localStorage
/setup      → 10 survey questions → name your bot → Launch
/chat       → chat with your bot immediately
/dashboard  → (optional) upload PDFs / URLs / FAQ → Train Bot
/embed-page → get the embed script for your website
/wct        → WCT college assistant demo (student modal → chat)
/admin      → password-gated dashboard (students, questions, feedback)
```

Each student's chat history is scoped to their USN, so switching student on `/wct`
starts a fresh conversation instead of showing the previous person's chat.

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/build-your-bot.git
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `build-your-bot` repository
3. Add the following **Environment Variables**:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
| `GROQ_API_KEY` | Your Groq API key (chat LLM) |
| `COHERE_API_KEY` | Your Cohere API key (embeddings) |
| `ADMIN_PASSWORD` | Password for the `/admin` dashboard |

4. Click **Deploy** — Vercel auto-detects Next.js, no extra config needed.

---

## Embedding the bot on any website

After training your bot, go to `/embed-page` to get your snippet. Or add this manually before `</body>`:

```html
<script src="https://your-vercel-url.vercel.app/embed.js"></script>
```

This drops a floating chat button on the bottom-right of any webpage.

---

## Project Structure

```
app/
  page.tsx                  # Auto-redirects to /setup or /chat
  setup/page.tsx            # Survey wizard + bot naming
  chat/page.tsx             # Main chat interface
  dashboard/page.tsx        # Knowledge base (optional)
  embed/page.tsx            # Embeddable iframe target
  embed-page/page.tsx       # Embed code generator
  api/
    bot-config/route.ts     # Save bot config + build system prompt
    upload/route.ts         # Parse PDF / scrape URL / save FAQ
    train/route.ts          # Chunk → embed → store in pgvector
    chat/route.ts           # Vector search → Grok answer + sources
    sources/route.ts        # List and delete sources

lib/
  supabase.ts               # Supabase client (lazy init)
  xai.ts                    # xAI / Grok client
  chunker.ts                # Text chunker (2000 chars, 150 overlap)
  embedder.ts               # Embedding via xAI API
  survey.ts                 # Survey questions + system prompt builder

components/
  ChatWindow.tsx            # Chat UI with typing indicator + feedback
  SourceCard.tsx            # Source citation card
  UploadPanel.tsx           # PDF / URL / FAQ upload UI
  SourceList.tsx            # Uploaded sources list + train button

public/
  embed.js                  # Drop-in floating chat widget
supabase_setup.sql          # Full DB setup script
```

---

## License

MIT
