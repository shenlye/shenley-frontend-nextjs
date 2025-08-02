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
  <div className="w-full max-w-xl text-card-foreground flex flex-col">
    <div className="mb-6 flex justify-start items-stretch gap-2">
      <div className="h-7 bg-muted animate-pulse w-28"></div>
      <div className="h-7 bg-muted animate-pulse w-48"></div>
    </div>

    <div className="flex gap-4 mb-6 text-left">
      <div>
        <div className="h-7 w-20 bg-muted animate-pulse mb-1"></div>
        <div className="h-3 w-16 bg-muted animate-pulse"></div>
      </div>
      <div>
        <div className="h-7 w-20 bg-muted animate-pulse mb-1"></div>
        <div className="h-3 w-20 bg-muted animate-pulse"></div>
      </div>
    </div>

    <div className="space-y-1">
      {[...Array(7)].map((_, i) => (
        <div key={i} className="flex items-center space-x-2 text-sm">
          <div className="w-20 h-4 bg-muted animate-pulse"></div>
          <div className="flex-1 bg-muted h-2.5 animate-pulse"></div>
          <div className="w-24 h-4 bg-muted animate-pulse"></div>
        </div>
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
}: {
  name: string;
  percent: number;
  text: string;
  color: string;
}) => (
  <div className="flex items-center space-x-2 text-sm">
    <div className="w-20 truncate text-muted-foreground">
      {name}
    </div>
    <div className="flex-1 bg-muted h-2.5">
      <div
        className="h-2.5 bg-foreground"
        style={{ width: `${percent}%` }}
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
    <div className="w-full max-w-xl text-card-foreground flex flex-col">
      <div className="mb-6 flex justify-start items-stretch gap-2">
        <div className="text-sm font-bold text-background bg-foreground py-1 pl-2 md:pr-8 pr-4">
          编程语言统计
        </div>
        <div className="text-sm bg-primary text-foreground py-1 pl-2 md:pr-8 pr-4">
          {startDate} 起，实际编程 {codingDays} 天
        </div>
      </div>

      <div className="flex gap-4 mb-6 text-left">
        <div>
          <div className="text-xl font-semibold text-foreground">
            {totalTime}
          </div>
          <div className="text-xs text-muted-foreground">总编码时长</div>
        </div>
        <div>
          <div className="text-xl font-semibold text-foreground">
            {dailyAverage}
          </div>
          <div className="text-xs text-muted-foreground">平均每日时长</div>
        </div>
      </div>

      <div className="space-y-1">
        {topLanguages.map((lang) => {
          const maxPercent = Math.max(...topLanguages.map(l => l.percent));
          const relativePercent = (lang.percent / maxPercent) * 100;
          return (
            <LanguageBar 
              key={lang.name} 
              {...lang} 
              percent={relativePercent}
            />
          );
        })}
      </div>
    </div>
  );
}
