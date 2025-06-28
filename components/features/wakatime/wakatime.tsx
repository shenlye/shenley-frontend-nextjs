"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useWakatimeData, formatDate } from "./hooks";
import { StatsCard } from "./StatsCard";
import { DataCards } from "./DataCards";
import { setupWakatimeAnimation } from "./animation";
import { LoadingState, ErrorState } from "./LoadingState";

export default function Wakatime() {
  const { data, loading } = useWakatimeData();
  const container = useRef(null);

  useGSAP(
    () => {
      if (!data) return;
      setupWakatimeAnimation(container.current);
    },
    { scope: container, dependencies: [data] }
  );

  if (loading) {
    return <LoadingState />;
  }

  if (!data) {
    return <ErrorState />;
  }

  const startDate = formatDate(data.activity.data.range.start);
  const totalDays = data.activity.data.range.days_including_holidays;
  const codingDays = data.activity.data.range.days_minus_holidays;
  const bestDay = {
    date: formatDate(data.activity.data.best_day.date),
    duration: data.activity.data.best_day.text,
  };
  const totalTime = data.activity.data.grand_total.human_readable_total;
  const dailyAverage =
    data.activity.data.grand_total.human_readable_daily_average;

  return (
    <div
      ref={container}
      className="wakatime-container mx-auto max-w-6xl p-4 sm:p-6 md:p-8 space-y-8"
    >
      <StatsCard
        startDate={startDate}
        totalDays={totalDays}
        codingDays={codingDays}
        bestDay={bestDay}
        totalTime={totalTime}
        dailyAverage={dailyAverage}
      />

      <DataCards data={data} />
    </div>
  );
}
