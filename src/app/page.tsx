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
        <section className="bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
          <div className="container py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-lg font-medium text-primary">안녕하세요,</p>

              <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                황호민입니다
              </h1>

              <p className="mb-4 text-xl font-semibold text-foreground sm:text-2xl">백엔드 중심 풀스택 엔지니어</p>

              <p className="mb-10 text-pretty text-base text-muted-foreground sm:text-lg">
                Java/Kotlin/Spring Boot와 Next.js/TypeScript를 활용하여 확장 가능한 웹 애플리케이션을
                <br className="hidden sm:inline" />
                개발합니다. 성능 최적화와 클린 아키텍처에 관심이 많습니다.
              </p>

              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/resume">
                    <FileText className="mr-2 h-4 w-4" />
                    이력서 보기
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  <Link href="/blog">
                    <BookOpen className="mr-2 h-4 w-4" />
                    블로그 가기
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://github.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com/in/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="text-muted-foreground transition-colors hover:text-primary"
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
            <div className="mx-auto max-w-6xl">
              <div className="mb-10 flex items-center justify-between">
                <h2 className="text-3xl font-bold">주요 프로젝트</h2>
                <Button asChild variant="link" className="text-primary">
                  <Link href="/projects">
                    모든 프로젝트 보기
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/projects"
                  className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
                >
                  <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
                    <img
                      src="/analytics-dashboard.png"
                      alt="실시간 분석 대시보드"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-semibold">실시간 분석 대시보드</h3>
                    <p className="text-sm text-muted-foreground">대용량 데이터 처리를 위한 실시간 분석 시스템</p>
                  </div>
                </Link>

                <Link
                  href="/projects"
                  className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
                >
                  <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500">
                    <img
                      src="/video-conference-meeting-interface.jpg"
                      alt="화상 회의 플랫폼"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-semibold">화상 회의 플랫폼</h3>
                    <p className="text-sm text-muted-foreground">WebRTC 기반 실시간 화상 회의 솔루션</p>
                  </div>
                </Link>

                <Link
                  href="/projects"
                  className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
                >
                  <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-green-500 to-emerald-500">
                    <img
                      src="/devops-ci-cd-pipeline-dashboard.jpg"
                      alt="DevOps 자동화 파이프라인"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-semibold">DevOps 자동화 파이프라인</h3>
                    <p className="text-sm text-muted-foreground">Kubernetes 기반 CI/CD 자동화 시스템</p>
                  </div>
                </Link>
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
                      <span
                        key={tech}
                        className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "React", "Next.js", "Tailwind CSS"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Database</h3>
                  <div className="flex flex-wrap gap-2">
                    {["PostgreSQL", "MySQL", "MongoDB", "Redis"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">DevOps</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "Kubernetes", "AWS", "GCP", "GitHub Actions"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Git", "IntelliJ IDEA", "VS Code", "Postman"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
                      >
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
        <section className="border-t bg-primary py-20 text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold">연락하기</h2>
              <p className="mb-8 text-lg opacity-90">프로젝트 협업이나 기술 상담이 필요하신가요? 언제든 연락주세요.</p>
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">연락하기</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
