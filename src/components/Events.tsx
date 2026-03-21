"use client";

import { useLang } from "@/hooks/useLang";
import { useEffect, useState } from "react";
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

const events = [
  {
    date: "2026-04-05",
    titleEn: "Spring ESL Open House",
    titleKr: "봄 ESL 오픈 하우스",
    descEn:
      "Tour our classrooms, meet instructors, and register for spring ESL classes. All levels welcome.",
    descKr:
      "교실을 둘러보고, 강사를 만나고, 봄 ESL 수업에 등록하세요. 모든 레벨 환영합니다.",
    tag: "Education",
    tagKr: "교육",
  },
  {
    date: "2026-04-12",
    titleEn: "Immigration Workshop: Know Your Rights",
    titleKr: "이민 워크숍: 나의 권리 알기",
    descEn:
      "Free legal workshop covering immigrant rights, visa updates, and Q&A with immigration attorneys.",
    descKr:
      "이민자 권리, 비자 업데이트, 이민 변호사와의 Q&A를 다루는 무료 법률 워크숍입니다.",
    tag: "Workshop",
    tagKr: "워크숍",
  },
  {
    date: "2026-04-19",
    titleEn: "Korean Cultural Festival",
    titleKr: "한국 문화 축제",
    descEn:
      "Celebrate Korean heritage with food, music, traditional performances, and family-friendly activities.",
    descKr:
      "음식, 음악, 전통 공연, 가족 활동과 함께 한국 문화유산을 축하합니다.",
    tag: "Community",
    tagKr: "커뮤니티",
  },
  {
    date: "2026-05-03",
    titleEn: "Job Fair for Immigrant Workers",
    titleKr: "이민자 취업 박람회",
    descEn:
      "Connect with local employers. Bring your resume! Interpretation available in Korean, Mandarin, and Vietnamese.",
    descKr:
      "지역 고용주와 만나보세요. 이력서를 가져오세요! 한국어, 중국어, 베트남어 통역이 제공됩니다.",
    tag: "Career",
    tagKr: "취업",
  },
];

function formatDate(dateStr: string, isKorean: boolean) {
  const date = new Date(dateStr + "T00:00:00");
  if (isKorean) {
    return {
      month: `${date.getMonth() + 1}월`,
      day: `${date.getDate()}일`,
    };
  }
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    day: date.getDate().toString(),
  };
}

function NewsCards({ isKorean }: { isKorean: boolean }) {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data: NewsItem[]) => setNews(data))
      .catch(() => {});
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-green text-center mb-8">
        {isKorean ? "최신 뉴스" : "Latest News"}
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {news.slice(0, 6).map((item, i) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-warm-border/50 flex flex-col"
          >
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
                  {isKorean ? item.tagKr : item.tag}
                </span>
                <span className="text-[10px] text-warm-gray">
                  {item.date}
                </span>
              </div>
              <h4 className="font-bold text-green text-sm sm:text-base leading-snug mb-3 group-hover:text-terracotta transition-colors">
                {isKorean ? item.titleKr : item.titleEn}
              </h4>
              <p className="text-xs sm:text-sm text-warm-gray leading-relaxed flex-1">
                {isKorean ? item.summaryKr : item.summaryEn}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-warm-gray/70">
                  {isKorean ? "출처" : "Source"}: {item.source}
                </span>
                <span className="text-xs text-terracotta font-medium group-hover:underline">
                  {isKorean ? "자세히 보기 →" : "Read more →"}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/news-archive"
          className="inline-flex items-center gap-2 text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors border border-terracotta/30 hover:border-terracotta/60 rounded-full px-6 py-2.5"
        >
          {isKorean ? "지난 기사 보기" : "View Past Articles"}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

export default function Events() {
  const isKorean = useLang();

  return (
    <section id="events" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-terracotta font-semibold text-sm tracking-widest uppercase">
            {isKorean ? "소식 & 행사" : "News & Events"}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-green">
            {isKorean
              ? "커뮤니티 소식 & 다가오는 행사"
              : "Community News & Upcoming Events"}
          </h2>
          <div className="mt-4 w-16 h-1 bg-terracotta mx-auto rounded-full" />
        </div>

        <NewsCards isKorean={isKorean} />

        <h3 className="text-2xl font-bold text-green text-center mb-8">
          {isKorean ? "다가오는 행사" : "Upcoming Events"}
        </h3>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {events.map((event, i) => {
            const d = formatDate(event.date, isKorean);
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-warm-border/50"
              >
                <div className="flex">
                  <div className="shrink-0 w-20 sm:w-24 bg-green flex flex-col items-center justify-center text-white p-4">
                    <span className="text-xs font-medium uppercase opacity-80">
                      {d.month}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold leading-none">
                      {d.day}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 flex-1">
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full mb-2">
                      {isKorean ? event.tagKr : event.tag}
                    </span>
                    <h3 className="font-bold text-green text-sm sm:text-base leading-snug mb-2">
                      {isKorean ? event.titleKr : event.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-warm-gray leading-relaxed">
                      {isKorean ? event.descKr : event.descEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
