import type { BangumiSubject } from "@/types/bangumi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PaginationButton = ({
  children,
  onClick,
  disabled = false,
  active = false,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1 border text-sm rounded-2xl ${
      active
        ? 'bg-primary text-primary-foreground border-primary'
        : 'border-input hover:bg-accent hover:text-accent-foreground'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
  >
    {children}
  </button>
);

interface CollectionListProps {
  items: BangumiSubject[];
  loading: boolean;
  currentPage: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
}

export default function CollectionList({
  items,
  loading,
  currentPage,
  hasMore,
  onPageChange,
}: CollectionListProps) {
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
          start: "top bottom", // Start animation when element is 200px from bottom of viewport
          end: "top center+=300",  // End animation when element's top reaches 100px below center
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [items, loading]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
    // Scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (items.length === 0 && loading) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border p-4 h-[160px] animate-pulse"
          >
            <div className="flex">
              <div className="w-[100px] h-[140px] bg-accent"></div>
              <div className="ml-4 flex-1">
                <div className="h-6 bg-accent rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-accent rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-accent rounded w-1/3 mb-2"></div>
              </div>
            </div>
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
      <div className="flex flex-col gap-3 rounded-2xl">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={updateItemRef(index)}
            className="border p-4 hover:bg-accent bg-card transition-colors duration-200 rounded-2xl flex flex-col"
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
                    className="hover:scale-105 transition-transform duration-300 object-cover"
                  />
                ) : (
                  <div className="w-[100px] h-[140px] flex items-center justify-center">
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

      <div className="flex justify-center items-center gap-2 mt-8 mb-4">
        <PaginationButton
          onClick={handlePrevPage}
          disabled={currentPage <= 1 || loading}
        >
          上一页
        </PaginationButton>
        
        <span className="px-4 py-1 text-sm">
          第 {currentPage} 页
        </span>
        
        <PaginationButton
          onClick={handleNextPage}
          disabled={!hasMore || loading}
        >
          下一页
        </PaginationButton>
      </div>
    </>
  );
}
