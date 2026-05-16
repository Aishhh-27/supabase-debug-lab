const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'http://127.0.0.1:54321',
  'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
)

async function run() {

  // LOGIN
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: 'newuser@example.com',
      password: 'password123'
    })

  console.log('LOGIN ERROR:')
  console.log(loginError)

  // SHOW ACCESS TOKEN
  console.log('ACCESS TOKEN:')
  console.log(loginData.session.access_token)

  // QUERY DOCUMENTS
  const { data, error } = await supabase
    .from('documents')
    .select('*')

  console.log('DOCUMENTS:')
  console.log(data)

  console.log('QUERY ERROR:')
  console.log(error)
}

run()
