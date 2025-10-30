"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/posts-data"

interface BlogPostContentProps {
  post: Post
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-6">
      <div className="flex items-center justify-between rounded-t-lg bg-slate-800 px-4 py-2">
        <span className="text-xs font-medium text-slate-300">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-7 text-xs text-slate-300 hover:bg-slate-700 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="mr-1 h-3 w-3" />
              복사됨
            </>
          ) : (
            <>
              <Copy className="mr-1 h-3 w-3" />
              복사
            </>
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-b-lg bg-slate-900 p-4">
        <code className="text-sm text-slate-100">{code}</code>
      </pre>
    </div>
  )
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  // Sample content structure matching the screenshot
  const sampleSqlCode = `-- 사용자 목록 조회 (1번)
SELECT * FROM users;

-- 각 사용자의 프로필 조회 (N번)
SELECT * FROM profiles WHERE user_id = 1;
SELECT * FROM profiles WHERE user_id = 2;
SELECT * FROM profiles WHERE user_id = 3;
...`

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h2 id="들어가며">들어가며</h2>
      <p>
        대규모 트래픽을 처리하는 서비스를 운영하다 보면 성능 최적화는 필수적인 과제입니다. 이번 글에서는 실제 프로덕션
        환경에서 Spring Boot 애플리케이션의 API 응답 시간을 300ms에서 100ms로 개선한 과정을 공유하고자 합니다.
      </p>

      <h2 id="문제-상황">문제 상황</h2>
      <p>
        서비스 사용자가 증가하면서 특정 API의 응답 시간이 점점 느려지는 현상이 발생했습니다. 모니터링 결과 평균 응답
        시간이 300ms를 넘어서고, 피크 타임에는 500ms까지 치솟는 상황이었습니다.
      </p>

      <h3 id="n1-쿼리-문제">N+1 쿼리 문제</h3>
      <p>
        가장 큰 문제는 JPA의 지연 로딩으로 인한 N+1 쿼리였습니다. 사용자 목록을 조회할 때마다 각 사용자의 연관 엔티티를
        개별적으로 조회하면서 불필요한 쿼리가 수백 개씩 발생했습니다.
      </p>

      <CodeBlock language="SQL" code={sampleSqlCode} />

      <h3 id="느린-응답-시간">느린 응답 시간</h3>
      <p>
        데이터베이스 쿼리 외에도 의부 API 호출, 복잡한 비즈니스 로직 등이 동기적으로 실행되면서 전체 응답 시간을
        지연시켰습니다.
      </p>

      <h2 id="해결-방법">해결 방법</h2>

      <h3 id="fetch-join-적용">Fetch Join 적용</h3>
      <p>
        N+1 문제를 해결하기 위해 JPQL의 Fetch Join을 적용했습니다. 이를 통해 연관된 엔티티를 한 번의 쿼리로 조회할 수
        있었습니다.
      </p>

      <h3 id="캐싱-전략">캐싱 전략</h3>
      <p>
        자주 조회되지만 변경이 적은 데이터에 대해서는 Redis 캐싱을 적용했습니다. Cache-Aside 패턴을 사용하여
        데이터베이스 부하를 크게 줄일 수 있었습니다.
      </p>

      <h2 id="성과">성과</h2>
      <p>
        위의 최적화 작업을 통해 API 응답 시간을 평균 100ms로 단축할 수 있었습니다. 피크 타임에도 안정적으로 150ms 이내의
        응답 시간을 유지하고 있습니다.
      </p>

      <h2 id="마치며">마치며</h2>
      <p>
        성능 최적화는 단순히 코드를 개선하는 것을 넘어, 시스템 전체를 이해하고 병목 지점을 정확히 파악하는 것이
        중요합니다. 앞으로도 지속적인 모니터링과 개선을 통해 더 나은 사용자 경험을 제공하겠습니다.
      </p>
    </div>
  )
}
