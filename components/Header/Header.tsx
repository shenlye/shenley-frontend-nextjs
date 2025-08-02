import { cn } from "@/lib/utils";

type HeaderProps = {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header
      className={cn(
        "h-20 border-b border-border flex items-end justify-between px-4 pb-2 bg-background z-50",
        className
      )}
    >
      <div className="flex items-center max-w-4xl mx-auto justify-between w-full">
        <div className="flex items-center h-8 gap-1">
          <div className="flex items-end justify-end bg-foreground text-background h-full w-32">
            <span className="text-sm font-bold pr-1">SHENLEY</span>
          </div>
          <div className="">
            <span className="text-3xl font-semibold">OS</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground flex flex-col items-end justify-end h-8">
          <span>v2025.8.2-Δ7.Σ-PROTO-∞</span>
        </div>
      </div>
    </header>
  );
}
