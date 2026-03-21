"use client";

import { useState, useEffect } from "react";

export function useLang() {
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

  useEffect(() => {
    const handler = (e: Event) => {
      setIsKorean((e as CustomEvent).detail);
    };
    document.addEventListener("langchange", handler);
    return () => document.removeEventListener("langchange", handler);
  }, []);

  return isKorean;
}
