import { BlogList } from '@/components/blog/blog-list'
import { generateMetadata } from '@/components/seo/metadata'

export const metadata = generateMetadata({
  title: 'Blog',
  description: 'Technical blog covering web development, DevOps, and modern technologies',
})

export default function BlogPage() {
  return <BlogList />
}
