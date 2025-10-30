import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    tags: string[]
    github: string | null
    demo: string | null
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <h3 className="mb-2 text-xl font-bold tracking-tight">{project.title}</h3>

      <p className="mb-4 flex-1 text-pretty text-muted-foreground">{project.description}</p>

      <div className="flex gap-2">
        {project.github && (
          <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        )}
        {project.demo && (
          <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Demo
            </a>
          </Button>
        )}
      </div>
    </Card>
  )
}
