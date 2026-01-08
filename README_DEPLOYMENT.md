# SaneSpace - Mental Health Support Platform with AI Integration

Welcome to **SaneSpace**, a web-based mental health support platform with an integrated AI-powered response system using Hugging Face's mental health model.

## 🎯 Overview

SaneSpace provides:
- ✅ Mental health resources and information
- ✅ Conditions A-Z directory
- ✅ Wellness exercises and books
- ✅ Community support features
- ✅ **AI-powered mental health support** (via Netlify Functions + Hugging Face)

## 🚀 Quick Start

### For Local Development

```bash
# Install dependencies
npm install

# Run local server
npm start
# Server runs on http://localhost:3000

# Run Netlify dev (for testing functions)
netlify dev
```

### For Live Deployment

All code is already deployed to:
- **Live Site**: https://sanespacenoai.netlify.app/
- **GitHub (Makins18)**: https://github.com/Makins18/sane-space
- **GitHub (adeboyejoaliyah-a09)**: https://github.com/adeboyejoaliyah-a09/sane-space

## 🤖 AI Backend Setup

### Environment Variables Required

Set these in Netlify (Site Settings → Build & deploy → Environment):

| Variable | Value | Source |
|----------|-------|--------|
| `MENTAL_HEALTH_API_URL` | `https://api-inference.huggingface.co/models/makinx/mental-health-t5` | Hugging Face |
| `MENTAL_HEALTH_API_KEY` | Your HF API token | https://huggingface.co/settings/tokens |

### Using the AI Endpoint

In any browser console on https://sanespacenoai.netlify.app/:

```javascript
// Call the AI function
await window.sendMentalHealthMessage("I'm feeling anxious", "anxiety")
```

Expected response:
```json
{
  "reply": "I understand you're feeling anxious. Here are some supportive strategies..."
}
```

## 📚 Documentation

Read these for detailed information:

- **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Step-by-step setup & verification
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Technical API reference
- **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** - Checklist & progress tracker

## 🏗️ Project Structure

```
sane-space/
├── index.html, conditions.html, wellness.html, ...  # Main pages
├── index.js                                          # Browser logic + AI helper
├── style.css                                         # Styling
├── package.json                                      # Dependencies
├── server.js                                         # Local dev server
├── netlify.toml                                      # Netlify configuration
│
├── netlify/functions/                                # Serverless functions
│   ├── mentalHealthAI.js                             # Main AI handler
│   └── src/services/
│       └── mentalHealthService.js                    # Service module
│
└── [DOCS]
    ├── SETUP_INSTRUCTIONS.md                         # Step-by-step guide
    ├── DEPLOYMENT.md                                 # Technical reference
    └── DEPLOYMENT_SUMMARY.md                         # Checklist
```

## 📦 Key Features

### Static Pages
- Home page with hero section
- Conditions A-Z reference
- Wellness tools and books
- FAQ and contact pages
- Crisis support resources

### API Endpoints

#### Mental Health AI (Netlify Function)
- **URL**: `/.netlify/functions/mentalHealthAI`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body**: `{ "message": string, "category": string }`
- **Response**: `{ "reply": string }` or error

#### Contact Form (Express server)
- **URL**: `/api/contact`
- **Method**: POST

#### Booking (Express server)
- **URL**: `/api/book`
- **Method**: POST

## 🔧 Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Server**: Node.js + Express (local dev)
- **Hosting**: Netlify (static + serverless functions)
- **AI Model**: Hugging Face `makinx/mental-health-t5`
- **Version Control**: Git + GitHub

## 📋 Deployment Checklist

- [x] Code fixes and refactoring
- [x] Netlify functions configured
- [x] Browser helper added (window.sendMentalHealthMessage)
- [x] Git submodule fixed
- [x] Documentation created
- [x] Pushed to both GitHub repos
- [ ] **[TODO] Set Netlify env vars**
- [ ] **[TODO] Trigger rebuild**
- [ ] **[TODO] Test function endpoint**
- [ ] **[TODO] Integrate AI UI into pages**

## 🧪 Testing

### Browser Console Test
```javascript
// Verify function is available
typeof window.sendMentalHealthMessage  // Should be 'function'

// Call the function
await window.sendMentalHealthMessage("I'm struggling", "stress")
  .then(r => console.log("✅", r.reply))
  .catch(e => console.error("❌", e))
```

### Network Monitoring
1. Open DevTools (F12)
2. Go to Network tab
3. Make a function call
4. Look for `mentalHealthAI` request
5. Should see 200 OK response with JSON

## 🔗 Useful Links

| Link | Purpose |
|------|---------|
| https://sanespacenoai.netlify.app/ | Live site |
| https://app.netlify.com/sites/sanespacenoai/settings/env | Netlify env settings |
| https://app.netlify.com/sites/sanespacenoai/deploys | Netlify deploy history |
| https://github.com/Makins18/sane-space | GitHub repo (Makins18) |
| https://github.com/adeboyejoaliyah-a09/sane-space | GitHub repo (adeboyejoaliyah-a09) |
| https://huggingface.co/makinx/mental-health-t5 | Hugging Face model |

## 🐛 Troubleshooting

### Function returns 500 "Missing environment variables"
- ✅ **Fix**: Set both `MENTAL_HEALTH_API_URL` and `MENTAL_HEALTH_API_KEY` in Netlify settings
- Then redeploy the site

### Function returns 502 "Upstream service error"
- Check Hugging Face API status
- Verify your API token is valid
- Model may be loading (first inference can be slow)

### CORS or 404 errors
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Check Netlify deploy logs for build errors

### Local dev not working
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Run with debug
NODE_DEBUG=* npm start
```

## 📝 Git Workflow

### Latest Commits
```
76308d5 - Add deployment summary
66c1b15 - Setup instructions  
b74fd02 - Netlify config improvements
77f2282 - Function fixes + browser helper
1cc4f79 - Remove submodule, add files
```

### Current Branches
- `main` - Production code
- `feature/ai-backend-integration` - AI integration branch (ready to merge)

### Pull Requests
- **Makins18**: PR #1 **MERGED** ✅
- **adeboyejoaliyah-a09**: PR #1 **OPEN** (awaiting review)

## 💡 Next Steps

1. **Set up Netlify env vars** (see SETUP_INSTRUCTIONS.md)
2. **Trigger a rebuild** on Netlify
3. **Test the AI function** using browser console
4. **Integrate AI UI** into your pages (examples in DEPLOYMENT.md)
5. **Customize AI responses** by modifying the prompt in mentalHealthAI.js

## 📧 Contact & Support

- **Website**: https://sanespacenoai.netlify.app/
- **Contact Form**: https://sanespacenoai.netlify.app/contact.html

## 📄 License

This project is part of the SaneSpace mental health initiative.

---

**Made with ❤️ for mental wellness | Powered by Netlify & Hugging Face**
