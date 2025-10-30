import { allPosts } from "@/lib/posts-data"
import RSS from "rss"

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"

  const feed = new RSS({
    title: "황호민 기술 블로그",
    description: "백엔드 중심 풀스택 개발자의 기술 블로그",
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    language: "ko",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, 황호민`,
  })

  allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .forEach((post) => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `${siteUrl}/blog/${post.slug}`,
        date: post.date,
        categories: post.tags,
        author: "황호민",
      })
    })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
