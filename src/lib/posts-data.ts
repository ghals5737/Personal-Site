export interface Post {
    title: string
    description: string
    date: string
    updated?: string
    tags: string[]
    cover?: string
    draft: boolean
    lang: string
    slug: string
    url: string
    readingTime: number
    body: {
      code: string
      raw: string
    }
  }
  
  // Sample blog posts for preview
  export const allPosts: Post[] = [
    {
      title: "Spring Boot 마이크로서비스 아키텍처 구축하기",
      description:
        "모놀리식 애플리케이션을 마이크로서비스로 전환하는 과정과 Spring Cloud를 활용한 MSA 구축 경험을 공유합니다.",
      date: "2024-01-15",
      tags: ["Spring Boot", "MSA", "Kubernetes", "Spring Cloud"],
      draft: false,
      lang: "ko",
      slug: "spring-boot-microservices",
      url: "/blog/spring-boot-microservices",
      readingTime: 12,
      body: {
        code: "",
        raw: "모놀리식 애플리케이션을 마이크로서비스로 전환하는 과정...",
      },
    },
    {
      title: "JPA N+1 문제 해결하기",
      description:
        "JPA를 사용하면서 자주 마주치는 N+1 문제의 원인과 다양한 해결 방법을 실무 경험을 바탕으로 정리했습니다.",
      date: "2024-01-10",
      tags: ["JPA", "Hibernate", "Performance", "Database"],
      draft: false,
      lang: "ko",
      slug: "jpa-n-plus-one-problem",
      url: "/blog/jpa-n-plus-one-problem",
      readingTime: 8,
      body: {
        code: "",
        raw: "JPA N+1 문제의 원인과 해결 방법...",
      },
    },
    {
      title: "Redis 캐싱 전략: 실전 패턴과 주의사항",
      description: "Cache-Aside, Write-Through, Write-Behind 패턴의 실제 적용 사례와 무효화 전략을 다룹니다.",
      date: "2023-12-20",
      tags: ["Redis", "Caching", "Performance"],
      cover: "https://blob.v0.app/redis-caching.png",
      draft: false,
      lang: "ko",
      slug: "redis-caching-strategy",
      url: "/blog/redis-caching-strategy",
      readingTime: 9,
      body: {
        code: "",
        raw: "Redis를 활용한 효과적인 캐싱 전략...",
      },
    },
    {
      title: "Kubernetes 배포 전략: Blue-Green과 Canary 배포",
      description: "무중단 배포를 위한 Blue-Green과 Canary 배포 전략의 실제 구현 방법과 트레이드오프를 분석합니다.",
      date: "2023-12-15",
      tags: ["Kubernetes", "DevOps", "Deployment"],
      cover: "https://blob.v0.app/kubernetes-deployment.png",
      draft: false,
      lang: "ko",
      slug: "kubernetes-deployment-strategies",
      url: "/blog/kubernetes-deployment-strategies",
      readingTime: 11,
      body: {
        code: "",
        raw: "Kubernetes 배포 전략...",
      },
    },
    {
      title: "React Query로 서버 상태 관리 마스터하기",
      description: "React Query를 활용한 효율적인 데이터 페칭, 캐싱, 동기화 전략을 실전 예제와 함께 설명합니다.",
      date: "2023-12-10",
      tags: ["React", "React Query", "State Management"],
      cover: "https://blob.v0.app/react-query.png",
      draft: false,
      lang: "ko",
      slug: "react-query-server-state",
      url: "/blog/react-query-server-state",
      readingTime: 10,
      body: {
        code: "",
        raw: "React Query를 활용한 서버 상태 관리...",
      },
    },
    {
      title: "PostgreSQL 쿼리 최적화: EXPLAIN ANALYZE 활용법",
      description: "실제 쿼리 분석을 통한 쿼리 성능 개선 방법과 인덱스 전략을 실제 사례와 함께 알아봅니다.",
      date: "2023-12-05",
      tags: ["PostgreSQL", "Database", "Performance"],
      cover: "https://blob.v0.app/postgresql-optimization.png",
      draft: false,
      lang: "ko",
      slug: "postgresql-query-optimization",
      url: "/blog/postgresql-query-optimization",
      readingTime: 13,
      body: {
        code: "",
        raw: "PostgreSQL 쿼리 최적화...",
      },
    },
    {
      title: "GitHub Actions로 구축하는 완벽한 CI/CD 파이프라인",
      description: "테스트, 빌드, 배포 자동화하는 GitHub Actions 워크플로우 설계와 최적화 팁을 공유합니다.",
      date: "2023-11-28",
      tags: ["GitHub Actions", "CI/CD", "Automation"],
      cover: "https://blob.v0.app/github-actions-cicd.png",
      draft: false,
      lang: "ko",
      slug: "github-actions-cicd-pipeline",
      url: "/blog/github-actions-cicd-pipeline",
      readingTime: 14,
      body: {
        code: "",
        raw: "GitHub Actions CI/CD 파이프라인...",
      },
    },
    {
      title: "JWT 인증 구현과 보안 고려사항",
      description: "JWT 기반 인증 시스템의 안전한 구현 방법과 토큰 관리, XSS/CSRF 방어 전략을 다룹니다.",
      date: "2023-11-20",
      tags: ["Security", "JWT", "Authentication"],
      cover: "https://blob.v0.app/jwt-security.png",
      draft: false,
      lang: "ko",
      slug: "jwt-authentication-security",
      url: "/blog/jwt-authentication-security",
      readingTime: 11,
      body: {
        code: "",
        raw: "JWT 인증과 보안...",
      },
    },
    {
      title: "Spring Boot 성능 최적화: 응답 시간 3배 개선 사례",
      description: "N+1 쿼리 문제 해결과 캐싱 전략 적용을 통해 API 응답 시간을 100ms로 단축한 경험을 공유합니다.",
      date: "2024-01-15",
      tags: ["Spring Boot", "Performance", "JPA"],
      cover: "https://blob.v0.app/spring-boot-performance.png",
      draft: false,
      lang: "ko",
      slug: "spring-boot-performance-optimization",
      url: "/blog/spring-boot-performance-optimization",
      readingTime: 8,
      body: {
        code: "",
        raw: "Spring Boot 성능 최적화...",
      },
    },
    {
      title: "MSA 전환기: 모놀리스에서 마이크로서비스로",
      description: "레거시 모놀리스 시스템을 마이크로서비스 아키텍처로 전환하면서 겪은 도전과 해결 과정을 정리했습니다.",
      date: "2024-01-08",
      tags: ["MSA", "Architecture", "Kubernetes"],
      cover: "https://blob.v0.app/msa-migration.png",
      draft: false,
      lang: "ko",
      slug: "msa-migration-journey",
      url: "/blog/msa-migration-journey",
      readingTime: 12,
      body: {
        code: "",
        raw: "MSA 전환 경험...",
      },
    },
    {
      title: "TypeScript 타입 안전성을 활용한 API 클라이언트 설계",
      description: "Zod와 TypeScript를 활용하여 런타임 타입 검증과 컴파일 타임 안전성을 모두 확보하는 방법을 소개합니다.",
      date: "2024-01-01",
      tags: ["TypeScript", "API", "Type Safety"],
      cover: "https://blob.v0.app/typescript-api-client.png",
      draft: false,
      lang: "ko",
      slug: "typescript-type-safe-api-client",
      url: "/blog/typescript-type-safe-api-client",
      readingTime: 10,
      body: {
        code: "",
        raw: "TypeScript 타입 안전성...",
      },
    },
  ]
  