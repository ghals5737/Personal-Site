"use client"

import { useState, useMemo } from "react"
import { PostCard } from "@/components/blog/post-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Post } from "@/lib/posts-data"
import { compareDesc } from "date-fns"

interface BlogClientProps {
  posts: Post[]
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("전체")

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag))
    })
    return ["전체", ...Array.from(tagSet).sort()]
  }, [posts])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by tag
    if (selectedTag !== "전체") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Sort by date
    return filtered.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  }, [posts, selectedTag, searchQuery])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">기술 블로그</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              실무에서 겪은 문제 해결 과정과 기술적 인사이트를 공유합니다.
            </p>

            {/* Search Bar */}
            <div className="relative mx-auto max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="글 제목, 내용, 태그로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 text-base"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tags and Content */}
      <div className="container py-12">
        <div className="mx-auto max-w-6xl">
          {/* Tag Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Post Count */}
          <div className="mb-6 text-sm text-muted-foreground">{filteredPosts.length}개의 글</div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">검색 결과가 없습니다.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
