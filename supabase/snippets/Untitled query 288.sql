create policy "Users manage own docs"
on documents
for all
using (auth.uid() = owner_id);