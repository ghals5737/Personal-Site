import type { Metadata } from "next"
import { ProjectsClient } from "./ProjectsClient"

export const metadata: Metadata = {
  title: "프로젝트",
  description: "주요 프로젝트 및 포트폴리오 - 백엔드 시스템, MSA, 성능 최적화 프로젝트",
}

const projects = [
  {
    id: 1,
    title: "전자상거래 플랫폼 MSA 전환",
    description: "모놀리식 아키텍처를 마이크로서비스 아키텍처로 전환하여 배포 시간 90% 단축 및 시스템 확장성 개선",
    longDescription:
      "3년간 운영된 전자상거래 플랫폼의 모놀리식 아키텍처를 4개의 마이크로서비스(주문, 결제, 상품, 회원)로 분리했습니다. Spring Cloud Gateway와 Eureka를 활용한 API Gateway를 구축하고, Kafka를 통한 이벤트 기반 비동기 통신을 구현했습니다.",
    category: "Backend",
    tags: ["Spring Cloud", "Kubernetes", "Kafka", "MSA", "Docker"],
    period: "2022.06 - 2023.03",
    team: "백엔드 4명, 프론트엔드 2명",
    role: "백엔드 리드 개발자",
    achievements: [
      "배포 시간 2시간 → 12분으로 90% 단축",
      "서비스별 독립 배포로 개발 속도 70% 향상",
      "Kubernetes 기반 자동 스케일링으로 트래픽 대응력 300% 개선",
      "장애 격리로 시스템 가용성 99.5% → 99.9% 향상",
    ],
    techStack: {
      backend: ["Spring Boot", "Spring Cloud Gateway", "Eureka", "Kafka"],
      infrastructure: ["Kubernetes", "Docker", "AWS EKS", "Helm"],
      monitoring: ["Prometheus", "Grafana", "Jaeger", "ELK Stack"],
    },
    github: "https://github.com/username/ecommerce-msa",
    demo: null,
    blog: "/blog/msa-migration-journey",
  },
  {
    id: 2,
    title: "대용량 트래픽 처리 시스템 최적화",
    description: "블랙프라이데이 이벤트 대비 시스템 성능 최적화로 동시 접속자 10만 명 처리 성공",
    longDescription:
      "연간 최대 트래픽이 발생하는 블랙프라이데이 이벤트를 대비하여 시스템 전반의 성능을 최적화했습니다. Redis 캐싱, DB 쿼리 최적화, 커넥션 풀 튜닝 등을 통해 API 응답 속도를 3배 개선했습니다.",
    category: "Performance",
    tags: ["Redis", "JPA", "Performance", "Monitoring", "Spring Boot"],
    period: "2021.09 - 2022.02",
    team: "백엔드 3명",
    role: "성능 최적화 담당",
    achievements: [
      "API 응답 속도 2.3초 → 0.3초로 87% 개선",
      "Redis 캐싱으로 DB 부하 70% 감소",
      "JPA N+1 문제 해결로 쿼리 수 99% 감소",
      "동시 접속자 10만 명 처리 성공 (기존 3만 명)",
    ],
    techStack: {
      backend: ["Spring Boot", "JPA", "Redis", "MySQL"],
      monitoring: ["Prometheus", "Grafana", "JMeter", "New Relic"],
      optimization: ["Query Optimization", "Connection Pool Tuning", "Caching Strategy"],
    },
    github: "https://github.com/username/performance-optimization",
    demo: null,
    blog: "/blog/spring-boot-performance-optimization",
  },
  {
    id: 3,
    title: "실시간 알림 시스템 구축",
    description: "WebSocket 기반 실시간 알림 시스템으로 99.9% 발송 성공률 달성",
    longDescription:
      "Spring WebSocket과 STOMP 프로토콜을 활용한 실시간 알림 시스템을 구축했습니다. Redis Pub/Sub을 통해 다중 서버 환경을 지원하고, FCM 연동으로 모바일 푸시 알림도 함께 제공합니다.",
    category: "Backend",
    tags: ["WebSocket", "Redis", "FCM", "Spring Boot", "STOMP"],
    period: "2020.11 - 2021.03",
    team: "백엔드 2명, 프론트엔드 1명",
    role: "백엔드 개발자",
    achievements: [
      "실시간 알림 발송 성공률 99.9% 달성",
      "Redis Pub/Sub으로 다중 서버 환경 지원",
      "FCM 연동으로 웹/모바일 통합 알림 제공",
      "평균 알림 전송 지연 시간 100ms 이하 유지",
    ],
    techStack: {
      backend: ["Spring Boot", "WebSocket", "STOMP", "Redis Pub/Sub"],
      mobile: ["FCM", "APNs"],
      infrastructure: ["AWS", "Load Balancer", "Redis Cluster"],
    },
    github: "https://github.com/username/notification-system",
    demo: null,
    blog: null,
  },
  {
    id: 4,
    title: "관리자 대시보드 개발",
    description: "Next.js 기반 실시간 데이터 시각화 관리자 대시보드",
    longDescription:
      "Next.js와 TypeScript를 활용하여 실시간 데이터 시각화가 가능한 관리자 대시보드를 개발했습니다. Recharts를 활용한 다양한 차트와 SWR을 통한 효율적인 데이터 페칭을 구현했습니다.",
    category: "Frontend",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Recharts"],
    period: "2021.05 - 2021.08",
    team: "프론트엔드 2명",
    role: "프론트엔드 개발자",
    achievements: [
      "실시간 데이터 업데이트 (SWR 활용)",
      "10+ 종류의 차트 및 데이터 시각화",
      "반응형 디자인으로 모바일 지원",
      "Lighthouse 성능 점수 95+ 달성",
    ],
    techStack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      visualization: ["Recharts", "D3.js"],
      state: ["SWR", "Zustand"],
    },
    github: "https://github.com/username/admin-dashboard",
    demo: "https://demo.example.com",
    blog: null,
  },
  {
    id: 5,
    title: "CI/CD 파이프라인 구축",
    description: "GitHub Actions 기반 자동화된 빌드, 테스트, 배포 파이프라인",
    longDescription:
      "GitHub Actions를 활용하여 코드 푸시부터 프로덕션 배포까지 완전 자동화된 CI/CD 파이프라인을 구축했습니다. 테스트 자동화, 코드 품질 검사, 자동 배포를 통해 개발 생산성을 크게 향상시켰습니다.",
    category: "DevOps",
    tags: ["GitHub Actions", "Docker", "Kubernetes", "ArgoCD", "Terraform"],
    period: "2022.01 - 2022.04",
    team: "DevOps 2명, 백엔드 3명",
    role: "DevOps 엔지니어",
    achievements: [
      "배포 시간 1시간 → 5분으로 단축",
      "테스트 자동화로 버그 발견율 80% 향상",
      "GitOps 방식으로 배포 이력 추적 가능",
      "롤백 시간 30분 → 2분으로 단축",
    ],
    techStack: {
      ci: ["GitHub Actions", "Jest", "JUnit", "SonarQube"],
      cd: ["ArgoCD", "Helm", "Kubernetes"],
      infrastructure: ["Terraform", "AWS", "Docker"],
    },
    github: "https://github.com/username/cicd-pipeline",
    demo: null,
    blog: null,
  },
  {
    id: 6,
    title: "API Gateway 및 인증 시스템",
    description: "Spring Cloud Gateway 기반 API Gateway 및 JWT 인증 시스템",
    longDescription:
      "마이크로서비스 환경에서 중앙화된 인증/인가를 처리하는 API Gateway를 구축했습니다. JWT 토큰 기반 인증과 Redis를 활용한 토큰 관리로 보안성과 성능을 동시에 확보했습니다.",
    category: "Backend",
    tags: ["Spring Cloud Gateway", "JWT", "Redis", "Security", "OAuth2"],
    period: "2022.09 - 2022.12",
    team: "백엔드 3명",
    role: "백엔드 개발자",
    achievements: [
      "중앙화된 인증으로 보안 정책 일관성 확보",
      "Redis 기반 토큰 블랙리스트로 즉시 로그아웃 구현",
      "Rate Limiting으로 API 남용 방지",
      "OAuth2 소셜 로그인 연동 (Google, Kakao, Naver)",
    ],
    techStack: {
      backend: ["Spring Cloud Gateway", "Spring Security", "JWT", "Redis"],
      auth: ["OAuth2", "Social Login"],
      monitoring: ["Prometheus", "Grafana"],
    },
    github: "https://github.com/username/api-gateway",
    demo: null,
    blog: null,
  },
]

export default function ProjectsPage() {
  return <ProjectsClient projects={projects} />
}
