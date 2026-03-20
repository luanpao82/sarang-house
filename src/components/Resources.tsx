"use client";

import { useLang } from "@/hooks/useLang";

const guides = [
  {
    titleEn: "New Immigrant Welcome Guide",
    titleKr: "신규 이민자 환영 가이드",
    descEn: "Everything you need to know about settling in Orlando.",
    descKr: "올랜도 정착에 필요한 모든 정보를 안내합니다.",
    icon: "📖",
  },
  {
    titleEn: "Know Your Rights",
    titleKr: "나의 권리 알기",
    descEn: "Legal rights for immigrants in the United States.",
    descKr: "미국 내 이민자의 법적 권리에 대한 안내입니다.",
    icon: "⚖️",
  },
  {
    titleEn: "Healthcare Access Guide",
    titleKr: "의료 서비스 이용 가이드",
    descEn: "How to access healthcare services in Central Florida.",
    descKr: "중부 플로리다에서 의료 서비스를 이용하는 방법입니다.",
    icon: "🏥",
  },
];

const communityLinks = [
  {
    titleEn: "Korean American Association of Orlando",
    titleKr: "올랜도 한인회",
    url: "#",
  },
  {
    titleEn: "Orange County Public Library",
    titleKr: "오렌지 카운티 공공 도서관",
    url: "#",
  },
  {
    titleEn: "CareerSource Central Florida",
    titleKr: "커리어소스 중부 플로리다",
    url: "#",
  },
];

const govLinks = [
  {
    titleEn: "USCIS — U.S. Citizenship & Immigration Services",
    titleKr: "USCIS — 미국 시민권 및 이민 서비스",
    url: "https://www.uscis.gov",
  },
  {
    titleEn: "Florida Department of Health",
    titleKr: "플로리다 보건부",
    url: "https://www.floridahealth.gov",
  },
  {
    titleEn: "USA.gov — Government Benefits",
    titleKr: "USA.gov — 정부 혜택",
    url: "https://www.usa.gov/benefits",
  },
];

export default function Resources() {
  const isKorean = useLang();

  return (
    <section id="resources" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-terracotta font-semibold text-sm tracking-widest uppercase">
            {isKorean ? "자료" : "Resources"}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-green">
            {isKorean ? "유용한 자료" : "Helpful Resources"}
          </h2>
          <div className="mt-4 w-16 h-1 bg-terracotta mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Downloadable Guides */}
          <div>
            <h3 className="text-lg font-bold text-green mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {isKorean ? "다운로드 가이드" : "Downloadable Guides"}
            </h3>
            <div className="space-y-3">
              {guides.map((guide, i) => (
                <a
                  key={i}
                  href="#"
                  className="group flex items-start gap-3 p-4 rounded-xl bg-cream hover:bg-terracotta/5 border border-warm-border/50 transition-all"
                >
                  <span className="text-2xl shrink-0">{guide.icon}</span>
                  <div>
                    <h4 className="font-semibold text-green text-sm group-hover:text-terracotta transition-colors">
                      {isKorean ? guide.titleKr : guide.titleEn}
                    </h4>
                    <p className="text-xs text-warm-gray mt-1">
                      {isKorean ? guide.descKr : guide.descEn}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-terracotta font-medium mt-2">
                      PDF
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-lg font-bold text-green mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {isKorean ? "커뮤니티 링크" : "Community Links"}
            </h3>
            <div className="space-y-3">
              {communityLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="group flex items-center justify-between p-4 rounded-xl bg-cream hover:bg-green/5 border border-warm-border/50 transition-all"
                >
                  <span className="font-medium text-sm text-green group-hover:text-green-light">
                    {isKorean ? link.titleKr : link.titleEn}
                  </span>
                  <svg className="w-4 h-4 text-warm-gray-light group-hover:text-green shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Government Resources */}
          <div>
            <h3 className="text-lg font-bold text-green mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {isKorean ? "정부 자료" : "Government Resources"}
            </h3>
            <div className="space-y-3">
              {govLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl bg-cream hover:bg-green/5 border border-warm-border/50 transition-all"
                >
                  <span className="font-medium text-sm text-green group-hover:text-green-light">
                    {isKorean ? link.titleKr : link.titleEn}
                  </span>
                  <svg className="w-4 h-4 text-warm-gray-light group-hover:text-green shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
