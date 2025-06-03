"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-muted-foreground">选择主题</div>
      <div className="flex gap-2">
        <Button
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => setTheme("light")}
          className="flex-1"
        >
          浅色
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => setTheme("dark")}
          className="flex-1"
        >
          深色
        </Button>
        <Button
          variant={theme === "system" ? "default" : "outline"}
          onClick={() => setTheme("system")}
          className="flex-1"
        >
          系统
        </Button>
      </div>
    </div>
  );
}
