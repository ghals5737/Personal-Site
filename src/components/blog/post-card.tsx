import Link from "next/link"
import { format } from "date-fns"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/posts-data"
import Image from "next/image"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={post.url} className="group">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        {post.cover && (
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image
              src={post.cover || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-6">
          <div className="mb-3 text-sm text-muted-foreground">
            {format(new Date(post.date), "yyyy-MM-dd")} · {post.readingTime}분
          </div>

          <h2 className="mb-3 text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
            {post.title}
          </h2>

          <p className="mb-4 text-pretty text-sm text-muted-foreground line-clamp-2">{post.description}</p>

          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}
