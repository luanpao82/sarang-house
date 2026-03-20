"use client";

import { useLang } from "@/hooks/useLang";

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    titleEn: "ESL / English Classes",
    titleKr: "영어 교육 (ESL)",
    descEn: "Free English language classes at all levels, from beginner to advanced conversation, taught by certified instructors.",
    descKr: "초급부터 고급 회화까지 자격을 갖춘 강사가 가르치는 무료 영어 수업을 제공합니다.",
    color: "terracotta",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    titleEn: "Immigration Document Help",
    titleKr: "이민 서류 지원",
    descEn: "Guidance with immigration paperwork, visa applications, green card renewals, and citizenship preparation.",
    descKr: "이민 서류, 비자 신청, 영주권 갱신, 시민권 준비에 대한 안내를 제공합니다.",
    color: "green",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    titleEn: "Job Readiness & Placement",
    titleKr: "취업 준비 및 취업 알선",
    descEn: "Resume writing, interview coaching, job search workshops, and connections to local employers who value diversity.",
    descKr: "이력서 작성, 면접 코칭, 구직 워크숍, 다양성을 중시하는 지역 고용주와의 연결을 제공합니다.",
    color: "terracotta",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    titleEn: "Community Counseling",
    titleKr: "커뮤니티 상담",
    descEn: "Culturally sensitive counseling services for individuals and families, including mental health support in Korean and English.",
    descKr: "한국어와 영어로 제공되는 정신 건강 지원을 포함하여 개인과 가족을 위한 문화적으로 민감한 상담 서비스를 제공합니다.",
    color: "green",
  },
];

export default function Services() {
  const isKorean = useLang();

  return (
    <section id="services" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-terracotta font-semibold text-sm tracking-widest uppercase">
            {isKorean ? "서비스" : "Our Services"}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-green">
            {isKorean ? "어떻게 도와드릴까요?" : "How We Can Help"}
          </h2>
          <p className="mt-4 text-warm-gray max-w-xl mx-auto">
            {isKorean
              ? "이민자 여러분의 새로운 시작을 돕기 위한 다양한 프로그램을 운영하고 있습니다."
              : "We offer a range of programs designed to support immigrants as they build a new life in Central Florida."}
          </p>
          <div className="mt-4 w-16 h-1 bg-terracotta mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-warm-border/50"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${
                  service.color === "terracotta"
                    ? "bg-terracotta/10 text-terracotta group-hover:bg-terracotta group-hover:text-white"
                    : "bg-green/10 text-green group-hover:bg-green group-hover:text-white"
                }`}
              >
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-green mb-3">
                {isKorean ? service.titleKr : service.titleEn}
              </h3>
              <p className="text-sm text-warm-gray leading-relaxed mb-5">
                {isKorean ? service.descKr : service.descEn}
              </p>
              <a
                href="#contact"
                className={`inline-flex items-center text-sm font-semibold transition-colors ${
                  service.color === "terracotta"
                    ? "text-terracotta hover:text-terracotta-dark"
                    : "text-green hover:text-green-light"
                }`}
              >
                {isKorean ? "자세히 보기" : "Learn More"}
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
