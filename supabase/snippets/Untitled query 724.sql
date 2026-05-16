update auth.users
set email_confirmed_at = now()
where email = 'test1@example.com';