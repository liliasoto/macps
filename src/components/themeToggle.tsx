"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Inicializar el tema basado en la preferencia del usuario o localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="theme-toggle-container">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        <div className="toggle-track">
          <div className="toggle-icons">
            <Sun className="sun-icon" size={14} />
            <Moon className="moon-icon" size={14} />
          </div>
          <div className={`toggle-thumb ${isDarkMode ? "dark" : ""}`}></div>
        </div>
      </button>
    </div>
  )
}

export default ThemeToggle

