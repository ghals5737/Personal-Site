import { BlogPost } from '@/components/blog/blog-post'

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPost params={params} />
}
