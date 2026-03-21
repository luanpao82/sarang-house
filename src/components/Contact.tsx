"use client";

import { useLang } from "@/hooks/useLang";

export default function Contact() {
  const isKorean = useLang();

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-terracotta font-semibold text-sm tracking-widest uppercase">
            {isKorean ? "연락처" : "Contact Us"}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-green">
            {isKorean ? "연락해 주세요" : "Get in Touch"}
          </h2>
          <div className="mt-4 w-16 h-1 bg-terracotta mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-warm-gray leading-relaxed text-lg">
              {isKorean
                ? "질문이 있으시거나 도움이 필요하시면 언제든지 연락해 주세요. 한국어와 영어 모두 가능합니다."
                : "Have questions or need help? Reach out anytime — we speak both Korean and English."}
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green">
                    {isKorean ? "주소" : "Address"}
                  </h4>
                  <p className="text-warm-gray text-sm mt-1">
                    1234 Community Way, Suite 200
                    <br />
                    Orlando, FL 32801
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green">
                    {isKorean ? "이메일" : "Email"}
                  </h4>
                  <p className="text-warm-gray text-sm mt-1">
                    saranghouse.orlando@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green">
                    {isKorean ? "운영 시간" : "Hours"}
                  </h4>
                  <p className="text-warm-gray text-sm mt-1">
                    {isKorean ? (
                      <>
                        월–금: 오전 9시 – 오후 6시
                        <br />
                        토: 오전 10시 – 오후 2시
                      </>
                    ) : (
                      <>
                        Mon–Fri: 9:00 AM – 6:00 PM
                        <br />
                        Sat: 10:00 AM – 2:00 PM
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            action="https://formsubmit.co/saranghouse.orlando@gmail.com"
            method="POST"
            className="bg-cream rounded-2xl p-6 sm:p-8 border border-warm-border/50"
          >
            <h3 className="text-xl font-bold text-green mb-6">
              {isKorean ? "메시지 보내기" : "Send Us a Message"}
            </h3>
            <input type="hidden" name="_subject" value="Sarang House 웹사이트 문의" />
            <input type="hidden" name="_next" value="https://saranghouse.org/#contact" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" style={{ display: "none" }} />
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green mb-1.5">
                    {isKorean ? "이름" : "Name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                    placeholder={isKorean ? "홍길동" : "Your name"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green mb-1.5">
                    {isKorean ? "이메일" : "Email"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all"
                    placeholder={isKorean ? "email@example.com" : "you@example.com"}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-green mb-1.5">
                  {isKorean ? "메시지" : "Message"}
                </label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all resize-none"
                  placeholder={
                    isKorean
                      ? "궁금한 점이나 도움이 필요한 사항을 적어주세요."
                      : "How can we help you?"
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-terracotta text-white font-semibold rounded-xl hover:bg-terracotta-dark transition-all shadow-sm hover:shadow-md"
              >
                {isKorean ? "보내기" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
