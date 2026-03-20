"use client";

import { useLang } from "@/hooks/useLang";

export default function Hero() {
  const isKorean = useLang();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green via-green-light to-green" />
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-terracotta/8 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <span className="text-white/90 text-sm font-medium">
            {isKorean
              ? "🏠 올랜도 아시아 이민자 커뮤니티"
              : "🏠 Orlando Asian Immigrant Community"}
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          {isKorean ? (
            <>
              <span className="font-korean">사랑의 집에</span>
              <br />
              <span className="text-terracotta font-korean">오신 것을 환영합니다</span>
            </>
          ) : (
            <>
              Welcome to
              <br />
              <span className="text-terracotta">Sarang House</span>
            </>
          )}
        </h1>

        <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
          {isKorean
            ? "교육, 자원, 그리고 커뮤니티를 통해 아시아 이민자들에게 힘을 실어주는 곳입니다."
            : "Empowering Asian immigrants through education, resources, and community."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            className="px-8 py-3.5 bg-terracotta text-white font-semibold rounded-full hover:bg-terracotta-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            {isKorean ? "도움 받기" : "Get Help"}
          </a>
          <a
            href="#donate"
            className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-all hover:-translate-y-0.5"
          >
            {isKorean ? "후원하기" : "Donate Now"}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg
            className="w-6 h-6 text-white/50 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
