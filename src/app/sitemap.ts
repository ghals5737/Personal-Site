import { allPosts } from "@/lib/posts-data"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"

  const posts = allPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const routes = ["", "/resume", "/blog", "/projects", "/contact", "/uses", "/now", "/search", "/tags"].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  )

  return [...routes, ...posts]
}
