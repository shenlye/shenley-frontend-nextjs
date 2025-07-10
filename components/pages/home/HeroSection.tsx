"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "motion/react"
export default function HeroSection() {

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center relative py-16"
    >
      <div className="absolute inset-0 w-full aspect-[32/9] overflow-hidden z-0">
        <Image 
          src="/images/banner.jpg" 
          alt="banner" 
          fill 
          className="object-cover brightness-50 mask-b-from-15%"
          priority
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-24 z-10">
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
            <SocialIcon href="https://github.com/shenlye" icon="mdi:github" />
            <SocialIcon
              href="https://qm.qq.com/q/sFNUw0akQE"
              icon="mingcute:qq-fill"
            />
            <SocialIcon href="mailto:582783985@qq.com" icon="mdi:email" />
            <SocialIcon href="https://t.me/shenlyye" icon="mdi:telegram" />
          </div>
        </div>
        <div className="md:w-1/3 order-1 md:order-2">
          <Image
            src="/images/avatar.jpg"
            alt="avatar"
            width={200}
            height={200}
            priority
            className="rounded-full object-cover avatar"
          />
        </div>
      </div>
    </motion.section>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: string }) {
  return (
    <motion.div
      className="icon"
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Icon icon={icon} className="w-6 h-6 hover:text-primary" />
      </a>
    </motion.div>
  );
}
