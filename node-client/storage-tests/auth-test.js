const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'http://127.0.0.1:54321',
  'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
)

async function testAuth() {

  // SIGN UP
  const { data: signupData, error: signupError } =
    await supabase.auth.signUp({
      email: 'debug1@example.com',
      password: 'password123'
    })

  console.log('SIGNUP DATA:', signupData)
  console.log('SIGNUP ERROR:', signupError)

  // LOGIN
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email: 'debug1@example.com',
      password: 'password123'
    })

  console.log('LOGIN DATA:', loginData)
  console.log('LOGIN ERROR:', loginError)
}

testAuth()
