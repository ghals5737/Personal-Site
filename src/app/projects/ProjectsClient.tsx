"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/projects/project-card"
import { ProjectDetailDialog } from "@/components/projects/project-detail-dialog"
import { Button } from "@/components/ui/button"

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

interface ProjectsClientProps {
  projects: Project[]
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const categories = ["All", "Backend", "Frontend", "DevOps", "Performance"]

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">프로젝트</h1>
          <p className="text-lg text-muted-foreground">
            실무에서 진행한 주요 프로젝트들입니다. 각 프로젝트의 기술 스택, 역할, 성과를 확인하실 수 있습니다.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} onClick={() => setSelectedProject(project)} className="cursor-pointer">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">해당 카테고리의 프로젝트가 없습니다.</div>
        )}

        {/* Project Detail Dialog */}
        {selectedProject && (
          <ProjectDetailDialog
            project={selectedProject}
            open={!!selectedProject}
            onOpenChange={(open) => !open && setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  )
}
