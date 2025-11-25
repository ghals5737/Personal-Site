import { allPosts } from "@/lib/posts-data"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import type { Metadata } from "next"
import Image from "next/image"
import { Calendar, Clock, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import GithubSlugger from "github-slugger"
import { BlogPostContent } from "./BlogPostContent"

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

interface TocHeading {
  depth: number
  title: string
  slug: string
}

function buildToc(content: string): TocHeading[] {
  const slugger = new GithubSlugger()
  slugger.reset()

  return content
    .split("\n")
    .map((line) => {
      const match = line.trim().match(/^(#{2,3})\s+(.*)/)
      if (!match) return null
      const [, hashes, title] = match
      return {
        depth: hashes.length,
        title: title.trim().replaceAll("`", ""),
        slug: slugger.slug(title.trim()),
      }
    })
    .filter((heading): heading is TocHeading => heading !== null)
}

async function getPostFromParams(slug: string) {
  const post = allPosts.find((post) => post.slug === slug)
  return post || null
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostFromParams(slug)

  if (!post) {
    return {}
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const ogImageUrl = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: "황호민" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
      url: `${siteUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostFromParams(slug)

  if (!post) {
    notFound()
  }

  const headings = buildToc(post.body.raw)
  const primaryTag = post.tags[0]
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Person",
      name: "황호민",
    },
    keywords: post.tags.join(", "),
    url: `${siteUrl}/blog/${post.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container py-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,2fr)_260px]">
          {/* Main Content */}
          <article className="min-w-0 mx-auto max-w-3xl">
            {/* Post Header */}
            <header className="mx-auto mb-10 max-w-3xl pt-16 text-left">
              <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/70">
                <span>Blog</span>
                {primaryTag && (
                  <>
                    <span className="text-muted-foreground/40">/</span>
                    <span className="tracking-[0.25em] text-muted-foreground/70">{primaryTag}</span>
                  </>
                )}
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-tight">
                {post.title}
              </h1>

              <p className="mt-6 text-pretty text-lg text-muted-foreground">{post.description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 text-muted-foreground/80">
                  <Calendar className="h-4 w-4 text-primary/80" />
                  <time dateTime={post.date}>{format(new Date(post.date), "PPP", { locale: ko })}</time>
                </div>
                <span aria-hidden="true" className="text-muted-foreground/40">
                  ·
                </span>
                <div className="flex items-center gap-2 text-muted-foreground/80">
                  <Clock className="h-4 w-4 text-primary/80" />
                  <span>{post.readingTime}분 읽기</span>
                </div>
              </div>

              {post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full border border-border/70 px-3 py-1 text-xs font-medium text-muted-foreground/80"
                    >
                      <Tag className="h-3 w-3 text-primary/80" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {post.cover && (
              <div className="mx-auto mb-12 aspect-[16/9] w-full overflow-hidden rounded-[2rem] bg-muted/40">
                <Image
                  src={post.cover || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Post Content with MDX */}
            <BlogPostContent post={post} />
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground/70">목차</h2>
              {headings.length === 0 ? (
                <p className="text-sm text-muted-foreground/70">이 글에는 목차로 사용할 섹션이 없습니다.</p>
              ) : (
                <nav className="space-y-1 text-sm text-muted-foreground">
                  {headings.map((heading) => (
                    <a
                      key={heading.slug}
                      href={`#${heading.slug}`}
                      className={cn(
                        "block border-l-2 border-transparent pl-3 pr-2 py-1.5 transition hover:border-primary hover:text-foreground",
                        heading.depth === 3 && "ml-4 text-xs text-muted-foreground/80",
                      )}
                    >
                      {heading.title}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
