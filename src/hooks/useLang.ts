"use client";

import { useState, useEffect } from "react";

export function useLang() {
  const [isKorean, setIsKorean] = useState(() => {
    if (typeof window !== "undefined") {
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
