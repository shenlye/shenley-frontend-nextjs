import type { BangumiSubject } from "@/types/bangumi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CollectionListProps {
  items: BangumiSubject[];
  loading: boolean;
  pageSize: number;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function CollectionList({
  items,
  loading,
  pageSize,
  hasMore = false,
  onLoadMore,
}: CollectionListProps) {
  const observer = useRef<IntersectionObserver | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const updateItemRef = (index: number) => (node: HTMLDivElement | null) => {
    itemsRef.current[index] = node;
  };

  useEffect(() => {
    if (items.length === 0 || loading) return;

    const itemElements = itemsRef.current.filter(Boolean);

    gsap.set(itemElements, {
      opacity: 0,
      y: 30,
      scale: 0.95,
    });

    itemElements.forEach((item) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [items, loading]);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading && onLoadMore) {
            onLoadMore();
          }
        },
        {
          rootMargin: "0px 0px 1px 0px",
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (items.length === 0 && loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
        {[...Array(Math.min(6, pageSize))].map((_, i) => (
          <div
            key={i}
            className="border rounded-md p-4 h-[160px] animate-pulse"
          >
            <div className="flex">
              <div className="w-[100px] h-[140px] bg-accent rounded-md"></div>
              <div className="ml-4 flex-1">
                <div className="h-6 bg-accent rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-accent rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-accent rounded w-1/3 mb-2"></div>
              </div>
            </div>
            <div className="h-8 bg-accent rounded w-full mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="mt-4 text-muted-foreground">暂无数据</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={updateItemRef(index)}
            className="border rounded-md p-4 hover:bg-accent/10 transition-colors duration-200 flex flex-col"
          >
            <div className="flex">
              <Link
                href={item.url || "#"}
                target="_blank"
                className="block shrink-0"
              >
                {item.images?.medium ? (
                  <Image
                    src={item.images.medium}
                    alt={item.name_cn || item.name || ""}
                    width={100}
                    height={140}
                    style={{ height: "auto" }}
                    className="rounded-md hover:scale-105 transition-transform duration-300 object-cover"
                  />
                ) : (
                  <div className="w-[100px] h-[140px] flex items-center justify-center rounded-md">
                    无图片
                  </div>
                )}
              </Link>

              <div className="ml-4 flex-1">
                <Link href={item.url || "#"} target="_blank" className="block">
                  <h3 className="font-medium text-lg hover:text-primary">
                    {item.name_cn || item.name || "无标题"}
                  </h3>
                  {item.name_cn && item.name && item.name_cn !== item.name && (
                    <p className="text-sm text-muted-foreground">{item.name}</p>
                  )}
                </Link>

                <div className="mt-2 flex flex-col gap-1">
                  {item.rating?.score ? (
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground">
                        平均分：
                      </span>
                      <span className="text-amber-500 font-medium">
                        {item.rating.score}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({item.rating.total || 0}人评分)
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      暂无评分
                    </span>
                  )}

                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground">
                      我的评分：
                    </span>
                    {item.user_rating && item.user_rating > 0 ? (
                      <span className="text-primary font-medium">
                        {item.user_rating}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2">
              {item.user_comment ? (
                <p className="text-sm line-clamp-3">
                  <span className="text-muted-foreground">评论：</span>
                  {item.user_comment}
                </p>
              ) : item.summary ? (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  <span className="text-muted-foreground">简介：</span>
                  {item.summary}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">暂无评论</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {(hasMore || loading) && (
        <div ref={loadMoreRef} className="w-full flex justify-center mt-6 mb-4">
          {loading && (
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-2 text-sm text-muted-foreground">加载中...</p>
            </div>
          )}
          {hasMore && !loading && <div className="h-8" />}
        </div>
      )}

      {!hasMore && items.length > 0 && !loading && (
        <p className="text-center text-sm text-muted-foreground mt-6 mb-4">
          已加载全部数据
        </p>
      )}
    </>
  );
}
