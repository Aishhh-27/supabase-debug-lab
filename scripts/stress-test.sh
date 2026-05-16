 #!/bin/bash

# Ensure TOKEN exists
if [ -z "$TOKEN" ]; then
  echo "ERROR: TOKEN is not set"
  exit 1
fi

URL="http://127.0.0.1:54321/functions/v1/webhook-handler"

for i in {1..50}; do
  curl -s -o /dev/null -w "%{http_code}\n" \
    "$URL" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"event":"stress.test"}'
done
