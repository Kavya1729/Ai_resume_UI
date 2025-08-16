import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "AI Resume Analyzer - Smart Career Insights",
  description: "Get intelligent resume analysis, skill recommendations, and career guidance powered by AI",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-heading: ${poppins.variable};
}
        `}</style>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
