"use client";

import { useLang } from "@/hooks/useLang";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

interface NewsItem {
  date: string;
  titleEn: string;
  titleKr: string;
  summaryEn: string;
  summaryKr: string;
  tag: string;
  tagKr: string;
  url: string;
  source: string;
}

function formatMonthLabel(yearMonth: string, isKorean: boolean) {
  const [year, month] = yearMonth.split("-");
  if (isKorean) {
    return `${year}년 ${parseInt(month)}월`;
  }
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

function formatDay(dateStr: string, isKorean: boolean) {
  const date = new Date(dateStr + "T00:00:00");
  if (isKorean) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NewsArchive() {
  const isKorean = useLang();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/news-archive.json")
      .then((res) => res.json())
      .then((data: NewsItem[]) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Group by year-month
  const grouped = news.reduce<Record<string, NewsItem[]>>((acc, item) => {
    const ym = item.date.substring(0, 7); // "2026-03"
    if (!acc[ym]) acc[ym] = [];
    acc[ym].push(item);
    return acc;
  }, {});

  const sortedMonths = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-20 bg-cream min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/#events"
              className="text-sm text-terracotta hover:underline"
            >
              &larr; {isKorean ? "메인으로 돌아가기" : "Back to Main"}
            </Link>
          </div>

          <div className="text-center mb-12">
            <span className="text-terracotta font-semibold text-sm tracking-widest uppercase">
              {isKorean ? "뉴스 아카이브" : "News Archive"}
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-green">
              {isKorean ? "지난 기사 모아보기" : "Past News Articles"}
            </h1>
            <div className="mt-4 w-16 h-1 bg-terracotta mx-auto rounded-full" />
            {!loading && (
              <p className="mt-4 text-warm-gray text-sm">
                {isKorean
                  ? `총 ${news.length}개의 기사`
                  : `${news.length} articles total`}
              </p>
            )}
          </div>

          {loading ? (
            <div className="text-center text-warm-gray py-20">
              {isKorean ? "불러오는 중..." : "Loading..."}
            </div>
          ) : news.length === 0 ? (
            <div className="text-center text-warm-gray py-20">
              {isKorean
                ? "아직 저장된 기사가 없습니다."
                : "No archived articles yet."}
            </div>
          ) : (
            <div className="space-y-12">
              {sortedMonths.map((ym) => (
                <section key={ym}>
                  <h2 className="text-xl font-bold text-green mb-4 pb-2 border-b border-warm-border">
                    {formatMonthLabel(ym, isKorean)}
                  </h2>
                  <div className="space-y-3">
                    {grouped[ym].map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block bg-white rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-warm-border/50"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 text-center min-w-[48px]">
                            <span className="text-xs text-warm-gray-light">
                              {formatDay(item.date, isKorean)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
                                {isKorean ? item.tagKr : item.tag}
                              </span>
                              <span className="text-[10px] text-warm-gray-light">
                                {item.source}
                              </span>
                            </div>
                            <h3 className="font-bold text-green text-sm sm:text-base leading-snug group-hover:text-terracotta transition-colors">
                              {isKorean ? item.titleKr : item.titleEn}
                            </h3>
                            <p className="mt-1.5 text-xs sm:text-sm text-warm-gray leading-relaxed line-clamp-2">
                              {isKorean ? item.summaryKr : item.summaryEn}
                            </p>
                          </div>
                          <span className="shrink-0 text-xs text-terracotta opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                            {isKorean ? "보기 →" : "Read →"}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
