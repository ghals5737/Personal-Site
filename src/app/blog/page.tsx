import { allPosts } from "@/lib/posts-data"
import type { Metadata } from "next"
import BlogClient from "./BlogClient"

export const metadata: Metadata = {
  title: "블로그",
  description: "기술 블로그 - 실무 경험과 학습 내용 공유",
  openGraph: {
    title: "황호민 기술 블로그",
    description: "실무 경험과 기술 학습 내용을 공유합니다",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/api/og?title=${encodeURIComponent("기술 블로그")}&description=${encodeURIComponent("실무 경험과 학습 내용 공유")}`,
        width: 1200,
        height: 630,
        alt: "황호민 기술 블로그",
      },
    ],
  },
}

export default function BlogPage() {
  const posts = allPosts.filter((post) => !post.draft)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "황호민 기술 블로그",
    description: "실무 경험과 기술 학습 내용을 공유합니다",
    url: `${siteUrl}/blog`,
    author: {
      "@type": "Person",
      name: "황호민",
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${siteUrl}/blog/${post.slug}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogClient posts={posts} />
    </>
  )
}
