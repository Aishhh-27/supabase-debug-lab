create table documents (
  id bigint generated always as identity primary key,
  owner_id uuid references auth.users(id),
  content text,
  created_at timestamptz default now()
);