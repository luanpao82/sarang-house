const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'public', 'news.json');
const MAX_NEWS = 5;

const SEARCH_QUERIES = [
  'Korean American immigration policy',
  'Asian American immigrant welfare healthcare',
  'Korean community deportation visa',
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

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function parseRssItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const get = (tag) => {
      const m = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
      return m ? (m[1] || m[2] || '').trim() : '';
    };
    const title = get('title').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
    const link = get('link');
    const rawDesc = get('description');
    const description = rawDesc
      // First decode HTML entities so tags become real tags
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'").replace(/&quot;/g, '"')
      // Then strip all HTML tags
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ').trim();
    const source = get('source');
    const pubDate = get('pubDate');
    if (title && link) {
      items.push({ title, link, description, source, pubDate });
    }
  }
  return items;
}

function translateWithClaude(articles) {
  const prompt = `You are a Korean translator for a Korean American community website. Translate the following news articles' titles and summaries into Korean. The audience is Korean-speaking immigrants in the US.

For each article, provide:
1. A Korean title (natural, not literal translation)
2. A Korean summary (2-3 sentences, informative for Korean immigrant readers)

Articles:
${articles.map((a, i) => `[${i + 1}] Title: ${a.titleEn}\nSummary: ${a.summaryEn}`).join('\n\n')}

Respond in this exact JSON format (no markdown, no code blocks):
[${articles.map((_, i) => `{"titleKr": "한국어 제목 ${i + 1}", "summaryKr": "한국어 요약 ${i + 1}"}`).join(', ')}]`;

  try {
    const result = execSync(
      `/opt/homebrew/bin/claude -p ${JSON.stringify(prompt)} --model haiku`,
      { encoding: 'utf-8', timeout: 60000, maxBuffer: 1024 * 1024 }
    ).trim();
    // Extract JSON array from response
    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error(`  Translation error: ${e.message}`);
  }
  return null;
}

(async () => {
  const today = getToday();
  console.log(`\n=== Daily News Fetch: ${today} ===\n`);

  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf-8'));
  } catch {}

  const newArticles = [];

  for (const query of SEARCH_QUERIES) {
    if (newArticles.length >= MAX_NEWS) break;

    console.log(`Searching: "${query}"...`);

    try {
      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query + ' when:7d')}&hl=en-US&gl=US&ceid=US:en`;
      const xml = await fetchUrl(rssUrl);
      const items = parseRssItems(xml);

      console.log(`  Found ${items.length} results`);

      for (const item of items) {
        if (newArticles.length >= MAX_NEWS) break;
        if (!item.title || !item.link) continue;
        if (isDuplicate(existing, item.title) || isDuplicate(newArticles, item.title)) continue;

        const titleLower = item.title.toLowerCase();
        if (titleLower.includes('south korea') && !titleLower.includes('american') && !titleLower.includes('immigrant') && !titleLower.includes('u.s.')) continue;

        const tags = classifyTag(item.title, item.description);
        const source = item.source || extractSource(item.link);

        let snippet = item.description;
        const sentences = snippet.split(/(?<=[.!?])\s+/);
        if (sentences.length > 3) {
          snippet = sentences.slice(0, 3).join(' ');
        }

        newArticles.push({
          date: today,
          titleEn: item.title,
          titleKr: item.title,
          summaryEn: snippet || item.title,
          summaryKr: snippet || item.title,
          ...tags,
          url: item.link,
          source: source,
        });

        console.log(`  [NEW] ${item.title.substring(0, 60)}...`);
      }
    } catch (e) {
      console.error(`  Error: ${e.message}`);
    }
  }

  if (newArticles.length === 0) {
    console.log('\nNo new articles found.');
    return;
  }

  // Translate to Korean using claude CLI
  console.log(`\nTranslating ${newArticles.length} articles to Korean...`);
  const translations = translateWithClaude(newArticles);
  if (translations && translations.length === newArticles.length) {
    for (let i = 0; i < newArticles.length; i++) {
      newArticles[i].titleKr = translations[i].titleKr || newArticles[i].titleKr;
      newArticles[i].summaryKr = translations[i].summaryKr || newArticles[i].summaryKr;
    }
    console.log('  Translation complete.');
  } else {
    console.log('  Translation failed, using English as fallback.');
  }

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
