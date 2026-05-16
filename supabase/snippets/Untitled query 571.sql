create policy "Users can upload own files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'documents-private'
  AND
  auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can view own files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'documents-private'
  AND
  auth.uid()::text = (storage.foldername(name))[1]
);