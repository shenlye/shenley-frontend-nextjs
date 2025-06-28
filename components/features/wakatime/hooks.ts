"use client";

import { useState, useEffect } from "react";
import { WakatimeData } from "./types";

export function useWakatimeData() {
  const [data, setData] = useState<WakatimeData | null>(null);
  const [loading, setLoading] = useState(true);

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

  return { data, loading };
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
} 