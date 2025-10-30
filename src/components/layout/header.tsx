"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Home", href: "/", label: "홈" },
  { name: "Resume", href: "/resume", label: "이력서" },
  { name: "Blog", href: "/blog", label: "블로그" },
  { name: "Projects", href: "/projects", label: "프로젝트" },
  { name: "Uses", href: "/uses", label: "Uses" },
  { name: "Now", href: "/now", label: "Now" },
  { name: "Contact", href: "/contact", label: "연락" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight transition-colors hover:text-primary">
          황호민
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="icon" aria-label="검색">
              <Link href="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
