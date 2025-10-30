import type { Metadata } from "next"
import { allPosts } from "@/lib/posts-data"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "태그",
  description: "블로그 태그 목록",
}

export default function TagsPage() {
  const posts = allPosts.filter((post) => !post.draft)

  // Count posts per tag
  const tagCounts = posts.reduce(
    (acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1
      })
      return acc
    },
    {} as Record<string, number>,
  )

  // Sort tags by count (descending) and then alphabetically
  const sortedTags = Object.entries(tagCounts).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1]
    }
    return a[0].localeCompare(b[0])
  })

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">태그</h1>
          <p className="text-lg text-muted-foreground">
            총 {sortedTags.length}개의 태그, {posts.length}개의 글
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedTags.map(([tag, count]) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <Card className="p-4 transition-colors hover:bg-accent/50">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-base">
                    {tag}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{count}개</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
