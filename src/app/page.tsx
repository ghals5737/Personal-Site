import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Github, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { posts } from '@/lib/posts'

export default function Home() {
  const recentPosts = posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-4xl font-bold text-primary-foreground">
                황
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                황호민
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              새로운 도전을 좋아하는 백엔드 개발자입니다. 
              안정적이고 확장 가능한 소프트웨어 아키텍처를 지향합니다.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg">
              <Link href="/blog">
                Read My Blog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                View Projects
              </Link>
            </Button>
          </div>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/ghals5737"
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="mailto:ghals5737@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </section> */}

      {/* Recent Posts */}
      {/* {recentPosts.length > 0 && (
        <section className="py-20 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Recent Blog Posts
              </h2>
              <p className="text-xl text-muted-foreground">
                Latest thoughts on web development and technology
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <Card key={post._id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {post.image && (
                      <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <time>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span>{Math.ceil(post.body.raw.split(' ').length / 200)} min read</span>
                    </div>
                    <Button asChild variant="ghost" className="w-full mt-4">
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">
                  View All Posts
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )} */}

      {/* About Preview */}
      {/* <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            백엔드 개발자로서 Java, Spring Boot, Node.js를 주로 사용하며, 
            안정적이고 확장 가능한 시스템 설계에 관심이 많습니다.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </section> */}
    </div>
  )
}
