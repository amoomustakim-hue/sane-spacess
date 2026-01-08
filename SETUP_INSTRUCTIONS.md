# Complete Deployment Instructions for SaneSpace AI Backend

## Step 1: Set Netlify Environment Variables

### Option A: Netlify UI (Easiest)

1. Go to: https://app.netlify.com/sites/sanespacenoai/settings/env
2. Click **Add environment variable**
3. Add these two variables:

   **Variable 1:**
   - Key: `MENTAL_HEALTH_API_URL`
   - Value: `https://api-inference.huggingface.co/models/makinx/mental-health-t5`

   **Variable 2:**
   - Key: `MENTAL_HEALTH_API_KEY`
   - Value: `[YOUR_HUGGING_FACE_API_TOKEN]` (paste your HF token from https://huggingface.co/settings/tokens)

4. Click **Save**

### Option B: Netlify CLI (If installed locally)

```bash
netlify env:set MENTAL_HEALTH_API_URL "https://api-inference.huggingface.co/models/makinx/mental-health-t5"
netlify env:set MENTAL_HEALTH_API_KEY "[YOUR_HUGGING_FACE_API_TOKEN]"
```

---

## Step 2: Trigger a Rebuild & Deploy

### Option A: Netlify UI (Easiest)

1. Go to: https://app.netlify.com/sites/sanespacenoai/deploys
2. Click **Trigger deploy** → **Deploy site** or **Clear cache and deploy site**
3. Wait for the build to complete (should finish in 1-2 minutes)

### Option B: Build Hook (If configured)

If you have a build hook URL:
```bash
curl -X POST https://api.netlify.com/build_hooks/{HOOK_ID}
```

### Option C: Git Push (Automatic)

Pushing to `Makins18/sane-space` should auto-trigger a deploy if Netlify is connected.

---

## Step 3: Verify the Deployment

### Check Build Logs
1. Go to: https://app.netlify.com/sites/sanespacenoai/deploys
2. Click the latest deploy
3. Scroll to **Deploy log** and verify:
   - ✅ `Detected Netlify Functions directory`
   - ✅ `Deploying functions`
   - ✅ Build should say **Published**

### Test the Function Endpoint

Open browser DevTools (F12) on https://sanespacenoai.netlify.app/ and run:

```javascript
// Test the AI function
window.sendMentalHealthMessage("I'm feeling stressed", "stress")
  .then(r => console.log("✅ AI Response:", r))
  .catch(e => console.error("❌ Error:", e))
```

Expected console output:
```
✅ AI Response: { reply: "...supportive response..." }
```

### Check Network Tab
- Open DevTools → **Network** tab
- Reload page
- Call the function again
- Look for `mentalHealthAI` request → should be **200 OK** with JSON response

---

## Step 4: Verify GitHub Pull Requests

### Current Status:

**Repository: Makins18/sane-space**
- PR #1: feature/ai-backend-integration
- State: MERGED (already merged to main)
- Latest commit: `b74fd02` (Add Node.js version spec and deployment guide)

**Repository: adeboyejoaliyah-a09/sane-space**
- PR #1: feature/ai-backend-integration  
- State: OPEN
- Latest commit: `23b06b8` (original)

### To sync both repos:
1. On Makins18/sane-space: Changes are already merged and on main
2. On adeboyejoaliyah-a09/sane-space: The PR is open and can be merged or reviewed

---

## Step 5: Create/Update PRs (If Needed)

If you want to create a new PR on adeboyejoaliyah-a09/sane-space with the latest fixes:

```bash
# Push to origin (if you have permissions)
git push origin feature/ai-backend-integration

# Or create a new PR via GitHub UI
# Go to: https://github.com/adeboyejoaliyah-a09/sane-space/pull/new/feature/ai-backend-integration
```

---

## Files Changed in This Deployment

```
✅ netlify/functions/mentalHealthAI.js
   - Added env var validation
   - Improved error handling
   - Better upstream response parsing

✅ netlify/functions/src/services/mentalHealthService.js
   - Added env var validation
   - Removed client-side helper (moved to index.js)
   - Improved error handling

✅ index.js
   - Added browser helper: window.sendMentalHealthMessage(message, category)

✅ netlify.toml
   - Added Node.js version spec (v18)
   - Added publish and functions directories

✅ package.json
   - Added build script

✅ DEPLOYMENT.md (NEW)
   - Comprehensive deployment guide

✅ SETUP_INSTRUCTIONS.md (THIS FILE)
   - Step-by-step setup and verification
```

---

## Troubleshooting Checklist

| Issue | Solution |
|-------|----------|
| Function returns **500 Missing env vars** | ✅ Set MENTAL_HEALTH_API_URL and MENTAL_HEALTH_API_KEY in Netlify Settings, then redeploy |
| Function returns **502 Upstream error** | Check Hugging Face API status, verify token is valid |
| **CORS error** in browser | Ensure requests are from same domain (Netlify handles CORS for functions) |
| **Build fails** with submodule error | ✅ Already fixed - removed gitlink, added files as normal |
| **Function not found** (404) | Wait for deploy to complete, hard-refresh browser (Ctrl+Shift+R) |
| **Function times out** | HF model may be loading, wait 30s and retry (first inference can be slow) |

---

## Next: Integrate AI into UI

Once deployment is verified, integrate the AI response into your HTML pages:

### Example: Add AI chat to a page

```html
<div id="ai-response-box" style="display:none;">
  <p id="ai-reply"></p>
</div>

<input id="user-message" placeholder="Ask for support...">
<button onclick="askAI()">Get Support</button>

<script>
async function askAI() {
  const message = document.getElementById('user-message').value;
  try {
    const response = await window.sendMentalHealthMessage(message, 'general');
    document.getElementById('ai-reply').textContent = response.reply;
    document.getElementById('ai-response-box').style.display = 'block';
  } catch (error) {
    console.error('AI request failed:', error);
  }
}
</script>
```

---

## Final Verification Checklist

- [ ] Netlify env vars are set (MENTAL_HEALTH_API_URL, MENTAL_HEALTH_API_KEY)
- [ ] Rebuilt/redeployed site successfully
- [ ] No errors in Netlify deploy logs
- [ ] Browser function test returns valid AI response
- [ ] Both GitHub repos have latest code
- [ ] PR #1 on adeboyejoaliyah-a09/sane-space shows all AI backend changes
- [ ] Integration test: Call AI from one of the HTML pages and see response

---

**🎉 Deployment Complete!** Your mental health AI backend is live.

Questions? Check DEPLOYMENT.md for technical details or the Netlify docs: https://docs.netlify.com/functions/overview/
