import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Now",
  description: "요즘 근황",
}

export default function NowPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Now</h1>
          <p className="text-sm text-muted-foreground">마지막 업데이트: 2024년 3월</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>요즘 하고 있는 것들</h2>

          <h3>일</h3>
          <ul>
            <li>전자상거래 플랫폼의 MSA 전환 프로젝트 진행 중</li>
            <li>Kotlin Coroutine을 활용한 비동기 처리 최적화</li>
            <li>팀 내 코드 리뷰 문화 정착을 위한 가이드라인 작성</li>
          </ul>

          <h3>학습</h3>
          <ul>
            <li>Kubernetes 심화 학습 (CKA 자격증 준비)</li>
            <li>도메인 주도 설계(DDD) 스터디</li>
            <li>함수형 프로그래밍 패러다임 연구</li>
          </ul>

          <h3>개인 프로젝트</h3>
          <ul>
            <li>개발자를 위한 기술 블로그 플랫폼 개발</li>
            <li>오픈소스 프로젝트 기여 (Spring Boot, Kotlin)</li>
          </ul>

          <h3>관심사</h3>
          <ul>
            <li>클린 아키텍처와 헥사고날 아키텍처</li>
            <li>이벤트 기반 아키텍처 (Event-Driven Architecture)</li>
            <li>개발 생산성 향상을 위한 도구와 방법론</li>
          </ul>

          <h3>여가</h3>
          <ul>
            <li>주말 등산 (북한산, 관악산)</li>
            <li>기술 서적 읽기 (최근: &quot;가상 면접 사례로 배우는 대규모 시스템 설계 기초&quot;)</li>
            <li>개발 컨퍼런스 참석 및 네트워킹</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
