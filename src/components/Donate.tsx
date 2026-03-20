"use client";

import { useLang } from "@/hooks/useLang";

export default function Donate() {
  const isKorean = useLang();

  return (
    <section id="donate" className="py-20 sm:py-28 bg-green relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-terracotta/10 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-terracotta font-semibold text-sm tracking-widest uppercase">
          {isKorean ? "후원" : "Support Us"}
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
          {isKorean
            ? "사랑의 집을 후원해 주세요"
            : "Help Us Build a Stronger Community"}
        </h2>
        <p className="mt-6 text-white/80 max-w-2xl mx-auto text-lg leading-relaxed">
          {isKorean
            ? "여러분의 후원으로 더 많은 이민자 가족들에게 교육, 법률 지원, 그리고 커뮤니티 프로그램을 제공할 수 있습니다."
            : "Your generous donation helps us provide education, legal assistance, and community programs to immigrant families who need it most."}
        </p>

        <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-lg mx-auto">
          {["$25", "$50", "$100"].map((amount) => (
            <button
              key={amount}
              className="py-3 px-6 rounded-xl bg-white/10 border border-white/20 text-white text-lg font-bold hover:bg-white/20 transition-all hover:-translate-y-0.5"
            >
              {amount}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="px-10 py-4 bg-terracotta text-white font-semibold rounded-full hover:bg-terracotta-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
          >
            {isKorean ? "지금 후원하기" : "Donate Now"}
          </a>
        </div>

        <p className="mt-8 text-white/50 text-sm">
          {isKorean
            ? "사랑의 집은 501(c)(3) 비영리 단체입니다. 모든 기부금은 세금 공제 대상입니다."
            : "Sarang House is a 501(c)(3) nonprofit. All donations are tax-deductible."}
        </p>
      </div>
    </section>
  );
}
