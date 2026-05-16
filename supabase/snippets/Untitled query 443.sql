create policy "Authenticated uploads"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'documents-public'
);