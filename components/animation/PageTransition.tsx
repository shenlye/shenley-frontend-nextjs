"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(
      animationRef.current,
      {
        duration: 0.4,
        rotationY: -110,
        rotationX: 0,
        x: '-=100vw',
        opacity: 0,
        ease: 'expo.inout',
      },
    );
  }, []);

  return <div ref={animationRef}>{children}</div>;
}
