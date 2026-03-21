const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'public', 'news.json');
const ARCHIVE_FILE = path.join(__dirname, '..', 'public', 'news-archive.json');
const MAX_NEWS = 5;
const IMMIGRATION_COUNT = 2;
const FLORIDA_COUNT = 3;

// Immigration news queries
const IMMIGRATION_QUERIES = [
  'Korean American immigration policy',
  'Asian American immigrant deportation visa healthcare',
];

// Florida news relevant to residents & immigrants
const FLORIDA_QUERIES = [
  'Florida immigration law policy',
  'Florida public benefit Medicaid SNAP welfare',
  'Florida tax property insurance law',
  'Florida education school policy',
  'Florida traffic driving license law',
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
  if (text.includes('tax') || text.includes('property') || text.includes('insurance'))
    return { tag: 'Tax & Finance', tagKr: '세금/재정' };
  if (text.includes('school') || text.includes('education') || text.includes('student'))
    return { tag: 'Education', tagKr: '교육' };
  if (text.includes('traffic') || text.includes('driver') || text.includes('license') || text.includes('driving'))
    return { tag: 'Transportation', tagKr: '교통' };
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
    // Google News RSS: <link/> followed by URL text
    const linkM = block.match(/<link\s*\/?>\s*(https?:\/\/[^\s<]+)/);
    const link = linkM ? linkM[1].trim() : get('link');
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
  const prompt = `You are a Korean translator for Sarang House, a Korean American community organization in Florida. Translate the following news articles for Korean-speaking immigrants. For each article, provide:
1. A Korean title (natural, not literal translation)
2. A Korean summary (2-3 sentences, explaining the news and its impact on immigrant communities)

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

async function fetchArticles(queries, maxCount, label, allCollected, maxPerQuery = maxCount) {
  const articles = [];
  for (const query of queries) {
    if (articles.length >= maxCount) break;
    const perQueryLimit = Math.min(maxPerQuery, maxCount - articles.length);
    let addedThisQuery = 0;
    console.log(`  Searching: "${query}"...`);
    try {
      const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query + ' when:7d')}&hl=en-US&gl=US&ceid=US:en`;
      const xml = await fetchUrl(rssUrl);
      const items = parseRssItems(xml);
      console.log(`    Found ${items.length} results`);

      for (const item of items) {
        if (articles.length >= maxCount || addedThisQuery >= perQueryLimit) break;
        if (!item.title || !item.link) continue;
        if (isDuplicate(allCollected, item.title) || isDuplicate(articles, item.title)) continue;

        const titleLower = item.title.toLowerCase();
        if (titleLower.includes('south korea') && !titleLower.includes('american') && !titleLower.includes('immigrant') && !titleLower.includes('u.s.')) continue;

        const tags = classifyTag(item.title, item.description);
        const source = item.source || extractSource(item.link);
        const titleClean = item.title.replace(/ - [^-]+$/, '');

        articles.push({
          date: getToday(),
          titleEn: titleClean,
          titleKr: titleClean,
          summaryEn: item.description || titleClean,
          summaryKr: item.description || titleClean,
          ...tags,
          url: item.link,
          source: source,
        });
        addedThisQuery++;
        console.log(`    [${label}] ${titleClean.substring(0, 55)}...`);
      }
    } catch (e) {
      console.error(`    Error: ${e.message}`);
    }
  }
  return articles;
}

(async () => {
  const today = getToday();
  console.log(`\n=== Daily News Fetch: ${today} ===`);
  console.log(`  Target: ${IMMIGRATION_COUNT} immigration + ${FLORIDA_COUNT} Florida\n`);

  // Fetch immigration news (2 articles)
  console.log('[Immigration News]');
  const immArticles = await fetchArticles(IMMIGRATION_QUERIES, IMMIGRATION_COUNT, 'IMM', []);

  // Fetch Florida news (3 articles, max 1 per query for diversity)
  console.log('\n[Florida News]');
  const flArticles = await fetchArticles(FLORIDA_QUERIES, FLORIDA_COUNT, 'FL', immArticles, 1);

  const allArticles = [...immArticles, ...flArticles];

  if (allArticles.length === 0) {
    console.log('\nNo new articles found.');
    return;
  }

  // Translate to Korean using claude CLI
  console.log(`\nTranslating ${allArticles.length} articles to Korean...`);
  const translations = translateWithClaude(allArticles);
  if (translations && translations.length === allArticles.length) {
    for (let i = 0; i < allArticles.length; i++) {
      allArticles[i].titleKr = translations[i].titleKr || allArticles[i].titleKr;
      allArticles[i].summaryKr = translations[i].summaryKr || allArticles[i].summaryKr;
    }
    console.log('  Translation complete.');
  } else {
    console.log('  Translation failed, using English as fallback.');
  }

  fs.writeFileSync(NEWS_FILE, JSON.stringify(allArticles, null, 2));

  // Archive: 과거 기사 누적 저장
  let archive = [];
  try { archive = JSON.parse(fs.readFileSync(ARCHIVE_FILE, 'utf8')); } catch {}
  for (const article of allArticles) {
    if (!isDuplicate(archive, article.titleEn)) {
      archive.unshift(article);
    }
  }
  fs.writeFileSync(ARCHIVE_FILE, JSON.stringify(archive, null, 2));
  console.log(`  Archive: ${archive.length} total articles`);

  console.log(`\n==========================================`);
  console.log(`  Immigration: ${immArticles.length} / Florida: ${flArticles.length}`);
  console.log(`  Total: ${allArticles.length} articles`);
  console.log(`  File: ${NEWS_FILE}`);
  console.log(`==========================================`);
  for (const a of allArticles) {
    console.log(`  [${a.tag}] ${a.titleEn.substring(0, 60)}`);
  }
  console.log('\nDone!');
})();
