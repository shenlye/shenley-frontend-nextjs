"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/data-display/card";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
interface BlogPost {
  id: string;
  title: string;
  link: string;
  summary: string;
  published: string;
  category?: string;
}

interface BlogPostsProps {
  posts: BlogPost[];
}

export default function BlogPosts({ posts }: BlogPostsProps) {
  const postsContainerRef = useRef<HTMLDivElement>(null);
  const postRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useGSAP(() => {
    if (!postRefs.current.length) return;

    gsap.set(postRefs.current, { opacity: 0, y: 20 });
    
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: postsContainerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.to(postRefs.current, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.7)"
    });

  }, { scope: postsContainerRef });

  return (
    <div ref={postsContainerRef} className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <a
          key={post.id}
          ref={(el) => {
            if (el) {
              postRefs.current[index] = el;
            }
          }}
          href={post.id}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:no-underline opacity-0"
        >
          <Card className="h-full flex flex-col bg-transparent shadow-none hover:bg-accent transition-colors">
            <CardHeader>
              <CardTitle className="text-xl line-clamp-2">
                {post.title}
              </CardTitle>
              <CardDescription>
                {format(new Date(post.published), "yyyy年MM月dd日", { locale: zhCN })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {post.summary.replace(/<[^>]*>?/gm, '')}
              </p>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}
