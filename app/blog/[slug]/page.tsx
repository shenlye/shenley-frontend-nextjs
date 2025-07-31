import { getBlogPost } from "@/lib/mdx-blog";
import Link from "next/link";
import ReactMarkdown from 'react-markdown'
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  return (
    <div className="bg-background min-h-screen py-8">
      <div className="mx-auto">
        <Link href="/blog" className="text-primary hover:underline mb-8 inline-block">
          ← 返回列表
        </Link>

        <article className="prose dark:prose-invert max-w-none">
          <div className="mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.date}>
                {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
              </time>
              {post.categories && (
                <span className="px-2 py-1 bg-secondary rounded-md text-xs">
                  {post.categories.join(' / ')}
                </span>
              )}
            </div>
          </div>
          
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}