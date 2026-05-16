create policy "Authenticated reads"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'documents-public'
);