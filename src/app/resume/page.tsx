import type { Metadata } from "next"
import ResumeClient from "./ResumeClient"

export const metadata: Metadata = {
  title: "이력서",
  description: "황호민의 경력 및 기술 이력서 - 백엔드 중심 풀스택 개발자",
  openGraph: {
    title: "황호민 이력서",
    description: "백엔드 중심 풀스택 개발자의 경력 및 기술 이력서",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/api/og?title=${encodeURIComponent("황호민 이력서")}&description=${encodeURIComponent("백엔드 중심 풀스택 개발자")}`,
        width: 1200,
        height: 630,
        alt: "황호민 이력서",
      },
    ],
  },
}

export default function ResumePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "황호민",
    jobTitle: "백엔드 중심 풀스택 개발자",
    url: `${siteUrl}/resume`,
    alumniOf: {
      "@type": "Organization",
      name: "한국대학교",
    },
    knowsAbout: [
      "Java",
      "Kotlin",
      "Spring Boot",
      "JPA",
      "Next.js",
      "TypeScript",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "AWS",
      "Docker",
      "Kubernetes",
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ResumeClient />
    </>
  )
}
