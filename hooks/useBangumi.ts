import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getUserCollectionsByStatus } from "@/lib/bangumi";
import type {
  BangumiCollection,
  CollectionStatus,
} from "@/types/bangumi";

interface UseBangumiOptions {
  type: "anime" | "game";
  initialUsername?: string;
}

export default function useBangumi({ type, initialUsername = "shenley" }: UseBangumiOptions) {
  const searchParams = useSearchParams();
  const [username] = useState(initialUsername);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [activeStatus, setActiveStatus] = useState<CollectionStatus>("collect");
  const [hasMore, setHasMore] = useState(true);
  
  // 记录每个状态的分页信息
  const statusPagesRef = useRef({
    collect: { page: 1, hasMore: true, totalItems: 0 },
    wish: { page: 1, hasMore: true, totalItems: 0 },
    doing: { page: 1, hasMore: true, totalItems: 0 },
  });

  const [data, setData] = useState<BangumiCollection>({
    collect: [],
    wish: [],
    doing: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 处理URL参数变化
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const statusParam = searchParams.get("status") as CollectionStatus | null;

    if (pageParam) setPage(parseInt(pageParam, 10) || 1);
    if (statusParam && ["collect", "wish", "doing"].includes(statusParam)) {
      setActiveStatus(statusParam);
    }
  }, [searchParams]);

  // 加载数据
  const loadData = useCallback(async (resetData = false) => {
    try {
      // 如果当前状态没有更多数据，则不再请求
      if (!resetData && !statusPagesRef.current[activeStatus].hasMore) {
        console.log(`${type}/${activeStatus} 没有更多数据了`);
        return;
      }

      setLoading(true);
      setError(null);

      // 获取当前状态的页码信息
      const currentStatus = statusPagesRef.current[activeStatus];
      
      // 如果是重置数据，则从第1页开始；否则使用当前页码
      const currentPage = resetData ? 1 : currentStatus.page;

      console.log(`加载 ${type}/${activeStatus} 数据，页码: ${currentPage}`);

      // 使用新的API函数，传入页码
      const collectionData = await getUserCollectionsByStatus(
        username,
        type,
        activeStatus,
        currentPage,
        pageSize
      );

      // 检查当前状态是否还有更多数据
      const currentStatusItems = collectionData[activeStatus];
      const currentStatusHasMore = currentStatusItems.length >= pageSize; // 如果获取的数量等于页大小，可能还有更多
      
      // 更新状态的分页信息
      statusPagesRef.current[activeStatus] = {
        page: resetData ? 2 : currentStatus.page + 1, // 重置时设为2，因为已经加载了第1页；否则递增
        hasMore: currentStatusHasMore,
        // 如果是重置，则总数就是当前获取的数量；否则累加
        totalItems: resetData 
          ? currentStatusItems.length 
          : currentStatus.totalItems + currentStatusItems.length
      };

      // 更新全局hasMore状态
      setHasMore(currentStatusHasMore);

      // 如果是重置数据，直接替换；否则合并数据
      setData(prevData => {
        if (resetData) {
          // 重置时，替换当前状态的数据，并保留其他状态的数据
          return {
            ...prevData,
            [activeStatus]: collectionData[activeStatus],
          };
        } else {
          // 加载更多时，追加数据到当前状态
          return {
            ...prevData,
            [activeStatus]: [
              ...prevData[activeStatus],
              ...collectionData[activeStatus],
            ],
          };
        }
      });
    } catch (err) {
      console.error(`加载${type === "anime" ? "动画" : "游戏"}数据失败:`, err);
      
      // 如果出错，假设已经没有更多数据了
      setHasMore(false);
      statusPagesRef.current[activeStatus].hasMore = false;
      
      // 设置友好的错误信息
      if (String(err).includes("offset should be less than or equal to")) {
        // 如果是偏移量错误，说明已经加载了所有数据
        console.log(`${type}/${activeStatus} 已加载全部数据`);
        setError(null); // 不显示错误给用户
      } else {
        setError("数据加载失败，请重试");
      }
    } finally {
      setLoading(false);
    }
  }, [activeStatus, type, username, pageSize, setData, setLoading, setError, setHasMore]);

  // 首次加载和状态变化时重置数据
  useEffect(() => {
    setPage(1);
    loadData(true);
  }, [activeStatus, type, loadData]);

  // 页码变化时加载更多
  useEffect(() => {
    if (page > 1) {
      loadData(false);
    }
  }, [page, loadData]);

  // 加载更多数据
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadData(false);
    }
  }, [loading, hasMore, loadData]);

  // 重新加载数据
  const refresh = () => {
    // 重置所有状态的分页信息
    statusPagesRef.current = {
      collect: { page: 1, hasMore: true, totalItems: 0 },
      wish: { page: 1, hasMore: true, totalItems: 0 },
      doing: { page: 1, hasMore: true, totalItems: 0 },
    };
    setPage(1);
    setHasMore(true);
    loadData(true);
  };

  return {
    username,
    page,
    pageSize,
    activeStatus,
    data,
    loading,
    error,
    hasMore,
    setPage,
    setActiveStatus,
    loadMore,
    refresh
  };
} 