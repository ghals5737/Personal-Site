import { allPosts } from "@/lib/posts-data"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import type { Metadata } from "next"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { BlogPostContent } from "./BlogPostContent"

interface PostPageProps {
  params: {
    slug: string
  }
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const post = allPosts.find((post) => post.slug === params.slug)
  return post || null
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

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
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

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

      {post.cover && (
        <div className="relative h-[300px] w-full overflow-hidden">
          <Image src={post.cover || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        </div>
      )}

      <div className="container py-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_280px]">
          {/* Main Content */}
          <article className="min-w-0">
            {/* Post Header */}
            <header className="mb-12">
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>

              <p className="mb-6 text-pretty text-lg text-muted-foreground">{post.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>{format(new Date(post.date), "PPP", { locale: ko })}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime}분 읽기</span>
                </div>
              </div>
            </header>

            {/* Post Content with MDX */}
            <BlogPostContent post={post} />
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="mb-4 text-sm font-semibold">목차</h2>
              <nav className="space-y-2 text-sm">
                <a href="#들어가며" className="block text-primary hover:underline">
                  들어가며
                </a>
                <a href="#문제-상황" className="block text-muted-foreground hover:text-foreground hover:underline">
                  문제 상황
                </a>
                <div className="ml-4 space-y-2">
                  <a href="#n1-쿼리-문제" className="block text-muted-foreground hover:text-foreground hover:underline">
                    N+1 쿼리 문제
                  </a>
                  <a
                    href="#느린-응답-시간"
                    className="block text-muted-foreground hover:text-foreground hover:underline"
                  >
                    느린 응답 시간
                  </a>
                </div>
                <a href="#해결-방법" className="block text-muted-foreground hover:text-foreground hover:underline">
                  해결 방법
                </a>
                <div className="ml-4 space-y-2">
                  <a
                    href="#fetch-join-적용"
                    className="block text-muted-foreground hover:text-foreground hover:underline"
                  >
                    Fetch Join 적용
                  </a>
                  <a href="#캐싱-전략" className="block text-muted-foreground hover:text-foreground hover:underline">
                    캐싱 전략
                  </a>
                </div>
                <a href="#성과" className="block text-muted-foreground hover:text-foreground hover:underline">
                  성과
                </a>
                <a href="#마치며" className="block text-muted-foreground hover:text-foreground hover:underline">
                  마치며
                </a>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
