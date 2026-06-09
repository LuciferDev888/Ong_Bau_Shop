import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-gradient px-4 text-center">
      <div className="glass-panel max-w-md w-full p-8 rounded-2xl border border-border space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-gradient-gold">404 - KHÔNG TÌM THẤY TRANG</h1>
        <p className="text-sm text-muted-foreground">
          Đường dẫn bạn truy cập không tồn tại hoặc đã bị thay đổi. Vui lòng quay trở lại trang chủ Ông Bầu Shop.
        </p>
        <Link
          href="/ong-bau-shop"
          className="inline-block bg-primary hover:bg-primary/95 text-primary-foreground font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-primary/20"
        >
          QUAY LẠI TRANG CHỦ
        </Link>
      </div>
    </div>
  )
}
