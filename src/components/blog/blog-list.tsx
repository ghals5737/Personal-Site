'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag, User, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { posts } from '@/lib/posts'
import { searchPosts, getAllCategories, getAllTags } from '@/lib/search'
import { useState, useMemo } from 'react'

interface BlogListProps {
  searchParams?: {
    search?: string
    category?: string
    tag?: string
  }
}

export function BlogList({ searchParams }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState(searchParams?.search || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.category || '')
  const [selectedTag, setSelectedTag] = useState(searchParams?.tag || '')

  const categories = getAllCategories()
  const tags = getAllTags()

  const filteredPosts = useMemo(() => {
    let allPosts = posts.filter(post => post.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Apply search filter
    if (searchQuery) {
      allPosts = searchPosts(searchQuery)
    }

    // Apply category filter
    if (selectedCategory) {
      allPosts = allPosts.filter(post => post.category === selectedCategory)
    }

    // Apply tag filter
    if (selectedTag) {
      allPosts = allPosts.filter(post => post.tags?.includes(selectedTag))
    }

    return allPosts
  }, [searchQuery, selectedCategory, selectedTag])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Thoughts, tutorials, and insights on web development and technology
        </p>
      </header>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tag Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="tag" className="text-sm font-medium">
              Tag:
            </label>
            <select
              id="tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="">All Tags</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article key={post._id} className="group">
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md h-full flex flex-col">
                  {/* Featured Image */}
                  {post.image && (
                    <div className="relative aspect-video rounded-t-lg overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{Math.ceil(post.body.raw.split(' ').length / 200)} min read</span>
                    </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {post.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.category && (
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      )}
                      {post.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {post.tags && post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-auto">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No posts found</h3>
            <p>
              {hasActiveFilters
                ? 'Try adjusting your search criteria or clear the filters.'
                : 'No blog posts have been published yet.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
