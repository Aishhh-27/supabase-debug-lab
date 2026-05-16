create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  content text
);