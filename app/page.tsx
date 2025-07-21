import { Card } from "@/components/ui/data-display/card";
import { LinkCard } from "@/components/ui/data-display/link-card";

export default function Home() {
  return (
    <div className="grid md:grid-cols-5 grid-cols-1 md:grid-rows-4 gap-3">
      <Card className="md:col-span-3 md:row-span-3">
        <h1 className="text-2xl font-bold">Welcome to My App</h1>
        <p className="text-muted-foreground">This is a simple card component.</p>
      </Card>

      <LinkCard 
        href="/about" 
        icon="carbon:identification" 
        title="Who am i" 
        className="md:col-span-2 md:row-span-1" 
      />
      
      <LinkCard 
        href="/projects" 
        icon="mingcute:code-fill" 
        title="Project" 
        className="md:col-span-2 md:row-span-1" 
      />
      
      <LinkCard 
        href="/posts" 
        icon="material-symbols:article-outline" 
        title="Posts" 
        className="md:col-span-2 md:row-span-1" 
      />
      
      <LinkCard 
        href="/contact" 
        icon="akar-icons:paper-airplane" 
        title="Find Me" 
        className="md:col-span-2 md:row-span-1" 
      />
      
      <LinkCard 
        href="/stats" 
        icon="mdi:clock-outline" 
        title="Coding Stats" 
        className="md:col-span-3 md:row-span-1" 
      />
    </div>
  );
}
