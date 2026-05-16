Deno.serve(async (req) => {
  try {
    // 1. Get Authorization header
    const authHeader = req.headers.get("Authorization") || "";

    if (!authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Missing Bearer token" }),
        { status: 401 }
      );
    }

    // 2. Extract token
    const token = authHeader.replace("Bearer ", "");

    // 3. Decode JWT payload (no verification here, Supabase already verified it at gateway level)
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    // 4. Extract user data (STEP 10 CORE)
    const role = payload.role;
    const userId = payload.sub;
    const email = payload.email;

    // 5. Validate required fields
    if (!role || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing role or userId in token" }),
        { status: 403 }
      );
    }

    // 6. Parse request body
    const body = await req.json().catch(() => ({}));
    const event = body.event || "unknown";

    // 7. OPTIONAL: store webhook event in DB (recommended final step)

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    await fetch(`${supabaseUrl}/rest/v1/webhook_events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        user_id: userId,
        email,
        role,
        event,
        created_at: new Date().toISOString(),
      }),
    });

    // 8. Response
    return new Response(
      JSON.stringify({
        message: "Webhook processed successfully",
        event,
        user: {
          id: userId,
          email,
          role,
        },
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Webhook failed",
        details: String(err),
      }),
      { status: 500 }
    );
  }
});
