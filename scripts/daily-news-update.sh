#!/bin/bash
# Daily news update: fetch news, commit, push to trigger Vercel rebuild

cd "$(dirname "$0")/.."

# Pinned to 09:00 US Eastern regardless of the system timezone (machine travels).
# launchd fires this hourly; the real job runs only at 09:00 ET. Silent exit otherwise.
if [ "$(TZ='America/New_York' date +%H)" != "09" ]; then
  exit 0
fi

echo "$(date): Starting daily news update (09:00 ET)..."

# 일요일은 실행하지 않음 (0=일요일, 미 동부 기준)
if [ "$(TZ='America/New_York' date +%w)" = "0" ]; then
  echo "$(date): 일요일(ET) — 뉴스 업데이트 건너뜀"
  exit 0
fi

# Fetch news
/opt/homebrew/bin/node scripts/fetch-news.js

# Check if news.json changed
if git diff --quiet public/news.json 2>/dev/null; then
  echo "$(date): No changes to news.json"
  exit 0
fi

# Send news email (generates newsletter HTML files too)
echo "$(date): Sending news email..."
/opt/homebrew/bin/node scripts/send-news-email.js

# Commit and push (includes newsletter HTML for language switch links)
git add public/news.json public/news-archive.json public/newsletter/
git commit -m "Update daily news $(date +%Y-%m-%d)"
git push origin main

echo "$(date): News updated and pushed to GitHub. Vercel will auto-deploy."
