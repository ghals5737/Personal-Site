"use server"

import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  subject: z.string().min(5).max(100),
  message: z.string().min(10).max(1000),
  honeypot: z.string().max(0),
})

type ContactFormData = z.infer<typeof contactSchema>

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate data
    const validatedData = contactSchema.parse(data)

    // Check honeypot
    if (validatedData.honeypot) {
      return { success: false, error: "스팸으로 감지되었습니다" }
    }

    // Here you would typically:
    // 1. Send email using a service like Resend, SendGrid, etc.
    // 2. Save to database
    // 3. Send to a webhook

    // For now, we'll just log it
    console.log("Contact form submission:", {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
    })

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In production, you would integrate with an email service:
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'contact@yourdomain.com',
      to: 'your-email@example.com',
      subject: `Contact Form: ${validatedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `
    })
    */

    return { success: true }
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return { success: false, error: "입력 데이터가 올바르지 않습니다" }
    }

    return { success: false, error: "메시지 전송에 실패했습니다" }
  }
}
