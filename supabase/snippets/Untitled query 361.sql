create policy "Users read own files"
on storage.objects
for select
to authenticated
using (
  owner = auth.uid()
);