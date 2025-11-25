"use client"

import type { Post } from "@/lib/posts-data"
import { useMDXComponent } from "next-contentlayer2/hooks"
import { mdxComponents } from "@/components/mdx/mdx-components"

interface BlogPostContentProps {
  post: Post
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <MDXContent components={mdxComponents} />
    </div>
  )
}
