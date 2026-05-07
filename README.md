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
XAI_API_KEY=your_xai_api_key
```

You can find these in:
- **Supabase** → Project Settings → API
- **xAI** → [console.x.ai](https://console.x.ai)

### 4. Set up the database

Go to your **Supabase dashboard → SQL Editor → New query** and run:

```sql
create extension if not exists vector;

create table if not exists bot_config (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  bot_name text not null,
  survey jsonb not null default '{}',
  system_prompt text,
  created_at timestamptz default now()
);

create table if not exists sources (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid references bot_config(id) on delete cascade,
  name text not null,
  type text not null,
  raw_text text,
  created_at timestamptz default now()
);

create table if not exists chunks (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references sources(id) on delete cascade,
  content text not null,
  embedding vector(1536),
  metadata jsonb default '{}'
);

create index if not exists chunks_embedding_idx
  on chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create or replace function match_chunks(
  query_embedding vector(1536),
  top_k int default 3,
  p_bot_id uuid default null
)
returns table(id uuid, content text, metadata jsonb, source_id uuid, source_name text, similarity float)
language sql stable as $$
  select c.id, c.content, c.metadata, c.source_id, s.name as source_name,
    1 - (c.embedding <=> query_embedding) as similarity
  from chunks c
  join sources s on s.id = c.source_id
  where (p_bot_id is null or s.bot_id = p_bot_id)
  order by c.embedding <=> query_embedding
  limit top_k;
$$;
```

> **Already ran an older version of the SQL?** Just run this to migrate:
> ```sql
> create table if not exists bot_config (
>   id uuid primary key default gen_random_uuid(),
>   business_name text not null,
>   bot_name text not null,
>   survey jsonb not null default '{}',
>   system_prompt text,
>   created_at timestamptz default now()
> );
> alter table sources add column if not exists bot_id uuid references bot_config(id) on delete cascade;
> ```

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
```

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/build-your-bot.git
git push -u origin master
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
| `XAI_API_KEY` | Your xAI API key |

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
