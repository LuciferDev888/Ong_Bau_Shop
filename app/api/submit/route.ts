import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, product, size, campaignName } = body

    // Server-side validation
    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng nhập Họ tên và Số điện thoại.",
        },
        { status: 400 }
      )
    }

    // Forward to configured external webhook if it exists
    const webhookUrl = process.env.FORM_SUBMIT_WEBHOOK_URL
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.FORM_SUBMIT_SECRET || ""}`,
          },
          body: JSON.stringify({
            event: "lead_captured",
            timestamp: new Date().toISOString(),
            data: { name, phone, email, product, size, campaignName },
          }),
        })

        if (!response.ok) {
          console.warn(
            "External CRM webhook responded with error status:",
            response.status
          )
        }
      } catch (err) {
        console.error("Failed to forward lead to webhook URL:", err)
        // We do not fail the request to the user if the external webhook is down
      }
    }

    // Log internally for debugging/audit logs
    console.log("Lead captured successfully:", {
      name,
      phone,
      email,
      product,
      size,
      campaignName,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: "Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ trong ít phút.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in lead submission route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi hệ thống. Vui lòng thử lại sau.",
      },
      { status: 500 }
    )
  }
}
