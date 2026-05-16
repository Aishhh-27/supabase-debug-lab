## Successful JWT Test

Result:
- 200 OK from Edge Function
- JWT correctly validated
- role extracted from payload

Conclusion:
Authentication pipeline is working correctly.

## Invalid JWT Behavior

Result:
- 401 Unauthorized

Root cause:
- Token malformed or missing signature
