import { Card, CardContent } from "@/components/ui/data-display/card";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <div className="grid md:grid-cols-5 grid-cols-1 md:grid-rows-4 gap-4">
      <Card className="md:col-span-3 md:row-span-3">
        <h1 className="text-2xl font-bold">Welcome to My App</h1>
        <p className="text-muted-foreground">This is a simple card component.</p>
      </Card>

      <Card className="md:col-span-2 md:row-span-1">
        <CardContent className="flex items-center justify-start h-full gap-4">
          <Icon icon="carbon:identification" width="64" height="64" />
          <span className="font-bold text-2xl">Who am i</span>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 md:row-span-1">
        <CardContent className="flex items-center justify-start h-full gap-4">
          <Icon icon="mingcute:code-fill" width="64" height="64" />
          <span className="font-bold text-2xl">Project</span>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 md:row-span-1">
        <CardContent className="flex items-center justify-start h-full gap-4">
          <Icon icon="material-symbols:article-outline" width="64" height="64" />
          <span className="font-bold text-2xl">Posts</span>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 md:row-span-1">
        <CardContent className="flex items-center justify-start  h-full gap-4">
          <Icon icon="akar-icons:paper-airplane" width="64" height="64" />
          <span className="font-bold text-2xl">Find Me</span>
        </CardContent>
      </Card>

      <Card className="md:col-span-3 md:row-span-1">
        <CardContent className="flex items-center justify-start h-full gap-4">
          <Icon icon="mdi:clock-outline" width="64" height="64" />
          <span className="font-bold text-2xl">Coding Stats</span>
        </CardContent>
      </Card>
    </div>
  );
}
