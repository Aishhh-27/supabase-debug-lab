create policy "own data only"
on notes
for all
using (auth.uid() = user_id);