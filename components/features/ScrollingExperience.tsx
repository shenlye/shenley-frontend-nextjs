"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Avatar, AvatarImage } from "../ui/data-display/avatar";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ScrollingExperience = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const introContentRef = useRef<HTMLDivElement>(null);
  const avatarContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(introContentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(avatarContainerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      tl.to(section2Ref.current, {
        opacity: 1,
        scale: 1,
        ease: "power2.inOut",
        duration: 1,
        delay: 1,
      });

      const skillCards = gsap.utils.toArray<HTMLElement>(
        ".skill-card",
        section2Ref.current
      );

      const skillItems = gsap.utils.toArray<HTMLElement>(
        ".skill",
        section2Ref.current
      );

      if (skillCards.length > 0) {
        tl.from(
          skillCards,
          {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
            duration: 0.8,
          },
          "-=0.5"
        );
      }

      if (skillItems.length > 0) {
        tl.from(
          skillItems,
          {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
            duration: 0.8,
          },
          "-=0.5"
        );
      }
    },
    { scope: mainContainerRef }
  );

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
          <div ref={introContentRef} className="order-2 max-w-2xl md:order-1">
            <h1 className="text-4xl font-bold md:text-5xl mb-6">
              你好，我是
              <span className="text-primary animate-pulse text-shadow-lg shadow-primary">
                Shenley
              </span>
            </h1>
            <p className="text-xl mb-6 text-muted-foreground">
              一名热爱前端开发的技术爱好者，专注于创造优美、高效的Web体验。
            </p>
            <div className="space-y-4">
              <p>
                我正在学习使用 React、Next.js、TypeScript 等现代前端技术栈。
              </p>
              <p>
                这个网站是我的个人空间，我会在这里分享我的学习笔记、项目经验和技术思考。
              </p>
            </div>
          </div>

          <div ref={avatarContainerRef} className="order-1">
            <Avatar className="size-48 md:size-64">
              <AvatarImage src="/avatar.jpg" alt="Shenley" />
            </Avatar>
          </div>
        </section>

        <section
          ref={section2Ref}
          className="absolute inset-0 flex h-full w-full items-center justify-center bg-muted p-8 opacity-0 scale-95"
        >
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">我的技术栈</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "基础",
                  items: ["html", "css", "js", "git"],
                },
                {
                  title: "前端开发",
                  items: [
                    "react",
                    "nextjs",
                    "typescript",
                    "tailwindcss",
                    "astro",
                  ],
                },
                {
                  title: "后端开发",
                  items: ["nodejs", "express", "nestjs", "mysql"],
                },
                {
                  title: "工具 & 其他",
                  items: [
                    "github",
                    "docker",
                    "webstorm",
                    "vscode",
                    "md",
                    "pnpm",
                  ],
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
                    {category.items.map((item, j) => {
                      return (
                        <div key={j} className="px-2 py-1 text-sm skill">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://skillicons.dev/icons?i=${item}`}
                            alt={item}
                            width={40}
                            height={40}
                            loading="lazy"
                            key={j}
                          />
                        </div>
                      );
                    })}
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
