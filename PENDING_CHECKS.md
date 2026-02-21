## Check: Sitebuddy marklaw Iliad request (40min timeout)
- **Created:** 2026-02-21T05:00Z
- **What to check:** `ssh n@34.170.237.32 "pm2 logs groupclaude --lines 50 --nostream 2>&1 | grep marklaw | tail -20"`
- **Expected:** Should see `✅ Success` or `✅ Full pipeline complete` or `TIMEOUT after 40 min`
- **Action if done:** Tell user whether the Iliad translation completed or timed out again. If timed out, check if partial work was saved (look for `Git committed`). Then delete this check.
