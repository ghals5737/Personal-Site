import type { Metadata } from "next"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Uses",
  description: "개발 환경 및 사용 도구",
}

const tools = [
  {
    category: "개발 환경",
    items: [
      { name: "IntelliJ IDEA Ultimate", description: "주력 Java/Kotlin IDE" },
      { name: "VS Code", description: "프론트엔드 및 스크립트 작성" },
      { name: "iTerm2 + Oh My Zsh", description: "터미널 환경" },
      { name: "Postman", description: "API 테스트 및 문서화" },
    ],
  },
  {
    category: "생산성 도구",
    items: [
      { name: "Notion", description: "문서 작성 및 지식 관리" },
      { name: "Obsidian", description: "개인 노트 및 학습 기록" },
      { name: "Slack", description: "팀 커뮤니케이션" },
      { name: "Jira", description: "프로젝트 관리" },
    ],
  },
  {
    category: "디자인 & 협업",
    items: [
      { name: "Figma", description: "UI/UX 디자인 및 프로토타이핑" },
      { name: "Excalidraw", description: "다이어그램 및 스케치" },
      { name: "GitHub", description: "버전 관리 및 협업" },
    ],
  },
  {
    category: "하드웨어",
    items: [
      { name: 'MacBook Pro 16" M2', description: "주력 개발 머신" },
      { name: 'LG 27" 4K 모니터', description: "외장 디스플레이" },
      { name: "Magic Keyboard", description: "키보드" },
      { name: "Magic Trackpad", description: "트랙패드" },
    ],
  },
]

export default function UsesPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Uses</h1>
          <p className="text-lg text-muted-foreground">개발 환경과 생산성을 위해 사용하는 도구들을 소개합니다.</p>
        </div>

        <div className="space-y-12">
          {tools.map((section) => (
            <section key={section.category}>
              <h2 className="mb-6 text-2xl font-semibold">{section.category}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {section.items.map((item) => (
                  <Card key={item.name} className="p-4">
                    <h3 className="mb-1 font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
