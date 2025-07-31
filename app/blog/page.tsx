import BlogPosts from "@/components/BlogPosts";
import { getAllBlogPosts } from "@/lib/mdx-blog";

interface BlogPost {
  id: string;
  title: string;
  link: string;
  summary: string;
  published: string;
  category?: string;
}

export default async function BlogPage() {
  const mdxPosts = getAllBlogPosts();
  
  const posts: BlogPost[] = mdxPosts.map((post) => ({
    id: post.slug,
    title: post.title,
    link: `/blog/${post.slug}`,
    summary: post.description,
    published: post.date,
    categories: post.categories,
  }));

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
