import BlogPosts from "@/components/BlogPosts";

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
    <div className="">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">暂无文章</p>
      ) : (
        <BlogPosts posts={posts} />
      )}
    </div>
  );
}
