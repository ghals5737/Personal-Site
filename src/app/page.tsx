import Link from "next/link"
import { allPosts } from "@/lib/posts-data"
import { compareDesc } from "date-fns"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, BookOpen, Github, Linkedin, Mail } from "lucide-react"
import { PostCard } from "@/components/blog/post-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "황호민 | 백엔드 중심 풀스택 엔지니어",
  description:
    "Java/Kotlin/Spring Boot와 Next.js/TypeScript를 활용하여 확장 가능한 웹 애플리케이션을 개발하는 백엔드 중심 풀스택 엔지니어의 포트폴리오",
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/api/og`,
        width: 1200,
        height: 630,
        alt: "황호민 포트폴리오",
      },
    ],
  },
}

const featuredProjects = [
  {
    title: "전자상거래 플랫폼 MSA 전환",
    description: "모놀리식 아키텍처를 마이크로서비스로 전환하여 배포 시간 90% 단축",
    tags: ["Spring Cloud", "Kubernetes", "Kafka"],
    github: "https://github.com/username/ecommerce-msa",
    demo: null,
  },
  {
    title: "실시간 알림 시스템",
    description: "WebSocket 기반 실시간 알림 시스템으로 99.9% 발송 성공률 달성",
    tags: ["WebSocket", "Redis", "Spring Boot"],
    github: "https://github.com/username/notification-system",
    demo: null,
  },
  {
    title: "성능 모니터링 대시보드",
    description: "Prometheus + Grafana 기반 실시간 성능 모니터링 시스템 구축",
    tags: ["Prometheus", "Grafana", "Next.js"],
    github: "https://github.com/username/monitoring-dashboard",
    demo: "https://demo.example.com",
  },
]

export default function HomePage() {
  const recentPosts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "황호민",
    jobTitle: "백엔드 중심 풀스택 엔지니어",
    description: "Java/Kotlin/Spring Boot와 Next.js/TypeScript를 활용하여 확장 가능한 웹 애플리케이션을 개발합니다",
    url: siteUrl,
    sameAs: ["https://github.com/username", "https://linkedin.com/in/username"],
    knowsAbout: [
      "Java",
      "Kotlin",
      "Spring Boot",
      "Next.js",
      "TypeScript",
      "Microservices Architecture",
      "Performance Optimization",
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="border-b bg-background">
          <div className="container py-20 md:py-24">
            <div className="mx-auto max-w-3xl space-y-8 text-center">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Portfolio</p>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  황호민 · 백엔드 중심 풀스택 엔지니어
                </h1>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Java/Kotlin과 Spring Boot를 중심으로 안정적인 웹 서비스를 구축합니다. 단순하고 예측 가능한 구조,
                  유지보수하기 좋은 인터페이스를 지향하며 Next.js/TypeScript로 제품 경험을 다듬습니다.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/resume">
                    <FileText className="mr-2 h-4 w-4" />
                    이력서
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/blog">
                    <BookOpen className="mr-2 h-4 w-4" />
                    블로그
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <a
                  href="https://github.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="transition-colors hover:text-foreground"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="border-t bg-background py-16">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-bold">최근 글</h2>
                <Button asChild variant="link" className="text-primary">
                  <Link href="/blog">
                    모든 글 보기
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {recentPosts.length === 0 ? (
                <div className="text-center text-muted-foreground">아직 작성된 글이 없습니다.</div>
              ) : (
                <div className="grid gap-6">
                  {recentPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="border-t bg-background py-16">
          <div className="container">
            <div className="mx-auto max-w-5xl space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold">주요 프로젝트</h2>
                <Button asChild variant="ghost" className="h-8 px-3 text-sm text-muted-foreground">
                  <Link href="/projects">
                    전체 보기
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                {featuredProjects.map((project) => (
                  <article key={project.title} className="rounded-2xl border p-6 transition-colors hover:border-foreground/30">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 hover:text-foreground hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 hover:text-foreground hover:underline"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="border-t bg-background py-16">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-center text-3xl font-bold">기술 스택</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
                <div>
                  <h3 className="mb-4 text-lg font-bold">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Kotlin", "Spring Boot", "Node.js"].map((tech) => (
                      <span key={tech} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "React", "Next.js", "Tailwind CSS"].map((tech) => (
                      <span key={tech} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Database</h3>
                  <div className="flex flex-wrap gap-2">
                    {["PostgreSQL", "MySQL", "MongoDB", "Redis"].map((tech) => (
                      <span key={tech} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">DevOps</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "Kubernetes", "AWS", "GCP", "GitHub Actions"].map((tech) => (
                      <span key={tech} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "IntelliJ IDEA", "VS Code", "Postman"].map((tech) => (
                      <span key={tech} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-background py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl space-y-4 text-center">
              <h2 className="text-3xl font-semibold">함께 만들 프로젝트가 있나요?</h2>
              <p className="text-sm text-muted-foreground">
                설계와 구현 모두에서 단순함을 지향합니다. 필요한 것이 명확하다면 짧게 메일을 남겨주세요.
              </p>
              <div className="flex justify-center">
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">연락하기</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
