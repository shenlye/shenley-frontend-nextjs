"use client"
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ScrollingExperience = dynamic(() => import('@/components/ScrollingExperience'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function Home() {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(subtextRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(arrowRef.current, {
      y: -10,
      opacity: 0,
      duration: 5,
      delay: 1,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }, { scope: welcomeRef });

  return (
    <div className="min-h-screen">
      <div 
        ref={welcomeRef}
        className="h-screen w-full flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-background to-muted/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,var(--primary)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 
            ref={textRef}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary"
          >
            欢迎来到我的个人主页！
          </h1>
          
          <p 
            ref={subtextRef}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            探索我的作品、分享我的思考、记录我的成长旅程
          </p>
          
          <div 
            ref={arrowRef}
            className="flex flex-col items-center justify-center mt-16 animate-bounce"
          >
            <span className="text-sm text-muted-foreground mb-2">向下滑动</span>
            <svg 
              className="w-6 h-6 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
      </div>

      <main>
        <ScrollingExperience />
      </main>
    </div>
  );
}
