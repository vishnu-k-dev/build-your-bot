-- Run this in Supabase SQL Editor

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

create index if not exists chunks_embedding_idx on chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create or replace function match_chunks(query_embedding vector(1536), top_k int default 3, p_bot_id uuid default null)
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
