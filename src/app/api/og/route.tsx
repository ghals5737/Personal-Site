import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const title = searchParams.get("title") || "황호민 | 백엔드 중심 풀스택 개발자"
    const description = searchParams.get("description") || "Java/Kotlin/Spring Boot, Next.js/TypeScript"

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0f172a",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: "white",
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#94a3b8",
              maxWidth: "800px",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
            }}
          />
          <div
            style={{
              fontSize: 28,
              color: "#e2e8f0",
            }}
          >
            황호민 포트폴리오
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error(e)
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}
