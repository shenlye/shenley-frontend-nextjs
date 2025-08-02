"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BangumiSubject } from "@/types/bangumi";
import { CollectionStatus } from "@/types/bangumi";
import CollectionList from "@/components/CollectionList";
import { Suspense, use, useState, useEffect } from "react";
import { notFound, useSearchParams, useRouter } from "next/navigation";
import { getUserCollectionsByStatus } from "@/lib/bangumi";

export default function BangumiPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const resolvedParams = use(params);
  const type = resolvedParams.type;

  if (type !== "anime" && type !== "game") {
    return notFound();
  }

  return (
    <Suspense fallback={<div className="text-center py-10">加载中...</div>}>
      <BangumiPageContent type={type as "anime" | "game"} />
    </Suspense>
  );
}

function BangumiPageContent({ type }: { type: "anime" | "game" }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState<CollectionStatus>("collect");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    collect: BangumiSubject[];
    wish: BangumiSubject[];
    doing: BangumiSubject[];
  }>({ collect: [], wish: [], doing: [] });
  const [hasMore, setHasMore] = useState({
    collect: true,
    wish: true,
    doing: true
  });
  const pageSize = 12;

  // 根据类型设置不同的标签文本
  const tabLabels = {
    anime: {
      collect: "看过",
      wish: "想看",
      doing: "在看",
    },
    game: {
      collect: "玩过",
      wish: "想玩",
      doing: "在玩",
    },
  };

  const labels = tabLabels[type];

  // 处理URL参数变化
  useEffect(() => {
    const status = searchParams.get('status') as CollectionStatus || 'collect';
    const pageNum = parseInt(searchParams.get('page') || '1', 10);
    
    setActiveStatus(status);
    setPage(pageNum);
  }, [searchParams]);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const collectionData = await getUserCollectionsByStatus(
          'shenley', // 用户名
          type,
          activeStatus,
          page,
          pageSize
        );

        setData(prev => ({
          ...prev,
          [activeStatus]: collectionData[activeStatus] || []
        }));

        // 检查是否还有更多数据
        const currentData = collectionData[activeStatus] || [];
        setHasMore(prev => ({
          ...prev,
          [activeStatus]: currentData.length >= pageSize
        }));
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeStatus, page, type]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleStatusChange = (value: string) => {
    const status = value as CollectionStatus;
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', status);
    params.delete('page'); // Reset to first page when changing status
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mx-auto">
      <Tabs
        value={activeStatus}
        onValueChange={handleStatusChange}
        className="mb-6"
      >
        <TabsList className="w-2xs">
          <TabsTrigger className="" value="collect">{labels.collect}</TabsTrigger>
          <TabsTrigger className="" value="wish">{labels.wish}</TabsTrigger>
          <TabsTrigger className="" value="doing">{labels.doing}</TabsTrigger>
        </TabsList>

        <TabsContent value="collect">
          <CollectionList
            items={data.collect}
            loading={loading}
            currentPage={page}
            hasMore={hasMore.collect}
            onPageChange={handlePageChange}
          />
        </TabsContent>

        <TabsContent value="wish">
          <CollectionList
            items={data.wish}
            loading={loading}
            currentPage={page}
            hasMore={hasMore.wish}
            onPageChange={handlePageChange}
          />
        </TabsContent>

        <TabsContent value="doing">
          <CollectionList
            items={data.doing}
            loading={loading}
            currentPage={page}
            hasMore={hasMore.doing}
            onPageChange={handlePageChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
