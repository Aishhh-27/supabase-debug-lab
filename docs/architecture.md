# Supabase Debug Lab Architecture

## Flow

Client (Node / Python / Browser)
        ↓
Supabase Auth (JWT)
        ↓
Kong API Gateway
        ↓
Edge Function (webhook-handler)
        ↓
PostgreSQL (RLS protected tables)

## Key Components

- Auth: JWT-based authentication
- Edge Functions: serverless logic
- Database: PostgreSQL with RLS
- Storage: S3-compatible bucket
