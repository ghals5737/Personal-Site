"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Post } from "@/lib/posts-data"
import { compareDesc, format } from "date-fns"
import { cn } from "@/lib/utils"

interface BlogClientProps {
  posts: Post[]
}

const FEATURED_TAG_LIMIT = 7

export default function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("전체")
  const [showAllTags, setShowAllTags] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag))
    })
    return ["전체", ...Array.from(tagSet).sort()]
  }, [posts])

  const visibleTags = showAllTags ? allTags : allTags.slice(0, FEATURED_TAG_LIMIT)
  const hasExtraTags = allTags.length > FEATURED_TAG_LIMIT
  const showSearchField = searchOpen || searchQuery.length > 0

  const filteredPosts = useMemo(() => {
    let filtered = posts

    if (selectedTag !== "전체") {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    return filtered.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
  }, [posts, selectedTag, searchQuery])

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background">
        <div className="container py-12 md:py-16">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="space-y-3 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Notes</p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">기술 블로그</h1>
              <p className="text-base leading-relaxed text-muted-foreground">
                실무에서 겪은 문제 해결 방식과 설계 판단 근거를 기록합니다. 덜어내고 싶은 것들만 남긴, 읽기 편한 기술
                노트입니다.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{posts.length}개의 글을 기록했습니다.</span>
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full px-3 py-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-expanded={searchOpen}
                aria-label="검색 열기"
              >
                <Search className="h-4 w-4" />
                <span>검색</span>
              </button>
            </div>

            {showSearchField && (
              <div className="relative">
                <Input
                  type="text"
                  placeholder="제목, 내용, 태그를 입력하세요"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (e.target.value.length > 0) {
                      setSearchOpen(true)
                    }
                  }}
                  className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base focus-visible:border-foreground focus-visible:ring-0 placeholder:text-muted-foreground/70"
                />
              </div>
            )}
          </div>
        </div>
      </header>

  <main>
      <section className="border-b">
        <div className="container py-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex gap-6 overflow-x-auto whitespace-nowrap text-sm font-medium text-muted-foreground [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {visibleTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    "pb-2 text-left transition-colors",
                    selectedTag === tag ? "text-foreground underline underline-offset-8" : "hover:text-foreground/80",
                  )}
                >
                  {tag}
                </button>
              ))}
              {hasExtraTags && (
                <button
                  type="button"
                  onClick={() => setShowAllTags((prev) => !prev)}
                  className="pb-2 text-left text-muted-foreground transition-colors hover:text-foreground/80"
                >
                  {showAllTags ? "접기" : "More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-xs uppercase tracking-wide text-muted-foreground">
            {selectedTag === "전체" ? "전체 글" : `${selectedTag}`} · {filteredPosts.length}개
          </div>

          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">검색 결과가 없습니다.</div>
          ) : (
            <div className="divide-y divide-border">
              {filteredPosts.map((post) => (
                <article key={post.slug} className="flex flex-col gap-6 py-10 md:flex-row md:items-start md:gap-10">
                  {post.cover && (
                    <Link
                      href={post.url}
                      className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted md:w-64"
                    >
                      <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-cover"
                      />
                    </Link>
                  )}

                  <div className="flex-1 space-y-3">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      {format(new Date(post.date), "yyyy.MM.dd")} · {post.readingTime}분
                    </div>
                    <Link
                      href={post.url}
                      className="text-2xl font-semibold leading-snug text-foreground transition-colors hover:text-muted-foreground"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground/80">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      </main>
    </div>
  )
}
