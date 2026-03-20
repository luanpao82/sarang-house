const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'public', 'news.json');
const MAX_NEWS = 6;

const SEARCH_QUERIES = [
  'Korean American immigration policy news',
  'immigration social welfare policy affecting Asian Americans',
  'Korean community deportation visa healthcare news',
];

function getToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function classifyTag(title, snippet) {
  const text = (title + ' ' + snippet).toLowerCase();
  if (text.includes('visa') || text.includes('비자')) return { tag: 'Visa', tagKr: '비자' };
  if (text.includes('medicaid') || text.includes('health') || text.includes('insurance') || text.includes('coverage'))
    return { tag: 'Healthcare', tagKr: '건강보험' };
  if (text.includes('ice') || text.includes('deport') || text.includes('enforcement') || text.includes('arrest'))
    return { tag: 'Immigration', tagKr: '이민' };
  if (text.includes('welfare') || text.includes('benefit') || text.includes('public charge') || text.includes('snap'))
    return { tag: 'Welfare', tagKr: '복지' };
  if (text.includes('law') || text.includes('bill') || text.includes('policy') || text.includes('regulation'))
    return { tag: 'Policy', tagKr: '정책' };
  if (text.includes('community') || text.includes('church') || text.includes('organization'))
    return { tag: 'Community', tagKr: '커뮤니티' };
  return { tag: 'News', tagKr: '뉴스' };
}

function extractSource(url) {
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      const name = parts[parts.length - 2];
      // Map common domains
      const map = {
        'nytimes': 'The New York Times',
        'washingtonpost': 'The Washington Post',
        'npr': 'NPR',
        'kff': 'KFF',
        'cnn': 'CNN',
        'bbc': 'BBC',
        'reuters': 'Reuters',
        'apnews': 'AP News',
        'koreaherald': 'The Korea Herald',
        'koreajoongangdaily': 'Korea JoongAng Daily',
        'koreatimes': 'The Korea Times',
        'asamnews': 'AsAmNews',
        'nbcnews': 'NBC News',
        'abcnews': 'ABC News',
        'cbsnews': 'CBS News',
        'politico': 'Politico',
        'thehill': 'The Hill',
        'brookings': 'Brookings',
        'migrationpolicy': 'Migration Policy Institute',
      };
      return map[name] || hostname;
    }
    return hostname;
  } catch {
    return 'Unknown';
  }
}

function isDuplicate(existing, title) {
  const normalize = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const t = normalize(title);
  return existing.some(item => {
    const e = normalize(item.titleEn);
    if (e === t) return true;
    if (t.length > 20 && e.length > 20) {
      if (e.includes(t.substring(0, 30)) || t.includes(e.substring(0, 30))) return true;
    }
    return false;
  });
}

(async () => {
  const today = getToday();
  console.log(`\n=== Daily News Fetch: ${today} ===\n`);

  // Load existing news
  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf-8'));
  } catch {}

  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled'],
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  });

  const newArticles = [];

  for (const query of SEARCH_QUERIES) {
    if (newArticles.length >= MAX_NEWS) break;

    console.log(`Searching: "${query}"...`);

    try {
      // Use Google News search
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=nws&tbs=qdr:w`;
      await page.goto(searchUrl, { waitUntil: 'load', timeout: 20000 });
      await page.waitForTimeout(3000);

      const results = await page.evaluate(() => {
        const items = [];
        // Google News results
        const articles = document.querySelectorAll('[data-news-doc-id], div.SoaBEf, div.dbsr');
        for (const article of articles) {
          const linkEl = article.querySelector('a[href]');
          const titleEl = article.querySelector('[role="heading"], .n0jPhd, .nDgy9d, .JheGif');
          const snippetEl = article.querySelector('.GI74Re, .Y3v8qd, .s3v9rd');
          const sourceEl = article.querySelector('.NUnG9d span, .WF4CUc, .CEMjEf span');

          if (linkEl && titleEl) {
            const href = linkEl.getAttribute('href') || '';
            items.push({
              title: titleEl.textContent?.trim() || '',
              url: href.startsWith('/url?q=') ? decodeURIComponent(href.split('/url?q=')[1].split('&')[0]) : href,
              snippet: snippetEl?.textContent?.trim() || '',
              source: sourceEl?.textContent?.trim() || '',
            });
          }
        }

        // Fallback: generic search results
        if (items.length === 0) {
          const genericResults = document.querySelectorAll('.g');
          for (const r of genericResults) {
            const a = r.querySelector('a[href]');
            const h3 = r.querySelector('h3');
            const desc = r.querySelector('.VwiC3b, .IsZvec');
            if (a && h3) {
              items.push({
                title: h3.textContent?.trim() || '',
                url: a.href || '',
                snippet: desc?.textContent?.trim() || '',
                source: '',
              });
            }
          }
        }

        return items;
      });

      console.log(`  Found ${results.length} results`);

      for (const r of results) {
        if (newArticles.length >= MAX_NEWS) break;
        if (!r.title || !r.url || !r.url.startsWith('http')) continue;
        if (isDuplicate(existing, r.title) || isDuplicate(newArticles, r.title)) continue;

        // Skip irrelevant results
        const titleLower = r.title.toLowerCase();
        if (titleLower.includes('south korea') && !titleLower.includes('american') && !titleLower.includes('immigrant') && !titleLower.includes('u.s.')) continue;

        const tags = classifyTag(r.title, r.snippet);
        const source = r.source || extractSource(r.url);

        // Trim snippet to ~3 sentences
        let snippet = r.snippet;
        const sentences = snippet.split(/(?<=[.!?])\s+/);
        if (sentences.length > 3) {
          snippet = sentences.slice(0, 3).join(' ');
        }

        newArticles.push({
          date: today,
          titleEn: r.title,
          titleKr: r.title, // placeholder - will be translated if possible
          summaryEn: snippet,
          summaryKr: snippet, // placeholder
          ...tags,
          url: r.url,
          source: source,
        });

        console.log(`  [NEW] ${r.title.substring(0, 60)}...`);
      }
    } catch (e) {
      console.error(`  Error: ${e.message}`);
    }

    await page.waitForTimeout(2000);
  }

  await browser.close();

  if (newArticles.length === 0) {
    console.log('\nNo new articles found.');
    return;
  }

  // Combine: new articles first, then keep recent existing (up to MAX_NEWS total)
  const combined = [...newArticles, ...existing].slice(0, MAX_NEWS);

  fs.writeFileSync(NEWS_FILE, JSON.stringify(combined, null, 2));

  console.log(`\n==========================================`);
  console.log(`  ${newArticles.length} new articles added`);
  console.log(`  Total displayed: ${combined.length}`);
  console.log(`  File: ${NEWS_FILE}`);
  console.log(`==========================================`);
  for (const a of combined) {
    console.log(`  [${a.tag}] ${a.titleEn.substring(0, 60)}`);
    console.log(`    → ${a.url.substring(0, 70)}`);
  }
  console.log('\nDone!');
})();
