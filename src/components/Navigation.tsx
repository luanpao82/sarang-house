"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", labelEn: "About", labelKr: "소개" },
  { href: "#services", labelEn: "Services", labelKr: "서비스" },
  { href: "#resources", labelEn: "Resources", labelKr: "자료" },
  { href: "#events", labelEn: "Events", labelKr: "행사" },
  { href: "#donate", labelEn: "Donate", labelKr: "후원" },
  { href: "#contact", labelEn: "Contact", labelKr: "연락처" },
];

export default function Navigation() {
  const [isKorean, setIsKorean] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get("lang");
      if (langParam) {
        localStorage.setItem("lang", langParam);
        return langParam === "ko";
      }
      return localStorage.getItem("lang") === "ko";
    }
    return false;
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", isKorean ? "ko" : "en");
    document.documentElement.lang = isKorean ? "ko" : "en";
    document.dispatchEvent(
      new CustomEvent("langchange", { detail: isKorean })
    );
  }, [isKorean]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-terracotta rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-base sm:text-lg">S</span>
            </div>
            <div className="leading-tight">
              <span
                className={`font-bold text-base sm:text-lg transition-colors ${
                  scrolled ? "text-green" : "text-white"
                }`}
              >
                Sarang House
              </span>
              <span
                className={`block text-[10px] sm:text-xs transition-colors ${
                  scrolled ? "text-warm-gray" : "text-white/80"
                }`}
              >
                A Community of Love
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-terracotta ${
                  scrolled ? "text-green" : "text-white"
                }`}
              >
                {isKorean ? link.labelKr : link.labelEn}
              </a>
            ))}
            <button
              onClick={() => setIsKorean(!isKorean)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                scrolled
                  ? "border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                  : "border-white/60 text-white hover:bg-white/20"
              }`}
            >
              {isKorean ? "EN" : "한국어"}
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsKorean(!isKorean)}
              className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-all ${
                scrolled
                  ? "border-terracotta text-terracotta"
                  : "border-white/60 text-white"
              }`}
            >
              {isKorean ? "EN" : "한국어"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 transition-colors ${
                scrolled ? "text-green" : "text-white"
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-warm-border shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-green font-medium rounded-lg hover:bg-cream transition-colors"
              >
                {isKorean ? link.labelKr : link.labelEn}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
