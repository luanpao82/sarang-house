#!/bin/bash
# Daily news update: fetch news, commit, push to trigger Vercel rebuild

cd /Users/seongho/Desktop/sarang-house

echo "$(date): Starting daily news update..."

# Fetch news
/opt/homebrew/bin/node scripts/fetch-news.js

# Check if news.json changed
if git diff --quiet public/news.json 2>/dev/null; then
  echo "$(date): No changes to news.json"
  exit 0
fi

# Commit and push
git add public/news.json
git commit -m "Update daily news $(date +%Y-%m-%d)"
git push origin main

echo "$(date): News updated and pushed to GitHub. Vercel will auto-deploy."
