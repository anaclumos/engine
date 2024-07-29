import "@anaclumos/web/app/globals.css"

import type React from "react"

import type { Metadata } from "next"
import { cn } from "@anaclumos/design/lib/utils"
import { Analytics } from "@vercel/analytics/react"

import { siteConfig } from "../config/site"
import { Toaster } from "@anaclumos/design/components/ui/sonner"
import { BottomTabBar } from "@anaclumos/design/components/bottom-tab"
import { Sidebar } from "@anaclumos/design/components/sidebar"
import { TailwindIndicator } from "@anaclumos/design/components/tailwind-indicator.server"
import { ThemeProvider } from "@anaclumos/design/components/theme-provider.client"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn("san-francisco min-h-screen bg-background antialiased")}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col sm:ml-14">
              <Sidebar items={siteConfig.mainNav} />
              <div className="flex-1 pb-14 sm:pb-0">{children}</div>
              <BottomTabBar items={siteConfig.mainNav} />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
          <Toaster />
          <Analytics />
        </body>
      </html>
    </>
  )
}
