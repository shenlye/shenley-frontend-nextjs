import React from "react";
import { Card, CardContent } from "@/components/ui/data-display/card";
import { Icon } from "@iconify/react";

interface StatsCardProps {
  startDate: string;
  totalDays: number;
  codingDays: number;
  bestDay: {
    date: string;
    duration: string;
  };
  totalTime: string;
  dailyAverage: string;
}

export function StatsCard({
  startDate,
  totalDays,
  codingDays,
  bestDay,
  totalTime,
  dailyAverage,
}: StatsCardProps) {
  return (
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
                平均 {dailyAverage}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
