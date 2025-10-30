import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/username",
    icon: Github,
    label: "GitHub 프로필",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/username",
    icon: Linkedin,
    label: "LinkedIn 프로필",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/username",
    icon: Twitter,
    label: "Twitter 프로필",
  },
  {
    name: "Email",
    href: "mailto:contact@example.com",
    icon: Mail,
    label: "이메일 보내기",
  },
]

const footerLinks = [
  { name: "RSS", href: "/feed.xml" },
  { name: "Sitemap", href: "/sitemap.xml" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-sm text-muted-foreground">© {currentYear} 황호민. All rights reserved.</p>
            <div className="flex gap-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={link.label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
