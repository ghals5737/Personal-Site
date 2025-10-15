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
    title: 'Personal Site & Technical Blog',
    description: 'A modern personal website built with Next.js 14, TypeScript, and Tailwind CSS featuring a technical blog with MDX support',
    date: '2024-01-10',
    published: true,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX', 'Contentlayer'],
    github: 'https://github.com/yourusername/personal-site',
    demo: 'https://mydomain.tld',
    image: '/images/projects/personal-site.jpg',
    slug: 'personal-site',
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
          A collection of projects I&apos;ve worked on, from web applications to open-source contributions
        </p>
      </header>

      {/* Projects Grid */}
      {publishedProjects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {publishedProjects.map((project) => (
            <Card key={project.id} className="group hover:shadow-lg transition-shadow">
              {/* Featured Image */}
              {project.image && (
                <div className="relative aspect-video rounded-t-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}

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
            <h2 className="text-2xl font-bold mb-4">Have a project in mind?</h2>
            <p className="text-muted-foreground mb-6">
              I&apos;m always interested in new opportunities and collaborations. 
              Let&apos;s discuss how we can work together!
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <a href="mailto:your.email@example.com">
                  Get In Touch
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/about">
                  Learn More About Me
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}