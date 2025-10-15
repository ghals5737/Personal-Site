import { Github, Twitter, Linkedin, Mail, MapPin, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { generateMetadata } from '@/components/seo/metadata'

export const metadata = generateMetadata({
  title: 'About',
  description: 'Learn more about me, my background, and my passion for web development',
})

const skills = [
  'JavaScript/TypeScript',
  'React/Next.js',
  'Node.js',
  'Python',
  'Docker',
  'AWS',
  'PostgreSQL',
  'MongoDB',
  'Tailwind CSS',
  'Git',
]

const experience = [
  {
    title: 'Senior Full-Stack Developer',
    company: 'Your Company',
    period: '2022 - Present',
    description: 'Leading development of scalable web applications using modern technologies.',
  },
  {
    title: 'Frontend Developer',
    company: 'Previous Company',
    period: '2020 - 2022',
    description: 'Developed responsive web applications and improved user experience.',
  },
  {
    title: 'Junior Developer',
    company: 'Startup Company',
    period: '2019 - 2020',
    description: 'Built and maintained web applications while learning modern development practices.',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-6xl font-bold text-primary-foreground">
            Y
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Hi, I&apos;m Your Name
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Full-stack developer passionate about creating beautiful, performant web applications
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Your City, Country</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Available for work</span>
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
              I&apos;m a passionate full-stack developer with over 5 years of experience building 
              scalable web applications. I specialize in modern JavaScript frameworks, 
              particularly React and Next.js, and have a strong background in backend 
              development with Node.js and Python.
            </p>
            <p>
              My journey in web development started during my computer science studies, 
              where I fell in love with the intersection of design and technology. 
              I enjoy creating user-friendly interfaces and solving complex problems 
              through clean, maintainable code.
            </p>
            <p>
              When I&apos;m not coding, you can find me writing technical blog posts, 
              contributing to open-source projects, or exploring new technologies. 
              I believe in continuous learning and sharing knowledge with the community.
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
                href="https://github.com/yourusername"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="font-medium">GitHub</span>
              </a>
              <a
                href="https://twitter.com/yourhandle"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="font-medium">Twitter</span>
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="font-medium">LinkedIn</span>
              </a>
              <a
                href="mailto:your.email@example.com"
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
