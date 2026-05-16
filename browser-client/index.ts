import { serve } from "https://deno.land/std/http/server.ts"

serve(async (req) => {
  const body = await req.json()

  return new Response(
    JSON.stringify({
      received: body
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
})
