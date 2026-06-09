import { useState } from "react"
import { trackFormSubmit } from "@/lib/analytics"

export function useFormSubmit(campaignName: string) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitForm = async (data: any): Promise<boolean> => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          campaignName,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Đã xảy ra lỗi khi gửi thông tin.")
      }

      setSuccess(true)
      trackFormSubmit(campaignName, true)
      return true
    } catch (err: any) {
      const errorMessage = err.message || "Không thể kết nối đến máy chủ."
      setError(errorMessage)
      trackFormSubmit(campaignName, false)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    submitForm,
    loading,
    success,
    error,
    setSuccess,
  }
}
