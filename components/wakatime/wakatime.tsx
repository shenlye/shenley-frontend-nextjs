"use client";

import { useState, useEffect } from "react";

interface WakatimeData {
  languages: {
    data: Array<{
      name: string;
      percent: number;
      color: string;
      total_seconds: number;
      text: string;
    }>;
  };
  activity: {
    data: {
      grand_total: {
        human_readable_total: string;
        human_readable_daily_average: string;
      };
      range: {
        start: string;
        days_minus_holidays: number;
      };
    };
  };
}

function useWakatimeData() {
  const [data, setData] = useState<WakatimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [languagesResponse, activityResponse] = await Promise.all([
          fetch(
            "https://wakatime.com/share/@Shenley/f8980a89-14a8-419a-aca5-ee272dff46bb.json"
          ),
          fetch(
            "https://wakatime.com/share/@Shenley/77a04ab4-ab45-4921-852a-033060720112.json"
          ),
        ]);

        if (!languagesResponse.ok || !activityResponse.ok) {
          throw new Error("获取 Wakatime 数据失败");
        }

        const [languagesData, activityData] = await Promise.all([
          languagesResponse.json(),
          activityResponse.json(),
        ]);

        setData({ languages: languagesData, activity: activityData });
      } catch (err) {
        setError(err as Error);
        console.error("加载 Wakatime 数据失败:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

const LoadingState = () => (
  <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-lg shadow-md animate-pulse">
    <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
    <div className="space-y-4">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="h-6 bg-muted rounded"
        ></div>
      ))}
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="w-full max-w-2xl mx-auto p-6 bg-destructive/10 border border-destructive rounded-lg shadow-md text-center">
    <h3 className="text-lg font-semibold text-destructive-foreground">
      出错啦
    </h3>
    <p className="text-destructive-foreground/80 mt-2">{message}</p>
  </div>
);

const LanguageBar = ({
  name,
  percent,
  text,
  color,
}: {
  name: string;
  percent: number;
  text: string;
  color: string;
}) => (
  <div className="flex items-center space-x-4 text-sm">
    <div className="w-28 truncate text-muted-foreground">
      {name}
    </div>
    <div className="flex-1 bg-muted rounded-full h-2.5">
      <div
        className="h-2.5 rounded-full"
        style={{ width: `${percent}%`, backgroundColor: color }}
      ></div>
    </div>
    <div className="w-28 text-right text-foreground font-medium">
      {text}
    </div>
  </div>
);

export default function Wakatime() {
  const { data, loading, error } = useWakatimeData();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!data) return <ErrorState message="没有获取到数据" />;

  const { activity, languages } = data;
  const startDate = formatDate(activity.data.range.start);
  const codingDays = activity.data.range.days_minus_holidays;
  const totalTime = activity.data.grand_total.human_readable_total;
  const dailyAverage = activity.data.grand_total.human_readable_daily_average;
  const topLanguages = languages.data.slice(0, 7);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card text-card-foreground rounded-2xl shadow-lg border">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-bold text-foreground">
          编程语言统计
        </h2>
        <p className="text-sm text-muted-foreground">
          自 {startDate} 开始，实际编码 {codingDays} 天
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 text-center">
        <div>
          <div className="text-xl font-semibold text-foreground">
            {totalTime}
          </div>
          <div className="text-xs text-muted-foreground">
            总编码时长
          </div>
        </div>
        <div>
          <div className="text-xl font-semibold text-foreground">
            {dailyAverage}
          </div>
          <div className="text-xs text-muted-foreground">
            平均每日时长
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {topLanguages.map((lang) => (
          <LanguageBar key={lang.name} {...lang} />
        ))}
      </div>
    </div>
  );
}
