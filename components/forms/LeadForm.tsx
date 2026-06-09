"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { useFormSubmit } from "@/hooks/useFormSubmit"
import { useLanguage } from "@/hooks/useLanguage"

// Vietnamese phone number validation regex
const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/

interface LeadFormProps {
  campaignName: string
  products: { id: string; name: string; category: string; sizes?: string[] }[]
  defaultProductId?: string
  defaultSize?: string
  onClose?: () => void
}

export function LeadForm({
  campaignName,
  products,
  defaultProductId = "",
  defaultSize = "",
  onClose,
}: LeadFormProps) {
  const { locale } = useLanguage()
  const { submitForm, loading, success, error, setSuccess } =
    useFormSubmit(campaignName)

  const isVi = locale === "vi"

  // Dynamic Zod Schema for translations
  const validationSchema = z.object({
    name: z.string().min(2, {
      message: isVi
        ? "Họ tên phải có ít nhất 2 ký tự."
        : "Name must be at least 2 characters.",
    }),
    phone: z.string().regex(phoneRegex, {
      message: isVi
        ? "Số điện thoại không hợp lệ (Ví dụ: 0912345678)."
        : "Invalid phone number (Example: 0912345678).",
    }),
    email: z
      .string()
      .email({
        message: isVi ? "Email không đúng định dạng." : "Invalid email format.",
      })
      .or(z.literal(""))
      .optional(),
    product: z.string().min(1, {
      message: isVi ? "Vui lòng chọn sản phẩm." : "Please select a product.",
    }),
    size: z.string().min(1, {
      message: isVi ? "Vui lòng chọn size." : "Please select a size.",
    }),
    message: z.string().optional(),
  })

  type LeadFormData = z.infer<typeof validationSchema>

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      product: defaultProductId,
      size: defaultSize,
      message: "",
    },
  })

  // Watch selected product to update available sizes
  const selectedProductName = watch("product")
  const selectedProduct = products.find((p) => p.name === selectedProductName)
  const availableSizes = selectedProduct?.sizes || ["One Size"]

  // Update form fields if default values change
  useEffect(() => {
    if (defaultProductId) {
      const prod = products.find((p) => p.id === defaultProductId)
      if (prod) {
        setValue("product", prod.name)
        if (defaultSize) {
          setValue("size", defaultSize)
        } else if (prod.sizes && prod.sizes.length > 0) {
          setValue("size", prod.sizes[0])
        }
      }
    }
  }, [defaultProductId, defaultSize, products, setValue])

  // Reset size if selected product changes and current size is not valid
  useEffect(() => {
    if (selectedProduct) {
      const sizes = selectedProduct.sizes || ["One Size"]
      const currentSize = watch("size")
      if (!sizes.includes(currentSize)) {
        setValue("size", sizes[0] || "One Size")
      }
    }
  }, [selectedProductName, selectedProduct, setValue, watch])

  const onSubmit = async (data: LeadFormData) => {
    const isOk = await submitForm(data)
    if (isOk) {
      reset({
        name: "",
        phone: "",
        email: "",
        product: selectedProductName,
        size: "",
        message: "",
      })
    }
  }

  return (
    <div className="w-full glass-panel rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-xl relative overflow-hidden">
      {/* Decorative gold background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {success ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-gradient-gold mb-4">
            {isVi ? "Đăng Ký Thành Công!" : "Order Submitted Successfully!"}
          </h3>
          <p className="text-sm text-foreground/90 leading-relaxed max-w-md mx-auto mb-8">
            {isVi
              ? "Cảm ơn bạn đã tin tưởng Ông Bầu Shop. Chuyên viên tư vấn của chúng tôi sẽ liên hệ lại qua số điện thoại để tư vấn kích thước và xác nhận đơn hàng trong vòng 10 - 15 phút tới."
              : "Thank you for shopping at Ong Bau Shop. Our customer service representative will contact you via your phone number within 10-15 minutes to confirm details."}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setSuccess(false)
              }}
              className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              {isVi ? "Đăng ký thêm sản phẩm" : "Order another product"}
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="bg-secondary border border-border text-foreground hover:bg-secondary/80 font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                {isVi ? "Đóng" : "Close"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gradient-gold uppercase">
              {isVi ? "Đặt Hàng & Tư Vấn Kích Thước" : "ORDER & SIZE ADVICE"}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {isVi
                ? "Đăng ký ngay để nhận ưu đãi lên đến 30% hôm nay!"
                : "Submit now to get exclusive discounts up to 30% today!"}
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg p-3.5 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Họ và tên */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2"
            >
              {isVi ? "Họ và tên" : "Full name"}{" "}
              <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder={isVi ? "Ví dụ: Nguyễn Văn A" : "e.g. John Doe"}
              {...register("name")}
              className={`w-full bg-secondary/60 border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                errors.name ? "border-destructive" : "border-border"
              }`}
            />
            {errors.name && (
              <span className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Số điện thoại */}
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2"
            >
              {isVi ? "Số điện thoại nhận hàng" : "Contact Phone Number"}{" "}
              <span className="text-primary">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder={isVi ? "Ví dụ: 0912345678" : "e.g. 0912345678"}
              {...register("phone")}
              className={`w-full bg-secondary/60 border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                errors.phone ? "border-destructive" : "border-border"
              }`}
            />
            {errors.phone && (
              <span className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sản phẩm */}
            <div>
              <label
                htmlFor="product"
                className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2"
              >
                {isVi ? "Sản phẩm" : "Product"}{" "}
                <span className="text-primary">*</span>
              </label>
              <select
                id="product"
                {...register("product")}
                className={`w-full bg-secondary/80 border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.product ? "border-destructive" : "border-border"
                }`}
              >
                <option value="">
                  {isVi ? "-- Chọn sản phẩm --" : "-- Select Product --"}
                </option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.product && (
                <span className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.product.message}
                </span>
              )}
            </div>

            {/* Kích thước */}
            <div>
              <label
                htmlFor="size"
                className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2"
              >
                {isVi ? "Kích thước (Size)" : "Size Selection"}{" "}
                <span className="text-primary">*</span>
              </label>
              <select
                id="size"
                {...register("size")}
                className={`w-full bg-secondary/80 border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.size ? "border-destructive" : "border-border"
                }`}
              >
                <option value="">
                  {isVi ? "-- Chọn Size --" : "-- Select Size --"}
                </option>
                {availableSizes.map((sz) => (
                  <option key={sz} value={sz}>
                    Size {sz}
                  </option>
                ))}
              </select>
              {errors.size && (
                <span className="text-xs text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.size.message}
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2"
            >
              {isVi ? "Email (Không bắt buộc)" : "Email Address (Optional)"}
            </label>
            <input
              type="email"
              id="email"
              placeholder={
                isVi
                  ? "Viết email của bạn nếu muốn nhận tin tức"
                  : "e.g. john@example.com"
              }
              {...register("email")}
              className={`w-full bg-secondary/60 border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                errors.email ? "border-destructive" : "border-border"
              }`}
            />
            {errors.email && (
              <span className="text-xs text-destructive mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Ghi chú */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-2"
            >
              {isVi
                ? "Ghi chú thêm (Màu sắc, địa chỉ cụ thể...)"
                : "Extra Notes (Color preferences, shipping instructions...)"}
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder={
                isVi
                  ? "Ví dụ: Giao giờ hành chính, lấy giày màu vàng chanh..."
                  : "e.g. Leave package with neighbor, preferred gold accent version..."
              }
              {...register("message")}
              className="w-full bg-secondary/60 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isVi ? "Đang xử lý đăng ký..." : "Processing submission..."}</span>
              </>
            ) : (
              <span>{isVi ? "GỬI ĐĂNG KÝ MUA NGAY" : "SUBMIT ORDER REQUEST"}</span>
            )}
          </button>
        </form>
      )}
    </div>
  )
}

export default LeadForm
