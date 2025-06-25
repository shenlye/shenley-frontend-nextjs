"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      animationRef.current,
      {
        opacity: 0,
        filter: "blur(16px)",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power4.inOut",
      }
    );
  }, []);

  return <div ref={animationRef}>{children}</div>;
}
