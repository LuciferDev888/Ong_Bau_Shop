"use client"

import React, { createContext, useState, useEffect } from "react"

export type Locale = "vi" | "en"

interface LanguageContextProps {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("vi")

  // Load saved language on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocale = localStorage.getItem("locale") as Locale
      if (savedLocale === "vi" || savedLocale === "en") {
        setLocale(savedLocale)
      }
    }
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", newLocale)
    }
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}
