import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupWakatimeAnimation(container: HTMLElement | null) {
  if (!container) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      toggleActions: "play none none none",
    },
    defaults: { ease: "power2.inOut", duration: 0.6 },
  });

  tl.from(".stats-card", { y: -50, opacity: 0 })
    .from(".editor-card", { x: -50, opacity: 0, stagger: 0.2 }, "-=0.3")
    .from(".os-card", { x: -50, opacity: 0, stagger: 0.2 }, "-=0.3")
    .from(".language-card", { x: 50, opacity: 0, stagger: 0.2 }, "-=0.5");

  return tl;
} 