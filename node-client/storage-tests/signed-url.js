const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'http://127.0.0.1:54321',
  'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
)

async function run() {

  // LOGIN
  await supabase.auth.signInWithPassword({
    email: 'debug1@example.com',
    password: 'password123'
  })

  // LIST FILES
  const { data: files, error: listError } =
    await supabase.storage
      .from('documents-public')
      .list()

  console.log('FILES:', files)
  console.log('LIST ERROR:', listError)

  // SIGNED URL
  const { data, error } =
    await supabase.storage
      .from('documents-public')
      .createSignedUrl('missing.txt', 60)

  console.log('SIGNED URL DATA:', data)
  console.log('SIGNED URL ERROR:', error)
}

run()
