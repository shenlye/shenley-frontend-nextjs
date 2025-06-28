import React from "react";

interface BarChartItemProps {
  name: string;
  percent: number;
  color: string;
  text: string;
}

export function BarChartItem({
  name,
  percent,
  color,
  text,
}: BarChartItemProps) {
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
