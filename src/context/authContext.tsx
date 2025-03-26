"use client"

import React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// Definir el tipo para el usuario
export interface User {
  id: number
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  usuario: string
  email: string
  rol: string
  departamento: string
  avatar?: string | null 
}

// Definir el tipo para el contexto de autenticación
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Datos de usuario de ejemplo (simulando una base de datos)
const USERS = [
  {
    id: 1,
    nombre: "Admin",
    apellidoPaterno: "Sistema",
    apellidoMaterno: "MACPS",
    usuario: "admin",
    email: "admin@macps.edu",
    rol: "Administrador",
    departamento: "Sistemas y computación",
    password: "123", // En un sistema real, esto sería un hash
    avatar: null,
  },
  {
    id: 2,
    nombre: "Lilia",
    apellidoPaterno: "Soto",
    apellidoMaterno: "Llamas",
    usuario: "liliasoll",
    email: "liliasoll@example.com",
    rol: "Coordinador",
    departamento: "Sistemas y computación",
    password: "123456",
    avatar: null,
  },
]

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  // Verificar si hay una sesión guardada al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  // Función para iniciar sesión
  const login = async (username: string, password: string): Promise<boolean> => {
    // Simular una petición a la API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Buscar el usuario en nuestros datos de ejemplo
        const foundUser = USERS.find((u) => u.usuario === username && u.password === password)

        if (foundUser) {
          // Crear una copia del usuario sin incluir la contraseña
          const { password: _, ...userWithoutPassword } = foundUser

          // Guardar el usuario en el estado y en localStorage
          setUser(userWithoutPassword)
          setIsAuthenticated(true)
          localStorage.setItem("user", JSON.stringify(userWithoutPassword))

          resolve(true)
        } else {
          resolve(false)
        }
      }, 500) // Simular un pequeño retraso de red
    })
  }

  // Función para cerrar sesión
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    navigate("/")
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}

