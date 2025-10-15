export interface Post {
  id: string
  title: string
  description: string
  date: string
  published: boolean
  tags?: string[]
  category?: string
  image?: string
  author: string
  content: string
  slug: string
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'Welcome to My Technical Blog',
    description: 'A comprehensive guide to building a modern personal site with Next.js, TypeScript, and Tailwind CSS',
    date: '2024-01-15',
    published: true,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Web Development'],
    category: 'Web Development',
    author: 'Your Name',
    image: '/images/blog/welcome.jpg',
    slug: 'welcome-to-my-blog',
    content: `
# Welcome to My Technical Blog

Welcome to my personal technical blog! This is where I'll be sharing insights, tutorials, and experiences from my journey in software development.

## What You'll Find Here

This blog covers a wide range of topics including:

- **Web Development**: Modern frameworks, best practices, and performance optimization
- **DevOps**: Deployment strategies, containerization, and infrastructure as code
- **System Design**: Scalable architecture patterns and distributed systems
- **Tools & Technologies**: Reviews, comparisons, and deep dives into popular tools

## About This Site

This site is built with modern web technologies:

- **Next.js 14** with App Router for the framework
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MDX** for rich content authoring

## Code Examples

Here's a simple React component example:

\`\`\`tsx
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={() => setCount(count - 1)}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        -
      </button>
      <span className="text-xl font-bold">{count}</span>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        +
      </button>
    </div>
  )
}
\`\`\`

## Getting Started

If you're new to web development, I recommend starting with:

1. **HTML & CSS Fundamentals**
2. **JavaScript ES6+ Features**
3. **React Basics**
4. **Node.js and npm**

Stay tuned for more content, and feel free to reach out if you have any questions!
    `,
  },
  {
    id: '2',
    title: 'Complete Docker Deployment Guide for Next.js Applications',
    description: 'Learn how to deploy your Next.js application using Docker, docker-compose, and Nginx with best practices for production environments',
    date: '2024-01-20',
    published: true,
    tags: ['Docker', 'Next.js', 'DevOps', 'Deployment', 'Nginx'],
    category: 'DevOps',
    author: 'Your Name',
    image: '/images/blog/docker-deployment.jpg',
    slug: 'docker-deployment-guide',
    content: `
# Complete Docker Deployment Guide for Next.js Applications

Deploying Next.js applications with Docker provides consistency, scalability, and ease of management. This comprehensive guide covers everything from basic containerization to production-ready deployment with Nginx.

## Why Docker for Next.js?

Docker offers several advantages for Next.js deployments:

- **Consistency**: Same environment across development, staging, and production
- **Isolation**: Dependencies don't conflict with the host system
- **Scalability**: Easy horizontal scaling with orchestration tools
- **Portability**: Deploy anywhere Docker runs

## Multi-stage Dockerfile

Here's an optimized multi-stage Dockerfile for Next.js:

\`\`\`dockerfile
# Base image with Node.js
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

## Best Practices

### Security
- Use non-root user in containers
- Keep base images updated
- Scan images for vulnerabilities
- Use secrets management for sensitive data

### Performance
- Enable Next.js standalone output
- Use multi-stage builds to reduce image size
- Implement proper caching strategies
- Monitor resource usage

Happy deploying! 🚀
    `,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug && post.published)
}

export function getAllPosts(): Post[] {
  return posts.filter(post => post.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter(post => post.category === category && post.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter(post => post.tags?.includes(tag) && post.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllCategories(): string[] {
  const categories = posts
    .filter(post => post.published && post.category)
    .map(post => post.category!)
  
  return Array.from(new Set(categories)).sort()
}

export function getAllTags(): string[] {
  const tags = posts
    .filter(post => post.published)
    .flatMap(post => post.tags || [])
  
  return Array.from(new Set(tags)).sort()
}

export function searchPosts(query: string): Post[] {
  if (!query.trim()) return getAllPosts()

  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
  
  return posts.filter(post => {
    if (!post.published) return false
    
    const searchableText = [
      post.title,
      post.description,
      post.content,
      ...(post.tags || []),
      post.category || '',
    ].join(' ').toLowerCase()
    
    return searchTerms.every(term => searchableText.includes(term))
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const currentTags = currentPost.tags || []
  const currentCategory = currentPost.category

  return posts
    .filter(post => {
      if (post.id === currentPost.id || !post.published) return false
      
      // Prioritize posts with same category
      if (post.category === currentCategory) return true
      
      // Then posts with overlapping tags
      if (post.tags?.some(tag => currentTags.includes(tag))) return true
      
      return false
    })
    .sort((a, b) => {
      // Same category gets highest priority
      if (a.category === currentCategory && b.category !== currentCategory) return -1
      if (b.category === currentCategory && a.category !== currentCategory) return 1
      
      // Then by number of overlapping tags
      const aOverlap = a.tags?.filter(tag => currentTags.includes(tag)).length || 0
      const bOverlap = b.tags?.filter(tag => currentTags.includes(tag)).length || 0
      
      if (aOverlap !== bOverlap) return bOverlap - aOverlap
      
      // Finally by date
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, limit)
}
