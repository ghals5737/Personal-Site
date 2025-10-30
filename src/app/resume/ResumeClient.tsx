"use client"

import { Download, Mail, Github, Linkedin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const skills = {
  backend: ["Java", "Kotlin", "Spring Boot", "Spring Cloud", "JPA/Hibernate", "MySQL", "PostgreSQL", "Redis"],
  frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "React Query"],
  devops: ["AWS (EC2, RDS, S3, CloudFront)", "GCP", "Docker", "Kubernetes", "GitHub Actions", "Jenkins"],
  tools: ["Git", "Gradle", "Maven", "IntelliJ IDEA", "VS Code", "Postman", "Jira"],
}

const experiences = [
  {
    company: "테크 스타트업",
    position: "시니어 백엔드 개발자",
    period: "2022.03 - 현재",
    description: "전자상거래 플랫폼 백엔드 시스템 설계 및 개발",
    achievements: [
      "MSA 아키텍처 전환으로 배포 시간 90% 단축 (2시간 → 12분)",
      "Redis 캐싱 전략 도입으로 API 응답 속도 3배 개선",
      "Spring Batch 기반 정산 시스템 구축 (일 100만 건 처리)",
      "Kotlin + Coroutine 도입으로 동시성 처리 성능 향상",
    ],
    tags: ["Spring Boot", "Kotlin", "MSA", "Redis", "Kubernetes"],
  },
  {
    company: "IT 서비스 기업",
    position: "백엔드 개발자",
    period: "2020.06 - 2022.02",
    description: "B2B SaaS 플랫폼 백엔드 개발 및 유지보수",
    achievements: [
      "RESTful API 설계 및 구현 (50+ 엔드포인트)",
      "JPA N+1 문제 해결로 쿼리 성능 80% 개선",
      "Spring Security + JWT 기반 인증/인가 시스템 구축",
      "테스트 커버리지 70% 달성 (JUnit5, Mockito)",
    ],
    tags: ["Spring Boot", "Java", "JPA", "MySQL", "AWS"],
  },
  {
    company: "스타트업",
    position: "풀스택 개발자",
    period: "2019.03 - 2020.05",
    description: "소셜 커머스 플랫폼 풀스택 개발",
    achievements: [
      "Next.js 기반 SSR 적용으로 SEO 최적화 및 초기 로딩 속도 40% 개선",
      "관리자 대시보드 개발 (React, TypeScript)",
      "결제 시스템 연동 (토스페이먼츠, 카카오페이)",
      "CI/CD 파이프라인 구축 (GitHub Actions, Docker)",
    ],
    tags: ["Spring Boot", "Next.js", "React", "TypeScript", "Docker"],
  },
]

const projects = [
  {
    title: "전자상거래 플랫폼 MSA 전환",
    period: "2022.06 - 2023.03",
    description: "모놀리식 아키텍처를 MSA로 전환하여 확장성과 배포 효율성 개선",
    achievements: [
      "주문, 결제, 상품, 회원 도메인 분리 (4개 마이크로서비스)",
      "Spring Cloud Gateway, Eureka 기반 API Gateway 구축",
      "Kafka를 활용한 이벤트 기반 비동기 통신 구현",
      "Kubernetes 기반 컨테이너 오케스트레이션",
    ],
    tags: ["MSA", "Spring Cloud", "Kafka", "Kubernetes"],
    links: [{ label: "기술 블로그", url: "/blog/msa-migration" }],
  },
  {
    title: "대용량 트래픽 처리 시스템 최적화",
    period: "2021.09 - 2022.02",
    description: "블랙프라이데이 이벤트 대비 시스템 성능 최적화",
    achievements: [
      "Redis 캐싱 레이어 도입 (Look-aside 패턴)",
      "DB 커넥션 풀 튜닝 및 쿼리 최적화",
      "부하 테스트 (JMeter) 및 모니터링 (Prometheus, Grafana)",
      "동시 접속자 10만 명 처리 성공",
    ],
    tags: ["Redis", "Performance", "Monitoring"],
    links: [{ label: "GitHub", url: "https://github.com/username/project" }],
  },
  {
    title: "실시간 알림 시스템 구축",
    period: "2020.11 - 2021.03",
    description: "WebSocket 기반 실시간 알림 시스템 개발",
    achievements: [
      "Spring WebSocket + STOMP 프로토콜 구현",
      "Redis Pub/Sub을 활용한 다중 서버 환경 지원",
      "FCM 연동으로 모바일 푸시 알림 지원",
      "알림 발송 성공률 99.9% 달성",
    ],
    tags: ["WebSocket", "Redis", "FCM"],
    links: [],
  },
]

const education = [
  {
    institution: "삼성 청년 SW 아카데미 (SSAFY)",
    degree: "9기 수료 (Excellence 수상)",
    period: "2023.01 - 2023.12",
    description: "1년 과정 소프트웨어 교육 프로그램 수료",
  },
  {
    institution: "네이버 부스트캠프",
    degree: "웹·모바일 개발 과정 수료",
    period: "2022.07 - 2022.12",
    description: "6개월 집중 교육 프로그램",
  },
]

export default function ResumeClient() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Print Button */}
        <div className="no-print mb-8 flex justify-end">
          <Button onClick={() => window.print()} size="lg">
            <Download className="mr-2 h-4 w-4" />
            PDF 다운로드
          </Button>
        </div>

        {/* Hero Section */}
        <section className="mb-12 print-break-inside-avoid">
          <h1 className="mb-2 text-4xl font-bold">황호민</h1>
          <p className="mb-4 text-xl text-muted-foreground">백엔드 중심 풀스택 개발자</p>
          <p className="mb-6 text-pretty leading-relaxed">
            5년차 백엔드 개발자로, Java/Kotlin과 Spring Boot를 활용한 확장 가능한 시스템 설계 및 개발에 강점을 가지고
            있습니다. MSA 전환, 대용량 트래픽 처리, 성능 최적화 경험을 바탕으로 비즈니스 가치를 창출하는 기술 솔루션을
            제공합니다.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <a
              href="mailto:contact@example.com"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              contact@example.com
            </a>
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              github.com/username
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              linkedin.com/in/username
            </a>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-12 print-break-inside-avoid">
          <h2 className="mb-6 text-2xl font-bold">핵심 기술</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">DevOps & Infrastructure</h3>
              <div className="flex flex-wrap gap-2">
                {skills.devops.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">경력</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="print-break-inside-avoid p-6">
                <div className="mb-4">
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="mb-2 font-medium text-primary">{exp.position}</p>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>

                <ul className="mb-4 space-y-2 text-sm">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">주요 프로젝트</h2>
          <div className="space-y-8">
            {projects.map((project, index) => (
              <Card key={index} className="print-break-inside-avoid p-6">
                <div className="mb-4">
                  <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <span className="text-sm text-muted-foreground">{project.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>

                <ul className="mb-4 space-y-2 text-sm">
                  {project.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {project.links.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        className="flex items-center gap-1 text-sm text-primary transition-colors hover:underline"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-12 print-break-inside-avoid">
          <h2 className="mb-6 text-2xl font-bold">교육 및 수상</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <span className="text-sm text-muted-foreground">{edu.period}</span>
                </div>
                <p className="mb-1 text-sm font-medium text-primary">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
