# AI Chat CORS Proxy Setup

## Problem
The Hugging Face API at `https://nextgencodex-aitripplanner.hf.space` doesn't allow CORS requests from browsers, so direct fetch calls fail with CORS errors.

## Solution Options

### Option 1: Use Direct API (if CORS is enabled)
If the API supports CORS, no proxy needed. Just use it directly.

### Option 2: Run Local Proxy Server (Recommended for Development)

1. **Install dependencies:**
```bash
npm install express cors node-fetch
```

2. **Start the proxy server:**
```bash
node proxy-server.js
```

This will run on `http://localhost:3001`

3. **Enable proxy in your app:**
Create a `.env` file in the frontend directory:
```
VITE_USE_AI_PROXY=true
```

4. **Restart your dev server:**
```bash
npm run dev
```

### Option 3: Contact API Provider
Ask the Hugging Face Space owner to enable CORS by adding these headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-API-Key
```

## Testing

### Test Direct API (should work with curl):
```bash
curl -X POST "https://nextgencodex-aitripplanner.hf.space/chat" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: nextgencodex" \
  -d '{"query":"Plan a trip to Colombo"}'
```

### Test via Proxy:
```bash
curl -X POST "http://localhost:3001/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"query":"Plan a trip to Colombo"}'
```

## Current Console Logs to Check

When you test in the browser, check DevTools Console for:

- `🔧 Using proxy: true/false` - Shows if proxy is enabled
- `🌐 API Endpoint:` - Shows which endpoint is being called
- `🚫 This is likely a CORS or network error` - CORS issue detected
- `📥 Received response from AI:` - Success!

## Quick Fix

**If you see CORS errors:**

1. Open a NEW terminal (keep vite running)
2. Run: `node proxy-server.js`
3. Create `.env` file with: `VITE_USE_AI_PROXY=true`
4. Restart your vite dev server
5. Test again!
