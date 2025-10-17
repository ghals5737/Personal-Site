import { posts, type Post } from './posts'

export function searchPosts(query: string): Post[] {
  if (!query.trim()) return posts.filter(post => post.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
  
  return posts.filter(post => {
    if (!post.published) return false
    
    const searchableText = [
      post.title,
      post.description,
      post.body.raw,
      ...(post.tags || []),
      post.category || '',
    ].join(' ').toLowerCase()
    
    return searchTerms.every(term => searchableText.includes(term))
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByCategory(category: string): Post[] {
  return posts
    .filter(post => post.category === category && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByTag(tag: string): Post[] {
  return posts
    .filter(post => post.tags?.includes(tag) && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const currentTags = currentPost.tags || []
  const currentCategory = currentPost.category

  return posts
    .filter(post => {
      if (post._id === currentPost._id || !post.published) return false
      
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