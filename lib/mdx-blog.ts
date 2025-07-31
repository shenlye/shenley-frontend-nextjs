import path from 'path'
import matter from 'gray-matter'
import fs from 'fs'

const contentDirectory = path.join(process.cwd(), 'content')

export function getBlogPost(slug: string) {
  let fullPath = path.join(contentDirectory, `${slug}.mdx`)
  
  // 如果.mdx文件不存在，尝试.md文件
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(contentDirectory, `${slug}.md`)
  }
  
  const fileContent = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContent)
  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    updated: data.updated || '',
    categories: data.categories || [],
    tags: data.tags || [],
    content,
  }
}

export function getAllBlogPosts() {
  const files = fs.readdirSync(contentDirectory)
  const posts = files
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      return getBlogPost(slug)
    })
  return posts
}