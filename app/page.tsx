import Wakatime from "@/components/wakatime/wakatime";
import ProfileCard from "@/components/Header/ProfileCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-start gap-4">
      <ProfileCard />
      <Wakatime />
      
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <Link href="/blog">
          <Button variant="default">博客</Button>
        </Link>
        <Link href="/projects">
          <Button variant="secondary">项目</Button>
        </Link>
        <Link href="/bangumi/anime">
          <Button variant="outline">动画</Button>
        </Link>
        <Link href="/bangumi/game">
          <Button variant="ghost">游戏</Button>
        </Link>
      </div>
    </div>
  );
}
