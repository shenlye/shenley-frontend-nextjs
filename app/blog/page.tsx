import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  link: string;
  summary: string;
  published: string;
  category?: string;
}

interface AtomEntry {
  id: string;
  title: string;
  link?: {
    href?: string;
  } | string;
  summary?: string;
  content?: {
    "#text"?: string;
  };
  published?: string;
  updated?: string;
  category?: {
    term?: string;
  };
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch("https://blog.ykrazy.top/atom.xml", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    const xml = await res.text();
    const { XMLParser } = await import("fast-xml-parser");
    const parser = new XMLParser();
    const result = parser.parse(xml);

    if (!result.feed?.entry) return [];

    const entries = Array.isArray(result.feed.entry)
      ? result.feed.entry
      : [result.feed.entry];

    return entries.map((entry: AtomEntry) => ({
      id: entry.id,
      title: entry.title,
      link: (typeof entry.link === 'object' ? entry.link.href : entry.link) || "",
      summary: entry.summary || entry.content?.["#text"] || "",
      published: entry.published || entry.updated,
      category: entry.category?.term,
    }));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">暂无文章</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.id}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:no-underline"
            >
              <Card className="h-full flex flex-col bg-transparent border-none shadow-none hover:bg-accent transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    {post.published && (
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(post.published), "yyyy年MM月dd日", {
                          locale: zhCN,
                        })}
                      </div>
                    )}
                    {post.category && (
                      <span className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                        {post.category}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-muted-foreground line-clamp-3">
                    {post.summary.replace(/<[^>]*>?/gm, "")}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto">
                  <div className="w-full">
                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      阅读全文 <span className="ml-1">→</span>
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
