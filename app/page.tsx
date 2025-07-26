import { LinkCard } from "@/components/ui/data-display/link-card";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/data-display/card";
export default function Home() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
      <Card className="grid grid-rows-3">
        占位，这里将介绍我自己
      </Card>
      
      <div className="grid gap-2">
        <LinkCard href="/bangumi" className="">
          <CardHeader>
            <CardTitle>Bangumi</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-12">
            <div>
              <div className="text-sm text-gray-500">最近在看</div>
              <div>命运石之门</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">最近在玩</div>
              <div>使命召唤：黑色行动6</div>
            </div>
          </CardContent>
        </LinkCard>
        
        <LinkCard href="/wakatime">
          <CardHeader>
            <CardTitle>Coding Stats</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-12">
            <div>
              <div className="text-sm text-gray-500">本周编程时长</div>
              <div>42h 30m</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">今日编程时长</div>
              <div>10h 30m</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">主要语言</div>
              <div>TypeScript</div>
            </div>
          </CardContent>
        </LinkCard>

        <LinkCard href="/projects" className="">
          <CardHeader className="flex justify-between flex-col items-center">
            <div className="flex items-center">
              <Icon icon="mingcute:code-fill" className="w-8 h-8" />
              <span className="text-xl font-bold">Project</span>
            </div>
            <div>
              项目总数：<span className="text-xl font-bold">10</span>
            </div>
          </CardHeader>
        </LinkCard>
        
        <LinkCard href="/posts" className="">
          <CardHeader className="flex justify-between flex-col items-center">
            <div className="flex items-center">
              <Icon icon="material-symbols:article" className="w-8 h-8" />
              <span className="text-xl font-bold">Posts</span>
            </div>
            <div>最新文章：《xxxx》</div>
          </CardHeader>
        </LinkCard>
        
        <LinkCard href="/timeline" className="">
          <CardHeader className="flex justify-between flex-col items-center">
            <div className="flex items-center">
              <Icon icon="material-symbols:timeline" className="w-8 h-8" />
              <span className="text-xl font-bold">Timeline</span>
            </div>
            <div>最新时间：2023-01-01</div>
          </CardHeader>
        </LinkCard>
      </div>
    </div>
  );
}
