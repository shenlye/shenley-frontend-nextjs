"use client";
import { HeroSection } from "@/components/pages/home";
import { AboutSection } from "@/components/pages/home";
import { Wakatime } from "@/components/features/wakatime";

export default function Home() {
  return (
    <div className="mx-auto overflow-hidden">
      <HeroSection />
      <AboutSection />
      <Wakatime />
    </div>
  );
}
