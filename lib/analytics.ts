interface TrackingWindow extends Window {
  dataLayer?: Record<string, unknown>[]
}

export function trackCTAClick(ctaLabel: string, location: string) {
  if (typeof window === "undefined") return

  const localWindow = window as unknown as TrackingWindow
  localWindow.dataLayer = localWindow.dataLayer || []

  localWindow.dataLayer.push({
    event: "cta_click",
    cta_label: ctaLabel,
    cta_location: location,
    page_slug: window.location.pathname,
  })
}

export function trackFormSubmit(formName: string, success: boolean) {
  if (typeof window === "undefined") return

  const localWindow = window as unknown as TrackingWindow
  localWindow.dataLayer = localWindow.dataLayer || []

  localWindow.dataLayer.push({
    event: success ? "form_submit_success" : "form_submit_error",
    form_name: formName,
    page_slug: window.location.pathname,
  })
}
