// Contentlayer에서 생성된 타입과 데이터를 사용
import { allPosts as contentlayerPosts } from "contentlayer/generated"
import type { Post as ContentlayerPost } from "contentlayer/generated"

// Post 인터페이스는 ContentlayerPost를 기반으로 확장
export interface Post {
  title: string
  description: string
  date: string
  updated?: string
  tags: string[]
  cover?: string
  draft: boolean
  lang: string
  slug: string
  url: string
  readingTime: number
  body: {
    code: string
    raw: string
  }
}

// Contentlayer에서 생성된 포스트를 Post 인터페이스에 맞게 변환
function transformPost(post: ContentlayerPost): Post {
  const wordsPerMinute = 200
  const content = post.body.raw || ""
  const words = content.split(/\s+/).length
  const calculatedReadingTime = Math.ceil(words / wordsPerMinute)

  return {
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated,
    tags: post.tags ?? [],
    cover: post.cover,
    draft: post.draft ?? false,
    lang: post.lang ?? "ko",
    slug: post.slug,
    url: post.url,
    readingTime: post.readingTime ?? calculatedReadingTime,
    body: {
      code: post.body.code || "",
      raw: post.body.raw || "",
    },
  }
}

// Contentlayer에서 가져온 모든 포스트를 변환
export const allPosts: Post[] = contentlayerPosts
  .filter((post): post is ContentlayerPost => post !== undefined)
  .map(transformPost)
