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
            "https://wakatime.com/share/@Shenley/f8980a89-14a8-419a-aca5-ee272dff46bb.json"
          ),
          fetch(
            "https://wakatime.com/share/@Shenley/0828e8a1-401e-4354-a637-ae49890d1e92.json"
          ),
          fetch(
            "https://wakatime.com/share/@Shenley/11d56100-1d7d-46e9-9a90-c9c248fb360b.json"
          ),
          fetch(
            "https://wakatime.com/share/@Shenley/77a04ab4-ab45-4921-852a-033060720112.json"
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