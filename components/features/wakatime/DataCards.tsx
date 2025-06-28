import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/data-display/card";
import { BarChartItem } from "./BarChartItem";
import { WakatimeData } from "./types";

interface DataCardsProps {
  data: WakatimeData;
}

export function DataCards({ data }: DataCardsProps) {
  return (
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
  );
}
