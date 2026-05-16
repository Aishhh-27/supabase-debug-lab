create policy "Users can view own profile"
on profiles
for select
using (auth.uid() = id);