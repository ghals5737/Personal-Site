import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // 정확히 루트 경로인 경우에만 리다이렉트
  if (pathname === "/") {
    const url = request.nextUrl.clone()
    url.pathname = "/blog"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}

