create table profiles (
  id uuid primary key references auth.users(id),
  email text,
  role text default 'user',
  created_at timestamptz default now()
);