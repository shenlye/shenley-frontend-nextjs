"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".avatar", {
        x: 100,
        duration: 1,
        ease: "power2.inOut",
      });
      gsap.from(".text1", {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.inOut",
      });
      gsap.from(".text2", {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power2.inOut",
      });
      gsap.from(".text3", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.inOut",
      });
      gsap.to(".avatar", {
        x: () => {
          return Math.random() * 30;
        },
        y: () => {
          return Math.random() * 30;
        },
        delay: 1,
        duration: () => {
          return Math.random() * 3 + 2;
        },
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.from(".icon", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: "power2.inOut",
        stagger: 0.2,
      });
      gsap.from(".section2", {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".section2",
          start: "top 80%",
          end: "top top",
          scrub: 1,
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="container mx-auto px-4 overflow-hidden">
      <section className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-24">
          <div className="md:w-2/3 flex flex-col gap-3 order-2 md:order-1 max-w-prose">
            <h1 className="text-4xl font-bold text1">Welcome</h1>
            <h2 className="text-2xl font-bold text2">
              I&apos;m <span className="text-primary">Shenley</span>
            </h2>
            <p className="text-lg text3 max-w-[35ch]">
              I&apos;m a frontend developer with a passion for building web
              applications.
            </p>
            <div className="flex items-center gap-2">
              <div className="icon">
                <a
                  href="https://github.com/shenlye"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    icon="mdi:github"
                    className="w-6 h-6 hover:text-primary"
                  />
                </a>
              </div>
              <div className="icon">
                <a
                  href="https://qm.qq.com/q/sFNUw0akQE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    icon="mingcute:qq-fill"
                    className="w-6 h-6 hover:text-primary"
                  />
                </a>
              </div>
              <div className="icon">
                <a
                  href="mailto:582783985@qq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    icon="mdi:email"
                    className="w-6 h-6 hover:text-primary"
                  />
                </a>
              </div>
              <div className="icon">
                <a
                  href="https://t.me/shenlyye"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    icon="mdi:telegram"
                    className="w-6 h-6 hover:text-primary"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 order-1 md:order-2">
            <Image
              src="/avatar.jpg"
              alt="avatar"
              width={200}
              height={200}
              priority
              className="rounded-full object-cover avatar"
            />
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center section2">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            I&apos;m a frontend developer with a passion for building web
            applications.
          </h2>
          <p className="text-lg">
            I&apos;m a frontend developer with a passion for building web
            applications.
          </p>
        </div>
      </section>
    </div>
  );
}
