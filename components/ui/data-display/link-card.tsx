import { Card } from "./card";
import Link from "next/link";

interface LinkCardProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function LinkCard({ href, className, children }: LinkCardProps) {
  return (
    <Link href={href}>
      <Card className={`${className} hover:bg-accent cursor-pointer`}>
        {children}
      </Card>
    </Link>
  );
}