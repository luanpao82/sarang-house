#!/usr/bin/env node
/**
 * 오늘의 뉴스 이메일 발송 스크립트
 * - 한국어/영어 뉴스레터 HTML을 public/newsletter/에 저장
 * - 이메일 상단에 언어 선택 버튼 포함
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'public', 'news.json');
const NEWSLETTER_DIR = path.join(__dirname, '..', 'public', 'newsletter');
const SUBSCRIBERS_FILE = path.join(__dirname, 'subscribers.json');

const GMAIL_USER = 'saranghouse.orlando@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || 'xblm ijdh gzvn nizx';

const SITE_URL = 'https://saranghouse.org';

function getDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getDateLabel(lang) {
  const tz = 'America/New_York';
  if (lang === 'kr') {
    return new Date().toLocaleDateString('ko-KR', { timeZone: tz, year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
  }
  return new Date().toLocaleDateString('en-US', { timeZone: tz, year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
}

function getRecipients() {
  try {
    return JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, 'utf8'));
  } catch {
    return ['saranghouse.orlando@gmail.com'];
  }
}

function buildHtml(articles, lang, dateStr) {
  const isKr = lang === 'kr';
  const otherLang = isKr ? 'en' : 'kr';
  const dateLabel = getDateLabel(lang);
  const otherUrl = `${SITE_URL}/newsletter/${dateStr}-${otherLang}.html`;

  const t = {
    title: isKr ? '오늘의 뉴스' : "Today's News",
    switchLabel: isKr ? 'English' : '한국어',
    viewOriginal: isKr ? '원문보기 →' : 'View Original →',
    source: isKr ? '출처' : 'Source',
    archiveBtn: isKr ? '지난 기사 모아보기' : 'View Past Articles',
  };

  const articleCards = articles.map(a => `
    <tr>
      <td style="padding: 0 0 16px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; border: 1px solid #E8E0D6;">
          <tr>
            <td style="padding: 20px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #C4622D; background: rgba(196,98,45,0.1); padding: 2px 8px; border-radius: 99px;">${isKr ? a.tagKr : a.tag}</span>
                    <span style="font-size: 10px; color: #A39585; margin-left: 8px;">${a.source}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0 0 0;">
                    <a href="${a.url}" style="font-size: 16px; font-weight: 700; color: #2D5016; text-decoration: none; line-height: 1.4;">${isKr ? a.titleKr : a.titleEn}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0 0 0;">
                    <p style="font-size: 14px; color: #6B5E54; line-height: 1.7; margin: 0;">${isKr ? a.summaryKr : a.summaryEn}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0 0 0;">
                    <a href="${a.url}" style="display: inline-block; font-size: 12px; font-weight: 600; color: #C4622D; text-decoration: none; border: 1px solid rgba(196,98,45,0.3); padding: 6px 16px; border-radius: 99px;">${t.viewOriginal}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join('\n');

  return `<!DOCTYPE html>
<html lang="${isKr ? 'ko' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.title} — ${dateLabel}</title>
</head>
<body style="margin: 0; padding: 0; background: #FAF7F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #FAF7F2;">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px;">

          <!-- Header -->
          <tr>
            <td style="padding: 0 0 24px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background: #C4622D; border-radius: 50%; width: 36px; height: 36px; text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-size: 16px; font-weight: 700;">S</span>
                        </td>
                        <td style="padding-left: 10px;">
                          <span style="font-size: 18px; font-weight: 700; color: #2D5016;">Sarang House</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <a href="${otherUrl}" style="display: inline-block; font-size: 13px; font-weight: 600; color: #2D5016; text-decoration: none; border: 2px solid #2D5016; padding: 6px 18px; border-radius: 99px;">${t.switchLabel}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="padding: 0 0 8px 0;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #2D5016;">${t.title}</h1>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 0 24px 0;">
              <p style="margin: 0; font-size: 14px; color: #6B5E54;">${dateLabel}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 0 0 24px 0;">
              <div style="width: 48px; height: 3px; background: #C4622D; border-radius: 2px;"></div>
            </td>
          </tr>

          <!-- Articles -->
          ${articleCards}

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 32px 0 0 0;">
              <div style="width: 100%; height: 1px; background: #E8E0D6;"></div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 24px 0 0 0;">
              <a href="${SITE_URL}/news-archive" style="display: inline-block; font-size: 13px; font-weight: 600; color: #ffffff; background: #C4622D; text-decoration: none; padding: 10px 24px; border-radius: 99px;">${t.archiveBtn}</a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 24px 0 0 0;">
              <p style="margin: 0; font-size: 11px; color: #A39585; line-height: 1.6;">
                Sarang House &middot; Orlando, FL<br>
                <a href="${SITE_URL}" style="color: #C4622D; text-decoration: none;">saranghouse.org</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function main() {
  console.log(`[${new Date().toLocaleString('ko-KR', { timeZone: 'America/New_York' })}] 뉴스 이메일 발송 시작`);

  let articles;
  try {
    articles = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));
  } catch (e) {
    console.error('뉴스 파일 로드 실패:', e.message);
    process.exit(1);
  }

  if (!articles || articles.length === 0) {
    console.log('발송할 뉴스가 없습니다.');
    return;
  }

  const dateStr = getDateStr();

  // 한국어/영어 뉴스레터 HTML 저장
  fs.mkdirSync(NEWSLETTER_DIR, { recursive: true });
  const krHtml = buildHtml(articles, 'kr', dateStr);
  const enHtml = buildHtml(articles, 'en', dateStr);
  fs.writeFileSync(path.join(NEWSLETTER_DIR, `${dateStr}-kr.html`), krHtml);
  fs.writeFileSync(path.join(NEWSLETTER_DIR, `${dateStr}-en.html`), enHtml);
  console.log(`뉴스레터 저장: newsletter/${dateStr}-kr.html, newsletter/${dateStr}-en.html`);

  // 이메일은 한국어 버전 발송 (상단에 English 전환 버튼 포함)
  const recipients = getRecipients();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    const info = await transporter.sendMail({
      from: `"사랑의집 Sarang House" <${GMAIL_USER}>`,
      to: recipients.join(', '),
      subject: `📰 오늘의 뉴스 — ${getDateLabel('kr')}`,
      html: krHtml,
    });
    console.log(`이메일 발송 완료: ${info.messageId}`);
    console.log(`수신자: ${recipients.join(', ')}`);
  } catch (e) {
    console.error('이메일 발송 실패:', e.message);
    process.exit(1);
  }
}

main();
