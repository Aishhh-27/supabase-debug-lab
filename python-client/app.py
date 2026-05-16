from supabase import create_client

url = "http://127.0.0.1:54321"
key = "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH"

supabase = create_client(url, key)

# Test auth login
res = supabase.auth.sign_in_with_password({
    "email": "newuser@example.com",
    "password": "StrongPassword123!"
})

print(res)
