"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Avatar from "./avatar";

gsap.registerPlugin(ScrollTrigger);

const ScrollingExperience = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!mainContainerRef.current || !section1Ref.current || !section2Ref.current) return;
    
    const ctx = gsap.context(() => {
      const introContent = section1Ref.current?.querySelector(".intro-content");
      const avatarContainer = section1Ref.current?.querySelector(".avatar-container");
      
      if (introContent) {
        gsap.from(introContent, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        });
      }
      
      if (avatarContainer) {
        gsap.from(avatarContainer, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      if (section2Ref.current) {
        tl.to(section2Ref.current, {
          opacity: 1,
          scale: 1,
          ease: "power2.inOut",
          duration: 1,
        });

        const skillCards = section2Ref.current.querySelectorAll(".skill-card");
        if (skillCards.length > 0) {
          tl.from(skillCards, {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
            duration: 0.8
          }, "-=0.5");
        }
      }
    }, mainContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainContainerRef}
      className="relative h-[250vh] overflow-x-hidden"
    >
      <div className="sticky top-0 h-screen w-full">
        <section
          ref={section1Ref}
          className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-12 bg-background p-8 md:flex-row"
        >
          <div className="intro-content order-2 max-w-2xl md:order-1">
            <h1 className="text-4xl font-bold md:text-5xl mb-6">
              你好，我是{" "}
              <span className="text-primary animate-pulse text-shadow-lg shadow-primary">
                Shenley
              </span>
            </h1>
            <p className="text-xl mb-6 text-muted-foreground">
              一名热爱前端开发的技术爱好者，专注于创造优美、高效的Web体验。
            </p>
            <div className="space-y-4">
              <p>
                我擅长使用 React、Next.js、TypeScript 等现代前端技术栈，
                喜欢探索新技术并将其实践于项目中。
              </p>
              <p>
                这个网站是我的个人空间，我会在这里分享我的学习笔记、项目经验和技术思考。
              </p>
            </div>
          </div>

          <div className="avatar-container order-1">
            <Avatar src="/avatar.jpg" />
          </div>
        </section>

        <section
          ref={section2Ref}
          className="absolute inset-0 flex h-full w-full items-center justify-center bg-muted p-8 opacity-0 scale-95"
        >
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">我的技能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "前端开发",
                  items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                },
                {
                  title: "后端开发",
                  items: ["Node.js", "Express", "Nest.js", "MySQL"],
                },
                {
                  title: "工具 & 其他",
                  items: ["Git", "Docker", "WebStorm", "VSCode"],
                },
                {
                  title: "设计 & 动画",
                  items: ["Framer Motion", "GSAP", "Three.js", "Spline"],
                },
              ].map((category, i) => (
                <div
                  key={i}
                  className="skill-card bg-background p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScrollingExperience;
