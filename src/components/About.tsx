"use client";

import { useLang } from "@/hooks/useLang";

export default function About() {
  const isKorean = useLang();

  return (
    <section id="about" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-terracotta font-semibold text-sm tracking-widest uppercase">
            {isKorean ? "소개" : "About Us"}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-green">
            {isKorean ? "사랑의 집을 소개합니다" : "Who We Are"}
          </h2>
          <div className="mt-4 w-16 h-1 bg-terracotta mx-auto rounded-full" />
        </div>

        {/* Bilingual content grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* English */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-warm-gray tracking-widest uppercase">
              <div className="w-6 h-px bg-warm-gray-light" />
              English
            </div>
            <h3 className="text-2xl font-bold text-green">
              A Community of Love
            </h3>
            <p className="text-warm-gray leading-relaxed">
              Sarang House is a community-based nonprofit organization serving
              Asian immigrants — primarily Korean-Americans — in the Orlando,
              Florida area. Founded on the belief that every immigrant deserves
              access to opportunity, we provide essential social services,
              education, and community support.
            </p>
            <p className="text-warm-gray leading-relaxed">
              &ldquo;Sarang&rdquo; means &ldquo;love&rdquo; in Korean, and that
              is the foundation of everything we do. We walk alongside our
              neighbors as they build new lives, honoring their heritage while
              helping them thrive in their new home.
            </p>
            <div className="pt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green">Our Mission</h4>
                  <p className="text-sm text-warm-gray">
                    To empower Asian immigrants through accessible services,
                    education, and advocacy so they can fully participate in and
                    contribute to their communities.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-green/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green">Who We Serve</h4>
                  <p className="text-sm text-warm-gray">
                    Asian immigrants and their families in Central Florida, with
                    a focus on the Korean-American community. All are welcome.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Korean */}
          <div className="space-y-6 font-korean">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-warm-gray tracking-widest uppercase">
              <div className="w-6 h-px bg-warm-gray-light" />
              한국어
            </div>
            <h3 className="text-2xl font-bold text-green">사랑의 공동체</h3>
            <p className="text-warm-gray leading-relaxed">
              사랑의 집은 플로리다주 올랜도 지역의 아시아 이민자 — 주로
              한인 동포 — 를 위한 지역사회 비영리 단체입니다. 모든 이민자가
              기회에 접근할 자격이 있다는 믿음을 바탕으로, 필수적인 사회
              서비스, 교육, 커뮤니티 지원을 제공합니다.
            </p>
            <p className="text-warm-gray leading-relaxed">
              &ldquo;사랑&rdquo;은 한국어로 &ldquo;Love&rdquo;를 의미하며, 이것이
              우리가 하는 모든 일의 토대입니다. 이웃들이 새로운 삶을 꾸려나갈 때
              함께 걸으며, 그들의 유산을 존중하면서 새로운 고향에서 번영할 수 있도록
              돕고 있습니다.
            </p>
            <div className="pt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-terracotta/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green">우리의 사명</h4>
                  <p className="text-sm text-warm-gray">
                    접근 가능한 서비스, 교육, 옹호를 통해 아시아 이민자들이
                    지역사회에 완전히 참여하고 기여할 수 있도록 역량을
                    강화합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-green/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green">대상</h4>
                  <p className="text-sm text-warm-gray">
                    중부 플로리다의 아시아 이민자와 그 가족, 특히 한인
                    커뮤니티를 중심으로 하되, 모든 분을 환영합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
