"use client"

import { useState, useMemo } from "react"
import Fuse from "fuse.js"
import type { Post } from "@/lib/posts-data"
import { Input } from "@/components/ui/input"
import { PostCard } from "@/components/blog/post-card"
import { Search } from "lucide-react"

interface SearchClientProps {
  posts: Post[]
}

export function SearchClient({ posts }: SearchClientProps) {
  const [query, setQuery] = useState("")

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: "title", weight: 2 },
          { name: "description", weight: 1.5 },
          { name: "tags", weight: 1 },
          { name: "body.raw", weight: 0.5 },
        ],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    [posts],
  )

  const results = useMemo(() => {
    if (!query.trim()) {
      return posts
    }
    return fuse.search(query).map((result) => result.item)
  }, [query, fuse, posts])

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">검색</h1>
          <p className="mb-6 text-lg text-muted-foreground">블로그 글을 검색하세요.</p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="제목, 설명, 태그, 내용으로 검색..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 text-base"
              autoFocus
            />
          </div>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          {query.trim() ? `${results.length}개의 결과` : `전체 ${posts.length}개의 글`}
        </div>

        {results.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">검색 결과가 없습니다.</div>
        ) : (
          <div className="grid gap-6">
            {results.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
