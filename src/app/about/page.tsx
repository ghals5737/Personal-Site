import { Github, Mail, MapPin, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generateMetadata } from '@/components/seo/metadata'

export const metadata = generateMetadata({
  title: 'About',
  description: 'Learn more about me, my background, and my passion for web development',
})

const skills = [
  'Java',
  'Spring Boot',
  'MySQL',
  'Oracle',
  'Next.js',
  'Node.js',
  'Google Cloud Platform',
  'AWS',
  'React',
  'REST API',
  'Kotlin',
  'PostgreSQL',
  'Docker',
  'TypeScript',
  'Flutter',
  'Redis',
  'Nginx',
  'GitHub Actions',
  'Terraform',
  'ECS',
]

const experience = [
  {
    title: '풀스택 엔지니어',
    company: '휴브알엔씨주식회사',
    period: '2025.01. ~ 재직 중 (10개월)',
    description: 'SNSB-3 인지검사 채점/운영 플랫폼 전체 설계·개발, 문서·리포트 파이프라인 최적화, API 성능 개선, 인프라/배포 자동화',
  },
  {
    title: '백엔드 개발자',
    company: '스윗코리아',
    period: '2023.05. ~ 2024.06. (1년 2개월)',
    description: '사내 에디터/백오피스 도구 고도화, 개발자 플랫폼 개발, 인하우스툴 개발, OAuth + JWT 관리자 인증 시스템 구축',
  },
  {
    title: '연구원',
    company: '웅진씽크빅',
    period: '2021.08. ~ 2023.04. (1년 9개월)',
    description: '차세대 통합 LMS 백엔드 개발, MSA 전환, Spring Boot+JPA 도입, 쿼리 튜닝 및 성능 최적화',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-6xl font-bold text-primary-foreground">
            황
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Hi, I&apos;m 황호민
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          새로운 도전을 좋아하는 백엔드 개발자
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>대한민국</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>휴브알엔씨 재직 중</span>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none dark:prose-invert">
            <p>
              SW 엔지니어 황호민입니다. 오래 안정적으로 사용할 수 있는 구조를 지향하며, 
              소프트웨어 아키텍처와 설계에 꾸준히 관심을 두고 있습니다. 
              주로 사용하는 기술을 단순히 적용하는 데 그치지 않고, 
              동작 원리와 트레이드오프를 깊이 이해해 더 나은 품질과 유지보수성을 추구합니다.
            </p>
            <p>
              업무 중 마주한 기술적 과제는 개인 학습으로 보완하며, 
              팀 내 스터디·코드리뷰, 책·온라인 강의·오픈소스 코드 분석 등 
              다양한 방법으로 역량을 꾸준히 쌓고 있습니다. 
              실무에 쓰이는 기술을 가장 중요하게 여기며, 
              해당 영역만큼은 누구보다 자세히 이해하려 노력하고 있습니다.
            </p>
            <p>
              현재 휴브알엔씨에서 SNSB-3 인지검사 플랫폼의 풀스택 개발을 담당하고 있으며, 
              백엔드·DB·웹 백오피스·인프라를 총괄하는 역할을 수행하고 있습니다.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Skills & Technologies</CardTitle>
            <CardDescription>
              Technologies and tools I work with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Professional Experience</CardTitle>
            <CardDescription>
              My journey in web development
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {experience.map((job, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                <p className="text-muted-foreground font-medium mb-2">{job.company}</p>
                <p className="text-sm text-muted-foreground mb-3">{job.period}</p>
                <p className="text-muted-foreground">{job.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Contact */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Let&apos;s Connect</CardTitle>
            <CardDescription>
              I&apos;m always interested in new opportunities and collaborations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="https://github.com/ghals5737"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="font-medium">GitHub</span>
              </a>
              <a
                href="mailto:ghals5737@gmail.com"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="font-medium">Email</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
