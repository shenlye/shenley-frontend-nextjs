import { Card, CardContent } from "./card";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface LinkCardProps {
  href: string;
  icon: string;
  title: string;
  className?: string;
}

export function LinkCard({ href, icon, title, className }: LinkCardProps) {
  return (
    <Link href={href} className={className}>
      <Card className="hover:bg-accent">
        <div className="bg-foreground h-full w-1 absolute left-0 top-0"></div>
        <CardContent className="flex items-center justify-center flex-col h-full">
          <Icon icon={icon} width="32" height="32" />
          <span className="font-bold text-xl">{title}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
