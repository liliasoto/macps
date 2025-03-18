"use client"

import React from "react"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Settings, LogOut, UserCircle } from "lucide-react"
import "../styles/dropdownPanels.css"

// Datos de ejemplo para el usuario
const sampleUser = {
  name: "Lilia Soto",
  email: "liliasoll@example.com",
  role: "Administrador",
  avatar: null, // URL de la imagen de avatar, null para usar el icono por defecto
}

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null)

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Obtener la función de navegación
  const navigate = useNavigate()

  // Manejar el cierre de sesión
  const handleLogout = () => {
    // Aquí iría la lógica para limpiar el estado de autenticación
    // Por ejemplo, eliminar tokens del localStorage
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")

    // Cerrar el menú de usuario
    onClose()

    // Redirigir al usuario a la página principal
    navigate("/")

    console.log("Sesión cerrada correctamente")
  }

  return (
    <div ref={menuRef} className={`dropdown-panel user-menu ${isOpen ? "active" : ""}`}>
      <div className="user-header">
        <div className="user-avatar">
          {sampleUser.avatar ? (
            <img src={sampleUser.avatar || "/placeholder.svg"} alt={sampleUser.name} />
          ) : (
            <UserCircle size={48} />
          )}
        </div>
        <div className="user-info">
          <h3>{sampleUser.name}</h3>
          <p>{sampleUser.role}</p>
          <span>{sampleUser.email}</span>
        </div>
      </div>

      <div className="menu-items">
        <a href="/perfil" className="menu-item">
          <User size={18} />
          <span>Mi Perfil</span>
        </a>
        <a href="/configuracion" className="menu-item">
          <Settings size={18} />
          <span>Configuración</span>
        </a>
        <button onClick={handleLogout} className="menu-item logout">
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  )
}

export default UserMenu

