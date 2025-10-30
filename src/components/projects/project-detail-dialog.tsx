import Link from "next/link"
import { ExternalLink, Github, BookOpen } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  category: string
  tags: string[]
  period: string
  team: string
  role: string
  achievements: string[]
  techStack: Record<string, string[]>
  github?: string | null
  demo?: string | null
  blog?: string | null
}

interface ProjectDetailDialogProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailDialog({ project, open, onOpenChange }: ProjectDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="space-y-6 pr-6">
            {/* Basic Info */}
            <div>
              <p className="text-muted-foreground">{project.longDescription}</p>
            </div>

            {/* Meta Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-1 text-sm font-semibold text-muted-foreground">기간</h3>
                <p>{project.period}</p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-muted-foreground">팀 구성</h3>
                <p>{project.team}</p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-muted-foreground">역할</h3>
                <p>{project.role}</p>
              </div>
              <div>
                <h3 className="mb-1 text-sm font-semibold text-muted-foreground">카테고리</h3>
                <Badge>{project.category}</Badge>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">주요 성과</h3>
              <ul className="space-y-2">
                {project.achievements.map((achievement, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">기술 스택</h3>
              <div className="space-y-3">
                {Object.entries(project.techStack).map(([category, techs]) => (
                  <div key={category}>
                    <h4 className="mb-2 text-sm font-semibold capitalize text-muted-foreground">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <Button asChild variant="outline">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.demo && (
                <Button asChild variant="outline">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Demo
                  </a>
                </Button>
              )}
              {project.blog && (
                <Button asChild variant="outline">
                  <Link href={project.blog}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    관련 글 보기
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
