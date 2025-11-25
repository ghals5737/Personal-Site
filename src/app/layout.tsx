import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/providers/theme-provider"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: {
    default: "황호민 | 백엔드 중심 풀스택 개발자",
    template: "%s | 황호민",
  },
  description: "Java/Kotlin/Spring Boot, Next.js/TypeScript 기반 백엔드 중심 풀스택 개발자의 이력서와 기술 블로그",
  keywords: ["백엔드 개발자", "풀스택 개발자", "Spring Boot", "Next.js", "TypeScript", "Java", "Kotlin"],
  authors: [{ name: "황호민" }],
  creator: "황호민",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    siteName: "황호민 포트폴리오",
    title: "황호민 | 백엔드 중심 풀스택 개발자",
    description: "Java/Kotlin/Spring Boot, Next.js/TypeScript 기반 백엔드 중심 풀스택 개발자의 이력서와 기술 블로그",
  },
  twitter: {
    card: "summary_large_image",
    title: "황호민 | 백엔드 중심 풀스택 개발자",
    description: "Java/Kotlin/Spring Boot, Next.js/TypeScript 기반 백엔드 중심 풀스택 개발자의 이력서와 기술 블로그",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
