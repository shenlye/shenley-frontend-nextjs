"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePreviewStore } from "@/stores/usePreviewStore";
import gsap from "gsap";

export default function Banner() {
  const { theme, setTheme } = useTheme();
  const { currentPage, hoverItem } = usePreviewStore();
  const titleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    const hintEl = hintRef.current;
    
    if (!titleEl || !hintEl) return;


    if (animationRef.current) {
      animationRef.current.kill();
    }

    const displayItem = hoverItem || currentPage;
    
    animationRef.current = gsap.timeline({
      onComplete: () => {
        animationRef.current = null;
      }
    });

    animationRef.current
      .to([titleEl, hintEl], {
        x: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      })
      .call(() => {
        if (titleEl && hintEl) {
          titleEl.textContent = displayItem.name;
          hintEl.textContent = displayItem.hint;
        }
      })
      .fromTo(
        [titleEl, hintEl],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut"
        }
      );

    return () => {
      animationRef.current?.kill();
    };
  }, [currentPage, hoverItem]);

  return (
    <div className="h-15 flex items-center p-2 overflow-hidden md:px-0 justify-between sticky top-0 z-50 bg-background/50 backdrop-blur-md">
      <div className="flex items-center justify-between h-full">
        <div className="bg-foreground w-1 h-full flex-shrink-0" />
        <div className="ml-2 overflow-hidden">
          <div ref={titleRef} className="text-2xl font-bold">
            {currentPage.name}
          </div>
          <div ref={hintRef} className="text-sm">
          {currentPage.hint}
        </div>
      </div>
      </div>
      <div className="cursor-pointer" onClick={() => setTheme(theme === "light" ? "dark" : "light")} >
        {theme === "light" ? "LIGHT" : "DARK"}
      </div>
    </div>
  );
}