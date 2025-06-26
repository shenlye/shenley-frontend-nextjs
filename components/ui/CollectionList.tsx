import type { BangumiSubject } from "@/types/bangumi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";

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
  const loadMoreRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          // 只有当元素可见、有更多数据、不在加载中、且存在加载更多函数时才触发
          if (entries[0].isIntersecting && hasMore && !loading && onLoadMore) {
            onLoadMore();
          }
        },
        {
          rootMargin: "0px 0px 300px 0px",
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  // 当组件卸载时断开观察器连接
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // 初始加载时显示骨架屏
  if (items.length === 0 && loading) {
    return (
      <div className="space-y-4 px-4">
        {[...Array(Math.min(5, pageSize))].map((_, i) => (
          <div
            key={i}
            className="flex border rounded-md p-4 h-[160px] animate-pulse max-w-2xl mx-auto"
          >
            <div className="w-[100px] h-[140px] bg-accent rounded-md"></div>
            <div className="ml-4 flex-1">
              <div className="h-6 bg-accent rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-accent rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-accent rounded w-1/3 mb-2"></div>
              <div className="h-12 bg-accent rounded w-full mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 没有数据时显示提示
  if (items.length === 0) {
    return <p className="mt-4 text-muted-foreground">暂无数据</p>;
  }

  return (
    <>
      <div className="space-y-4 max-w-2xl mx-auto px-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex border rounded-md p-4 hover:bg-accent/10 transition-colors duration-200"
          >
            {/* 左侧图片 */}
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

            {/* 右侧信息 */}
            <div className="ml-4 flex-1">
              {/* 标题 */}
              <Link href={item.url || "#"} target="_blank" className="block">
                <h3 className="font-medium text-lg hover:text-primary">
                  {item.name_cn || item.name || "无标题"}
                </h3>
                {item.name_cn && item.name && item.name_cn !== item.name && (
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                )}
              </Link>

              {/* 评分信息 */}
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-4">
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

                {/* 个人评分 */}
                <div className="flex items-center mt-1 sm:mt-0">
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

              {/* 评论 */}
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
          </div>
        ))}
      </div>

      {/* 加载更多指示器 - 只有在有更多数据时才显示 */}
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

      {/* 没有更多数据时显示提示 */}
      {!hasMore && items.length > 0 && !loading && (
        <p className="text-center text-sm text-muted-foreground mt-6 mb-4">
          已加载全部数据
        </p>
      )}
    </>
  );
}
