"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const animationRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useGSAP(() => {
    gsap.from(
      animationRef.current,
      {
        duration: 1,
        rotationY: 60,
        scale: 0.5,
        x: '-=100vw',
        opacity: 0,
        ease: 'power4.out',
      },
    );
  }, [pathname]);

  return <div ref={animationRef} className="">{children}</div>;
}
