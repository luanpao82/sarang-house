"use client";

import { useLang } from "@/hooks/useLang";

export default function Footer() {
  const isKorean = useLang();

  return (
    <footer className="bg-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo / About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-terracotta rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <span className="font-bold text-lg">Sarang House</span>
                <span className="block text-xs text-white/60">
                  A Community of Love
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {isKorean
                ? "올랜도 지역 아시아 이민자를 위한 교육, 자원, 커뮤니티 지원을 제공합니다."
                : "Serving Asian immigrants in Orlando with education, resources, and community support."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">
              {isKorean ? "바로가기" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                { href: "#about", en: "About", kr: "소개" },
                { href: "#services", en: "Services", kr: "서비스" },
                { href: "#resources", en: "Resources", kr: "자료" },
                { href: "#events", en: "Events", kr: "행사" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-terracotta transition-colors"
                  >
                    {isKorean ? link.kr : link.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">
              {isKorean ? "참여하기" : "Get Involved"}
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <a href="#donate" className="hover:text-terracotta transition-colors">
                  {isKorean ? "후원하기" : "Donate"}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-terracotta transition-colors">
                  {isKorean ? "자원봉사" : "Volunteer"}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-terracotta transition-colors">
                  {isKorean ? "파트너십" : "Partner With Us"}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white/90">
              {isKorean ? "연락처" : "Contact"}
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>1234 Community Way, Suite 200</li>
              <li>Orlando, FL 32801</li>
              <li>(407) 555-0128</li>
              <li>hello@saranghouse.org</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Sarang House. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social icons */}
            {["Facebook", "Instagram", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta transition-colors"
                aria-label={social}
              >
                <span className="text-xs font-bold text-white">
                  {social[0]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
