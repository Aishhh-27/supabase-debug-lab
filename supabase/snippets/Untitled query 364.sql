drop policy if exists "Authenticated uploads"
on storage.objects;

drop policy if exists "Authenticated reads"
on storage.objects;

drop policy if exists "Users upload own files"
on storage.objects;

drop policy if exists "Users read own files"
on storage.objects;

drop policy if exists "Broken upload policy"
on storage.objects;

drop policy if exists "Broken bucket policy"
on storage.objects;

drop policy if exists "Unsafe policy"
on storage.objects;

drop policy if exists "Owner uploads"
on storage.objects;