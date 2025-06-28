import React from "react";

export function LoadingState() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
      <p className="ml-2">加载中...</p>
    </div>
  );
}

export function ErrorState() {
  return <div className="text-center p-10">无法加载数据</div>;
}
