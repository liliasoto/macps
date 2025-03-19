import React from "react"
import type { ReactNode } from "react"
import ThemeToggle from "./themeToggle.tsx"

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      {children}
      <ThemeToggle />
    </div>
  )
}

export default Layout

