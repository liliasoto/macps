"use client"

import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/authContext.tsx"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

