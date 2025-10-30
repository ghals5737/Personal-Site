import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, Info, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalloutProps {
  type?: "info" | "warning" | "success"
  children: React.ReactNode
}

export function Callout({ type = "info", children }: CalloutProps) {
  const styles = {
    info: {
      container: "border-blue-500/50 bg-blue-500/10 text-blue-900 dark:text-blue-100",
      icon: <Info className="h-5 w-5 text-blue-500" />,
    },
    warning: {
      container: "border-yellow-500/50 bg-yellow-500/10 text-yellow-900 dark:text-yellow-100",
      icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    },
    success: {
      container: "border-green-500/50 bg-green-500/10 text-green-900 dark:text-green-100",
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    },
  }

  const style = styles[type]

  return (
    <div className={cn("my-6 flex gap-3 rounded-lg border-l-4 p-4", style.container)}>
      <div className="flex-shrink-0">{style.icon}</div>
      <div className="flex-1 text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  )
}

export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("mt-8 mb-4 text-4xl font-bold tracking-tight", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("mt-8 mb-4 text-3xl font-bold tracking-tight", className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("mt-6 mb-3 text-2xl font-semibold tracking-tight", className)} {...props} />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn("mt-6 mb-3 text-xl font-semibold tracking-tight", className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("mb-4 leading-relaxed text-pretty", className)} {...props} />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("font-medium text-primary underline underline-offset-4 hover:no-underline", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-4 ml-6 list-disc space-y-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-4 ml-6 list-decimal space-y-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn("my-6 border-l-4 border-primary/50 pl-6 italic text-muted-foreground", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={cn("rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-medium", className)} {...props} />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg border bg-muted/50 p-4 font-mono text-sm leading-relaxed",
        className,
      )}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border border-border bg-muted px-4 py-2 text-left font-semibold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  Image: (props: any) => <Image className="rounded-lg" {...props} />,
  Link,
  Callout,
}
