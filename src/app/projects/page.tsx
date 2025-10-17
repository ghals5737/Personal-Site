import Image from 'next/image'
import { ExternalLink, Github, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { generateMetadata } from '@/components/seo/metadata'

export const metadata = generateMetadata({
  title: 'Projects',
  description: 'A showcase of my recent projects and side projects',
})

const projects = [
  {
    id: '1',
    title: 'SNSB-3 인지검사 플랫폼',
    description: '노인 종합 신경심리검사 배터리 3판 디지털 전환 플랫폼. 검사 기록 중심의 도메인 모델 설계, AWS 인프라 아키텍처, Next.js 백오피스 개발',
    date: '2025-02-01',
    published: true,
    tags: ['Kotlin', 'Spring Boot', 'Next.js', 'TypeScript', 'AWS', 'ECS', 'PostgreSQL', 'Terraform'],
    github: 'https://github.com/ghals5737',
    demo: null,
    image: '/images/projects/snsb3.jpg',
    slug: 'snsb3-platform',
  },
  {
    id: '2',
    title: '개발자 플랫폼',
    description: '외부 개발자들이 Swit API를 손쉽게 활용할 수 있도록 오픈 API 설계 및 SaaS 플랫폼 확장. 서드파티 앱 연동 플랫폼 개발',
    date: '2023-12-01',
    published: true,
    tags: ['Next.js', 'TypeScript', 'OAuth', 'JWT', 'GCP', 'Cloud Run', 'REST API'],
    github: 'https://github.com/ghals5737',
    demo: null,
    image: '/images/projects/developer-platform.jpg',
    slug: 'developer-platform',
  },
  {
    id: '3',
    title: '인하우스툴 고도화',
    description: '테크니컬 라이터를 위한 문서 작업 및 이메일 작성 도구. Flask + Vanilla JS에서 Next.js + TypeScript로 전면 리팩토링',
    date: '2023-05-01',
    published: true,
    tags: ['Next.js', 'TypeScript', 'Flask', 'GCP', 'Cloud Build', 'OAuth'],
    github: 'https://github.com/ghals5737',
    demo: null,
    image: '/images/projects/inhouse-tools.jpg',
    slug: 'inhouse-tools',
  },
  {
    id: '4',
    title: '차세대 통합 LMS',
    description: 'MyBatis에서 JPA로 전환, MSA 구조 적용, 쿼리 최적화를 통한 시스템 확장성과 유지보수성 향상',
    date: '2022-01-01',
    published: true,
    tags: ['Java', 'Spring Boot', 'JPA', 'MyBatis', 'AWS', 'CodeDeploy', 'MySQL'],
    github: 'https://github.com/ghals5737',
    demo: null,
    image: '/images/projects/lms.jpg',
    slug: 'nextgen-lms',
  },
]

export default function ProjectsPage() {
  const publishedProjects = projects.filter(project => project.published)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Projects</h1>
        <p className="text-xl text-muted-foreground">
          백엔드 개발자로서 참여한 주요 프로젝트들을 소개합니다
        </p>
      </header>

      {/* Projects Grid */}
      {publishedProjects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {publishedProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-shadow">
              {/* Featured Image */}
              <div className="relative aspect-video rounded-t-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary/60">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                )}
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Calendar className="h-3 w-3" />
                      <time>
                        {new Date(project.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="line-clamp-3 mb-4">
                  {project.description}
                </CardDescription>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 4} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-2">
                  {project.demo && (
                    <Button asChild size="sm" variant="default">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Demo
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button asChild size="sm" variant="outline">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <Github className="h-3 w-3" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg font-medium mb-2">No projects yet</h3>
            <p>Projects will be displayed here once they&apos;re published.</p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <Card className="bg-muted/30">
          <CardContent className="pt-8">
            <h2 className="text-2xl font-bold mb-4">프로젝트 협업을 원하시나요?</h2>
            <p className="text-muted-foreground mb-6">
              새로운 기회와 협업에 항상 관심이 있습니다. 
              함께 일할 수 있는 방법을 논의해보세요!
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <a href="mailto:ghals5737@gmail.com">
                  연락하기
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/about">
                  더 알아보기
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}