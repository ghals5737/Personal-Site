'use client'

import { Children, useState } from "react"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, Info, CheckCircle2, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type PreChild = React.ReactElement<{
  className?: string
  children?: string
  "data-language"?: string
}>

interface CalloutProps {
  type?: "info" | "warning" | "success"
  children: React.ReactNode
}

export function Callout({ type = "info", children }: Readonly<CalloutProps>) {
  const styles = {
    info: {
      container: "border-l-4 border-blue-500/70 text-blue-900 dark:text-blue-100",
      icon: <Info className="h-5 w-5 text-blue-500" />,
    },
    warning: {
      container: "border-l-4 border-yellow-500/70 text-yellow-900 dark:text-yellow-100",
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    },
    success: {
      container: "border-l-4 border-green-500/70 text-green-900 dark:text-green-100",
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    },
  }

  const style = styles[type]

  return (
    <div className={cn("my-8 flex gap-3 rounded-2xl bg-transparent px-4 py-2", style.container)}>
      <div className="flex-shrink-0 pt-1">{style.icon}</div>
      <div className="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-100 [&>p]:m-0">{children}</div>
    </div>
  )
}

// function Pre({ children, className, ...props }: Readonly<React.HTMLAttributes<HTMLPreElement>>) {
//   const [copied, setCopied] = useState(false)
//   const child = Children.only(children) as PreChild
//   const code = typeof child.props.children === "string" ? child.props.children : ""
//   const language = child.props["data-language"] || child.props.className?.replace("language-", "") || "text"

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(code)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 1800)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   return (
//     <div className="group my-10 overflow-hidden rounded-2xl border border-border/60 bg-muted/20 transition-colors">
//       <div className="flex items-center justify-between border-b border-border/60 bg-transparent px-4 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
//         <span className="font-semibold tracking-[0.25em]">{language}</span>
//         <Button
//           type="button"
//           size="sm"
//           variant="ghost"
//           className="h-7 px-2 text-[11px] text-muted-foreground hover:bg-muted/40"
//           onClick={handleCopy}
//         >
//           {copied ? (
//             <>
//               <Check className="mr-1 h-3 w-3" />
//               복사됨
//             </>
//           ) : (
//             <>
//               <Copy className="mr-1 h-3 w-3" />
//               코드 복사
//             </>
//           )}
//         </Button>
//       </div>
//       <pre className={cn("overflow-x-auto bg-transparent p-4 text-sm leading-relaxed text-slate-900 dark:text-slate-100", className)} {...props}>
//         {children}
//       </pre>
//     </div>
//   )
// }

function Pre({ children, className, ...props }: Readonly<React.HTMLAttributes<HTMLPreElement>>) {
  const [copied, setCopied] = useState(false)
  const child = Children.only(children) as PreChild
  const code = typeof child.props.children === "string" ? child.props.children : ""
  const language = child.props["data-language"] || child.props.className?.replace("language-", "") || "text"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="group my-8 overflow-hidden rounded-2xl border border-border/60 bg-[#f6f8fa] dark:bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-border/60 bg-[#f6f8fa] dark:bg-[#161b22] px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        <span className="font-semibold">{language}</span>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-7 px-2 text-[11px] text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="mr-1 h-3 w-3" />
              복사됨
            </>
          ) : (
            <>
              <Copy className="mr-1 h-3 w-3" />
              코드 복사
            </>
          )}
        </Button>
      </div>

      <pre
        className={cn(
          // GitHub code block 느낌
          "overflow-x-auto p-4 text-[13px] leading-relaxed font-mono",
          "bg-[#f6f8fa] text-[#24292e] dark:bg-[#0d1117] dark:text-[#e6edf3]",
          // MDX에서 <pre><code> 구조일 때 code에 들어가는 기본 배경/패딩 제거
          "[&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit",
          // 긴 줄도 보기 좋게
          "whitespace-pre",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}



const UnorderedList = ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={cn("my-5 list-disc space-y-2 pl-6 marker:text-primary", className)} {...props} />
)

const OrderedList = ({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) => (
  <ol className={cn("my-5 list-decimal space-y-2 pl-6 marker:text-primary", className)} {...props} />
)

export const mdxComponents = {
  h1: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className={cn("mt-8 mb-4 text-4xl font-bold tracking-tight", className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cn(
        "mt-12 mb-6 text-3xl font-semibold tracking-tight text-foreground",
        "scroll-m-28 border-l-4 border-primary/70 pl-5",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cn(
        "mt-10 mb-4 text-2xl font-semibold tracking-tight text-foreground",
        "scroll-m-24 text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"h4">) => (
    <h4 className={cn("mt-6 mb-3 text-xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h4>
  ),
  p: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className={cn("mb-5 leading-relaxed text-foreground text-base md:text-[1.02rem]", className)} {...props}>
      {children}
    </p>
  ),
  a: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"a">) => (
    <a
      className={cn(
        "font-semibold text-primary underline-offset-4 transition hover:text-primary/80 hover:underline",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
  ul: UnorderedList,
  ol: OrderedList,
  li: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"li">) => (
    <li className={cn("leading-relaxed text-foreground/90", className)} {...props}>
      {children}
    </li>
  ),
  blockquote: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn(
        "my-10 border-l-4 border-primary/70 pl-6 text-base italic text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }: React.ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  ),
  pre: Pre,
  hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-16 border-t border-border/30" {...props} />
  ),
  Image: ({ alt = "", ...props }: React.ComponentProps<typeof Image>) => (
    <Image className="rounded-2xl" alt={alt} {...props} />
  ),
  table: ({ className, ...props }: React.ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border/40">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: React.ComponentPropsWithoutRef<"thead">) => (
    <thead className={cn("bg-muted/50 [&_tr]:border-b", className)} {...props} />
  ),
  tr: ({ className, ...props }: React.ComponentPropsWithoutRef<"tr">) => (
    <tr
      className={cn(
        "border-b border-border/50 transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentPropsWithoutRef<"th">) => (
    <th
      className={cn(
        "h-10 px-4 text-left align-middle font-semibold text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentPropsWithoutRef<"td">) => (
    <td
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-700 dark:text-gray-300", // 여기도 글자색 조정
        className
      )}
      {...props}
    />
  ),
  Link,
  Callout,
}
