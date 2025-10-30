import { allPosts } from "@/lib/posts-data"
import { compareDesc } from "date-fns"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { PostCard } from "@/components/blog/post-card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const posts = allPosts.filter((post) => !post.draft)
  const tags = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).map((tag) => ({
    tag: tag,
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)

  return {
    title: `${tag} 태그`,
    description: `${tag} 태그가 포함된 블로그 글`,
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)

  const posts = allPosts
    .filter((post) => !post.draft && post.tags.includes(tag))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/tags">
              <ArrowLeft className="mr-2 h-4 w-4" />
              모든 태그
            </Link>
          </Button>

          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-4xl font-bold">태그:</h1>
            <Badge variant="secondary" className="text-xl">
              {tag}
            </Badge>
          </div>

          <p className="text-lg text-muted-foreground">{posts.length}개의 글</p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
