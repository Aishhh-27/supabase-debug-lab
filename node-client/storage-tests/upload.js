const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabase = createClient(
  'http://127.0.0.1:54321',
  'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
)

async function uploadFile() {

  // LOGIN
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: 'debug1@example.com',
      password: 'password123'
    })

  console.log('LOGIN DATA:', loginData)
  console.log('LOGIN ERROR:', loginError)

  if (loginError) return

  const fileBuffer = fs.readFileSync('./test.txt')

  const { data, error } = await supabase.storage
    .from('documents-public')
    .upload('test.txt', fileBuffer, {
      contentType: 'text/plain',
      upsert: true
    })

  console.log('UPLOAD DATA:', data)
  console.log('UPLOAD ERROR:', error)
}

uploadFile()
