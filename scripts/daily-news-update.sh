#!/bin/bash
# Daily news update: fetch news, commit, push to trigger Vercel rebuild

cd /Users/seongho/Desktop/auto/sarang-house

echo "$(date): Starting daily news update..."

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
