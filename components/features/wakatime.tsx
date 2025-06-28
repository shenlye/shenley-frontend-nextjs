"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/data-display/card";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WakatimeData {
  languages: {
    data: Array<{
      name: string;
      percent: number;
      color: string;
      total_seconds: number;
      text: string;
      hours?: number;
    }>;
  };
  systems: {
    data: Array<{
      name: string;
      percent: number;
      color: string;
      total_seconds: number;
      text: string;
    }>;
  };
  editors: {
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
      best_day: {
        date: string;
        text: string;
        total_seconds: number;
      };
      grand_total: {
        daily_average: number;
        human_readable_daily_average: string;
        human_readable_total: string;
        total_seconds: number;
      };
      range: {
        start: string;
        end: string;
        days_including_holidays: number;
        days_minus_holidays: number;
        holidays: number;
      };
    };
  };
}

export default function Wakatime() {
  const [data, setData] = useState<WakatimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const container = useRef(null);

  useGSAP(
    () => {
      if (!data) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power2.inOut", duration: 0.6 },
      });

      tl.from(".stats-card", { y: -50, opacity: 0 })
        .from(".editor-card", { x: -50, opacity: 0, stagger: 0.2 }, "-=0.3")
        .from(".os-card", { x: -50, opacity: 0, stagger: 0.2 }, "-=0.3")
        .from(".language-card", { x: 50, opacity: 0, stagger: 0.2 }, "-=0.5");
    },
    { scope: container, dependencies: [data] }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          languagesResponse,
          systemsResponse,
          editorsResponse,
          activityResponse,
        ] = await Promise.all([
          fetch(
            "https://wakatime.com/share/@shenlyy/8d02ee17-0ecd-4e12-8445-7410038faee6.json"
          ),
          fetch(
            "https://wakatime.com/share/@shenlyy/60e04848-51df-4f08-b9b0-bc756f621898.json"
          ),
          fetch(
            "https://wakatime.com/share/@shenlyy/143d7ab6-2d3b-400c-9703-b1cf5e877526.json"
          ),
          fetch(
            "https://wakatime.com/share/@shenlyy/6816b5da-56f8-4537-b5dc-e1ace88a9958.json"
          ),
        ]);

        const [languagesData, systemsData, editorsData, activityData] =
          await Promise.all([
            languagesResponse.json(),
            systemsResponse.json(),
            editorsResponse.json(),
            activityResponse.json(),
          ]);

        setData({
          languages: languagesData,
          systems: systemsData,
          editors: editorsData,
          activity: activityData,
        });

        setLoading(false);
      } catch (error) {
        console.error("加载 Wakatime 数据失败:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
        <p className="ml-2">加载中...</p>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center p-10">无法加载数据</div>;
  }

  const startDate = formatDate(data.activity.data.range.start);
  const totalDays = data.activity.data.range.days_including_holidays;
  const codingDays = data.activity.data.range.days_minus_holidays;
  const bestDay = {
    date: formatDate(data.activity.data.best_day.date),
    duration: data.activity.data.best_day.text,
  };
  const totalTime = data.activity.data.grand_total.human_readable_total;

  return (
    <div
      ref={container}
      className="wakatime-container mx-auto max-w-6xl p-4 sm:p-6 md:p-8 space-y-8"
    >
      <Card className="stats-card">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:divide-x divide-border">
            <div className="p-4 flex items-center gap-4">
              <Icon icon="lucide:calendar" className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">编码开始日期</p>
                <p className="text-xl font-semibold">{startDate}</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4 sm:pl-6">
              <Icon icon="lucide:clock" className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">总计天数</p>
                <p className="text-xl font-semibold">{`${totalDays}天`}</p>
                <p className="text-xs text-muted-foreground">{`实际编码${codingDays}天`}</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4 sm:pl-6">
              <Icon icon="lucide:trophy" className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">编码最长一天</p>
                <p className="text-xl font-semibold">{bestDay.date}</p>
                <p className="text-xs text-muted-foreground">
                  {bestDay.duration}
                </p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4 sm:pl-6">
              <Icon icon="lucide:code" className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">总编码时长</p>
                <p className="text-xl font-semibold">{totalTime}</p>
                <p className="text-xs text-muted-foreground">
                  平均{" "}
                  {data.activity.data.grand_total.human_readable_daily_average}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <Card className="editor-card">
            <CardHeader>
              <CardTitle>编辑器使用统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.editors.data.slice(0, 5).map((editor, index) => (
                  <BarChartItem
                    key={index}
                    name={editor.name}
                    percent={editor.percent}
                    color={editor.color}
                    text={editor.text}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="os-card">
            <CardHeader>
              <CardTitle>操作系统使用统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.systems.data.map((system, index) => (
                  <BarChartItem
                    key={index}
                    name={system.name}
                    percent={system.percent}
                    color={system.color}
                    text={system.text}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="language-card">
          <CardHeader>
            <CardTitle>编程语言使用统计</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.languages.data.slice(0, 10).map((lang, index) => (
                <BarChartItem
                  key={index}
                  name={lang.name}
                  percent={lang.percent}
                  color={lang.color}
                  text={lang.text}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BarChartItem({
  name,
  percent,
  color,
  text,
}: {
  name: string;
  percent: number;
  color: string;
  text: string;
}) {
  return (
    <div className={`space-y-1`}>
      <div className="flex justify-between text-sm">
        <span>{name}</span>
        <span className="text-muted-foreground">
          {text} ({percent.toFixed(1)}%)
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full"
          style={
            {
              width: `${percent}%`,
              backgroundColor: color,
            } as React.CSSProperties
          }
        ></div>
      </div>
    </div>
  );
}
