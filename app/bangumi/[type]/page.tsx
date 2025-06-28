"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/tabs";
import useBangumi from "@/hooks/useBangumi";
import { CollectionStatus } from "@/types/bangumi";
import CollectionList from "@/components/ui/data-display/CollectionList";
import { Suspense, use } from "react";
import { notFound } from "next/navigation";

export default function BangumiPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  // 使用React.use()解包params
  const resolvedParams = use(params);
  const type = resolvedParams.type;

  // 验证类型是否有效
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
  const { data, loading, activeStatus, hasMore, setActiveStatus, loadMore } =
    useBangumi({ type });

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

  return (
    <div>
      <Tabs
        value={activeStatus}
        onValueChange={(v) => setActiveStatus(v as CollectionStatus)}
        className="px-4"
      >
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mt-4">
          <TabsTrigger value="collect">{labels.collect}</TabsTrigger>
          <TabsTrigger value="wish">{labels.wish}</TabsTrigger>
          <TabsTrigger value="doing">{labels.doing}</TabsTrigger>
        </TabsList>

        <TabsContent value="collect">
          <CollectionList
            items={data.collect}
            loading={loading}
            pageSize={10}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        </TabsContent>

        <TabsContent value="wish">
          <CollectionList
            items={data.wish}
            loading={loading}
            pageSize={10}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        </TabsContent>

        <TabsContent value="doing">
          <CollectionList
            items={data.doing}
            loading={loading}
            pageSize={10}
            hasMore={hasMore}
            onLoadMore={loadMore}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
