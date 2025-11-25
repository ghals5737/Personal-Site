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
      <div className="min-h-screen">
     
      </div>
    </>
  )
}
