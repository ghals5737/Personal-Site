"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"

const contactSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다").max(50, "이름은 최대 50자까지 가능합니다"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  subject: z.string().min(5, "제목은 최소 5자 이상이어야 합니다").max(100, "제목은 최대 100자까지 가능합니다"),
  message: z.string().min(10, "메시지는 최소 10자 이상이어야 합니다").max(1000, "메시지는 최대 1000자까지 가능합니다"),
  honeypot: z.string().max(0, "스팸으로 감지되었습니다"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      honeypot: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading")
    setErrorMessage("")

    try {
      const result = await submitContactForm(data)

      if (result.success) {
        setStatus("success")
        reset()
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setErrorMessage(result.error || "메시지 전송에 실패했습니다")
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("메시지 전송 중 오류가 발생했습니다")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot field for spam protection */}
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">이름 *</Label>
        <Input id="name" {...register("name")} placeholder="홍길동" disabled={status === "loading"} />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">이메일 *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="example@email.com"
          disabled={status === "loading"}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject">제목 *</Label>
        <Input
          id="subject"
          {...register("subject")}
          placeholder="문의 제목을 입력해주세요"
          disabled={status === "loading"}
        />
        {errors.subject && <p className="text-sm text-destructive">{errors.subject.message}</p>}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">메시지 *</Label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="메시지를 입력해주세요"
          rows={6}
          disabled={status === "loading"}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-green-900 dark:text-green-100">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">메시지가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-900 dark:text-red-100">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            전송 중...
          </>
        ) : (
          "메시지 보내기"
        )}
      </Button>
    </form>
  )
}
