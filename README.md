**Supabase Debugging Lab**

A full-stack backend debugging sandbox simulating real-world Supabase Support Engineering scenarios including Auth, JWT validation, Row Level Security (RLS), Storage, and Edge Functions with stress testing.

 **Overview**

This project replicates production-level issues faced in backend systems and demonstrates how to debug:

Authentication failures (JWT issues)
Edge Function authorization
RLS policy misconfigurations
Storage permission issues
Load testing with curl-based stress tools

It acts as a Support Engineer / SRE troubleshooting playground.

**Architecture**

Client (Node / Python / Browser)
        ↓
Supabase Edge Function (webhook-handler)
        ↓
JWT Validation (Auth Service)
        ↓
PostgreSQL (RLS Protected Tables)
        ↓
Storage (S3-compatible)

 **Tech Stack**

Supabase (Auth, DB, Storage, Edge Functions)
PostgreSQL (RLS policies)
Deno (Edge Functions runtime)
Node.js client
Python client
Bash scripts (stress testing)
curl (API simulation)

**Project Structure**

supabase-debug-lab/
├── browser-client/
├── node-client/
├── python-client/
├── docs/
│   ├── architecture.md
│   ├── jwt-debugging.md
│   ├── rls-debugging.md
│   ├── storage-debugging.md
│   ├── edge-functions-debugging.md
├── scripts/
│   └── stress-test.sh
├── test-matrix/
│   └── scenarios/
├── supabase/
│   ├── functions/webhook-handler/
│   ├── migrations/
├── docker-compose.yml
└── README.md

 **Features Implemented**

1. JWT Authentication Debugging

Edge Function validates Supabase JWT:

Extracts token from Authorization header
Decodes payload
Extracts:
user id
email
role

Example:

{
  "message": "JWT valid + role verified",
  "user": {
    "id": "60c82888-xxxx",
    "email": "newuser@example.com",
    "role": "authenticated"
  }
}
2. Edge Function (Webhook Handler)

Handles incoming API requests:

Validates JWT
Processes event payload
Returns structured response

Example event:

{
  "event": "test.login"
}
3. Row Level Security (RLS) Debugging

Simulates real DB access issues:

Common issue:
Empty responses due to missing SELECT policy
Example fix:
create policy "users can read own data"
on webhook_events
for select
using (auth.uid() = user_id);
4. Storage Debugging

Simulates:

Upload permission failures
Missing INSERT policies
CORS issues
Signed URL access problems
5. Stress Testing System

Bash-based load tester:

for i in {1..100}; do
  curl -s -o /dev/null -w "%{http_code}\n" \
  http://127.0.0.1:54321/functions/v1/webhook-handler \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"event":"stress.test"}'
done
 Example Test Results
Valid JWT
200 OK (100 requests)
Invalid JWT
401 Unauthorized (expected failure)
 
 **Real Support Scenarios Simulated**
 
**Scenario 1 — File Upload Fails**

Root Cause:
Missing INSERT policy in Storage bucket

**Scenario 2 — Empty API Response**

Root Cause:
RLS policy blocking SELECT queries

**Scenario 3 — Edge Function returns Invalid JWT**

Root Cause:
Malformed Authorization header or expired token

 Key Learnings
JWT structure and validation flow
Supabase Edge Function execution lifecycle
RLS policy behavior in PostgreSQL
Debugging authentication vs authorization issues
Load testing backend APIs using curl scripts

 **How to Run**

1. Start Supabase locally
supabase start
2. Generate JWT token
curl -X POST "http://127.0.0.1:54321/auth/v1/token?grant_type=password" \
-H "apikey: YOUR_KEY" \
-d '{"email":"newuser@example.com","password":"password"}'
3. Run Edge Function test
curl -i http://127.0.0.1:54321/functions/v1/webhook-handler \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{"event":"test.login"}'
4. Run stress test
bash scripts/stress-test.sh

 **Portfolio Value**

This project demonstrates:

Backend debugging skills
API authentication troubleshooting
Database security (RLS)
Production-like failure simulation
Load testing & system validation

**Future Improvements**

Grafana monitoring dashboard
Prometheus metrics for Edge Functions
CI/CD GitHub Actions tests
Automated failure injection system
Real-time debugging UI

**Author**
Aishwarya Ganesh
