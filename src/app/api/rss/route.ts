import { posts } from '@/lib/posts'

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'https://mydomain.tld'
  
  const rssItems = posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(post => {
      return `
        <item>
          <title><![CDATA[${post.title}]]></title>
          <description><![CDATA[${post.description}]]></description>
          <link>${siteUrl}/blog/${post.slug}</link>
          <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          ${post.tags?.map(tag => `<category><![CDATA[${tag}]]></category>`).join('') || ''}
        </item>
      `
    }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Your Personal Site</title>
    <description>Technical blog covering web development, DevOps, and modern technologies</description>
    <link>${siteUrl}</link>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
