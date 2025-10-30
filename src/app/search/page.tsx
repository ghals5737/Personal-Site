import type { Metadata } from "next"
import { SearchClient } from "./SearchClient"
import { allPosts } from "@/lib/posts-data"

export const metadata: Metadata = {
  title: "검색",
  description: "블로그 글 검색",
}

export default function SearchPage() {
  const posts = allPosts.filter((post) => !post.draft)

  return <SearchClient posts={posts} />
}
