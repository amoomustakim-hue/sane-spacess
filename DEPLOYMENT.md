# SaneSpace Deployment Guide

## Overview
This deployment integrates a Netlify Function (`/.netlify/functions/mentalHealthAI`) with the Hugging Face `makinx/mental-health-t5` model.

## Environment Variables Required

Set these in Netlify (Site Settings > Build & deploy > Environment):

- `MENTAL_HEALTH_API_URL`: `https://api-inference.huggingface.co/models/makinx/mental-health-t5`
- `MENTAL_HEALTH_API_KEY`: Your Hugging Face API token

## Netlify Function Endpoint

**POST** `/.netlify/functions/mentalHealthAI`

**Request Body:**
```json
{
  "message": "I'm feeling anxious",
  "category": "anxiety"
}
```

**Response (Success):**
```json
{
  "reply": "supportive response from the AI model"
}
```

**Response (Error):**
```json
{
  "error": "Description of the error",
  "status": 500
}
```

## Client-Side Usage

In any HTML file that loads `index.js`, you can call:

```javascript
// Call the mental health AI function
window.sendMentalHealthMessage("I'm struggling with stress", "stress")
  .then(response => {
    console.log("AI Response:", response.reply);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

## Deployment Checklist

- [ ] Set `MENTAL_HEALTH_API_URL` in Netlify Environment
- [ ] Set `MENTAL_HEALTH_API_KEY` in Netlify Environment  
- [ ] Trigger a redeploy from Netlify UI or API
- [ ] Check deploy logs for errors
- [ ] Test function via browser console: `await window.sendMentalHealthMessage("test", "test")`
- [ ] Verify upstream response by checking Network tab in DevTools

## Troubleshooting

**Function returns 500 with "Missing environment variables":**
- Confirm both `MENTAL_HEALTH_API_URL` and `MENTAL_HEALTH_API_KEY` are set in Netlify Site Settings.
- Redeploy after adding env vars.

**Function returns 502 "Upstream service error":**
- Check if Hugging Face model is available (model may be loading or offline).
- Verify `MENTAL_HEALTH_API_KEY` is a valid HF token.
- Check Hugging Face API status: https://status.huggingface.co/

**CORS errors in browser:**
- Netlify Functions handle CORS; ensure requests originate from the same domain.
- Check browser Network tab for actual error response.

## Files Structure

```
.
├── netlify.toml                          # Netlify configuration
├── netlify/
│   └── functions/
│       ├── mentalHealthAI.js             # Main Netlify function handler
│       └── src/services/
│           └── mentalHealthService.js    # Backup service file
├── index.js                              # Browser helper: window.sendMentalHealthMessage()
├── package.json                          # Dependencies and build script
└── [HTML files]                          # All pages load index.js
```

## Monitoring

Monitor function invocations and errors in:
- Netlify UI: **Functions** tab → **mentalHealthAI**
- Netlify logs: Check build and function runtime logs for errors
- Browser DevTools: Network tab to see requests/responses

## Next Steps

1. Integrate the AI response UI into specific pages (e.g., crisis.html, wellness.html).
2. Add rate-limiting or authentication if needed.
3. Log user interactions (with privacy compliance) for model improvement.
4. Consider caching responses for common questions.
