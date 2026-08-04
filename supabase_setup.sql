-- Run this in Supabase SQL Editor (safe to re-run)

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
  embedding vector(384),
  metadata jsonb default '{}'
);

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  usn text,
  branch text,
  semester text,
  created_at timestamptz default now()
);
-- self-heal: `create table if not exists` never adds columns to a pre-existing table,
-- so a students table made before these columns existed would silently drop USN etc.
alter table students add column if not exists usn text;
alter table students add column if not exists branch text;
alter table students add column if not exists semester text;

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid,
  question text,
  created_at timestamptz default now()
);

create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  bot_id uuid references bot_config(id) on delete set null,
  question text,
  answer text,
  rating text check (rating in ('up', 'down')),
  created_at timestamptz default now()
);

create index if not exists chunks_embedding_idx on chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create or replace function match_chunks(query_embedding vector(384), top_k int default 3, p_bot_id uuid default null)
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
