"use client"

import { Mail, Github, Phone } from "lucide-react"

const summaryBullets = [
  "Java/Kotlin 기반 Spring 백엔드 개발 4년 경험",
  "리포트 생성 9초→1.5초, 파일 업로드 1.5초→0.5초 등 성능 최적화·안정화 경험",
  "Flask + Vanilla JS 레거시를 Next.js + TypeScript로 재구축한 풀스택 개선 경험",
  "AWS ECS/ALB, CodeDeploy, GitHub Actions 기반 무중단 배포 및 비용 최적화 경험",
]

const experiences = [
  {
    company: "휴브알엔씨",
    team: "IT개발실",
    role: "풀스택 개발자",
    period: "2025.01 - 재직중",
    achievements: [
      "SNSB-3 인지원사 채점·운영 플랫폼 백엔드(Kotlin/Spring Boot)와 백오피스(Next.js) 설계·개발",
      "리포트 생성 파이프라인에 MQ-워크 구조 도입 → 생성 시간 9초→1.5초(83% 단축), 피크 타임 안정화",
      "중복·비효율 API 정리와 비동기 페이징 적용으로 핵심 API 응답 체감 2~3배 개선",
      "AWS ECS+ALB, Nginx, GitHub Actions→GHCR/ECS 기반 무중단 배포 인프라 구축",
    ],
  },
  {
    company: "스윗코리아",
    team: "User Relations Team",
    role: "백엔드 개발자",
    period: "2023.05 - 2024.06 (1년 2개월, 경영 악화로 인한 퇴사)",
    achievements: [
      "Jira·Confluence 등 서드파티 연동 플러그인 및 오픈 API 설계·개발",
      "외부 연동 API 병목 구간 프로파일링 후 비동기/논블로킹 구조로 전환 → 10초→1.8초 응답 속도 개선",
      "OAuth + JWT 기반 통합 인증·권한 관리 기능과 백오피스 관리 UI 구현",
      "Flask + Vanilla JS 레거시 백오피스를 Next.js + TypeScript로 재구축하여 모듈화·유지보수성 향상",
      "사내 내부 로그를 ETL·마스킹 처리해 고객사가 열람 가능한 감사 로그 모니터링 플러그인 개발",
    ],
  },
  {
    company: "웅진씽크빅",
    team: "차세대 LMS 개발팀",
    role: "백엔드 개발자",
    period: "2021.08 - 2023.04 (1년 9개월)",
    achievements: [
      "Spring Boot + JPA 기반 차세대 통합 LMS 백엔드 개발",
      "주요 조회 커리 익명성 설계·파티셔닝·EXPLAIN 분석으로 기준 조회 지연 약 50% 개선",
      "회원권 실시간 배치 동시성 문제 분석 후 비관적 Lock과 트랜잭션 적용으로 데이터 정합성 확보",
      "AWS CodeDeploy 기반 CI/CD 파이프라인 구축으로 수동 FTP 배포 제거 및 배포 안정성 향상",
    ],
  },
]

const educationActivities = [
  {
    period: "2013.03 - 2021.02",
    title: "충북대학교 정보통신공학과",
    description: "학사 졸업",
  },
  {
    period: "2019.07 - 2019.09",
    title: "네이버 부스트캠프",
    description: "웹·모바일 개발 과정 수료",
  },
  {
    period: "2020.01 - 2021.02",
    title: "삼성 청년 소프트웨어 아카데미(SSAFY)",
    description: "자율·공통 프로젝트 우수상 수상 경험",
  },
]

const contactInfo = [
  {
    label: "010-5493-5737",
    href: "tel:01054935737",
    icon: Phone,
  },
  {
    label: "ghals5737@gmail.com",
    href: "mailto:ghals5737@gmail.com",
    icon: Mail,
  },
  {
    label: "github.com/ghals5737",
    href: "https://github.com/ghals5737",
    icon: Github,
  },
]

export default function ResumeClient() {
  return (
    <div className="bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="container py-12">
        <div className="mx-auto max-w-3xl space-y-12">
          <section className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Backend Developer</p>
              <h1 className="text-4xl font-semibold">황호민</h1>
              <p className="text-base text-muted-foreground">백엔드 개발자</p>
            </div>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 hover:text-foreground"
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">자기소개</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {summaryBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">경력</h2>
            <div className="space-y-8 divide-y divide-border">
              {experiences.map((exp) => (
                <div key={exp.company} className="pt-6 first:pt-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-medium">{exp.company}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.team} | {exp.role}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">교육 및 활동</h2>
            <div className="space-y-3">
              {educationActivities.map((edu) => (
                <div key={edu.title} className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{edu.title}</p>
                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
