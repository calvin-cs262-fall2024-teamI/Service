# SwoleMate Backend API

## Request format

- All requests are sent as JSON.
- Authorization header is required for all requests. e.g. `Authorization: Bearer <token>`
- Token is generated when user logs in.

## Response Format

```json
{
  "success": true,
  "data": {
    // Response data goes here
  },
  "meta": {
    // Meta data goes here like pagination.
  },
  "msg": "relevant message, error message, etc."
}
```
