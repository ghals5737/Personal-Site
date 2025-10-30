import type { Metadata } from "next"
import { ContactForm } from "@/components/contact/contact-form"
import { Mail, Github, Linkedin, Twitter } from "lucide-react"

export const metadata: Metadata = {
  title: "연락",
  description: "연락처 및 문의",
}

const contactInfo = [
  {
    icon: Mail,
    label: "이메일",
    value: "contact@example.com",
    href: "mailto:contact@example.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/username",
    href: "https://github.com/username",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/username",
    href: "https://linkedin.com/in/username",
  },
  {
    icon: Twitter,
    label: "Twitter",
    value: "@username",
    href: "https://twitter.com/username",
  },
]

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">연락하기</h1>
          <p className="text-lg text-muted-foreground">
            새로운 기회와 협업에 항상 열려있습니다. 아래 양식을 통해 연락주시거나 직접 이메일을 보내주세요.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold">메시지 보내기</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold">연락처</h2>
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith("http") ? "_blank" : undefined}
                    rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-accent/50"
                  >
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="mb-1 font-semibold">{info.label}</div>
                      <div className="text-sm text-muted-foreground">{info.value}</div>
                    </div>
                  </a>
                )
              })}
            </div>

            <div className="mt-8 rounded-lg border bg-muted/50 p-6">
              <h3 className="mb-2 font-semibold">응답 시간</h3>
              <p className="text-sm text-muted-foreground">
                보통 24시간 이내에 답변드립니다. 주말이나 공휴일에는 조금 더 시간이 걸릴 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
