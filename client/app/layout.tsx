import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Open_Sans, Montserrat } from "next/font/google"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "TrackAntiIndia — Campaign Analyzer",
  description: "At-a-glance insights for #AsiaCup2025 and other campaigns",
  generator: "v0.app",
}

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-open-sans",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* Apply body font via theme token mapping in globals.css; expose font variables */}
      <body className={`${openSans.variable} ${montserrat.variable} font-sans`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
