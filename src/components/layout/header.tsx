"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { ChevronDown, Github } from "lucide-react"

const primaryNavigation = [
  { href: "/blog", label: "블로그" },
  { href: "/resume", label: "이력서" },
  { href: "/contact", label: "연락" },
]

const tagCategories = [
  { href: "/blog/tag/architecture", label: "아키텍처" },
  { href: "/blog/tag/spring", label: "Spring Boot" },
  { href: "/blog/tag/frontend", label: "프론트엔드" },
  { href: "/blog/tag/devops", label: "DevOps" },
  { href: "/blog/tag/career", label: "커리어" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <span className="text-lg font-semibold tracking-tight">ghals5737</span>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {primaryNavigation.map((item) => (
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
            <li className="relative">
              <div className="group">
                <button
                  type="button"
                  className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  태그
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:-scale-y-100" />
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-48 -translate-x-1/2 rounded-lg border bg-popover p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex flex-col gap-1">
                    {tagCategories.map((tag) => (
                      <Link
                        key={tag.href}
                        href={tag.href}
                        className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        #{tag.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ghals5737"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
