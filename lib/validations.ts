import { z } from "zod"

// Vietnamese phone number regex
export const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/

export const leadFormSchema = z.object({
  name: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự." }),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Số điện thoại không hợp lệ (Ví dụ: 0912345678)." }),
  email: z
    .string()
    .email({ message: "Email không đúng định dạng." })
    .or(z.literal(""))
    .optional(),
  product: z.string().min(1, { message: "Vui lòng chọn sản phẩm." }),
  size: z.string().min(1, { message: "Vui lòng chọn size." }),
  message: z.string().optional(),
})

export type LeadFormData = z.infer<typeof leadFormSchema>
