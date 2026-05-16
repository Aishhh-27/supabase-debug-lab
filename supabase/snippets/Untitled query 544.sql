alter policy "Users manage own docs"
on documents
using (auth.uid() = id);