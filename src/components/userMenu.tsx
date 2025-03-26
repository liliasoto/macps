"use client"

import React from "react"
import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { User, Settings, LogOut, UserCircle } from "lucide-react"
import { useAuth } from "../context/authContext.tsx"
import "../styles/dropdownPanels.css"

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()

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

  // Manejar el cierre de sesión
  const handleLogout = () => {
    logout()
    onClose()
  }

  return (
    <div ref={menuRef} className={`dropdown-panel user-menu ${isOpen ? "active" : ""}`}>
      <div className="user-header">
        <div className="user-avatar">
          {user?.avatar ? <img src={user.avatar || "/placeholder.svg"} alt={user.nombre} /> : <UserCircle size={48} />}
        </div>
        <div className="user-info">
          <h3>
            {user?.nombre} {user?.apellidoPaterno}
          </h3>
          <p>{user?.rol}</p>
          <span>{user?.email}</span>
        </div>
      </div>

      <div className="menu-items">
        <Link to="/perfil" className="menu-item" onClick={onClose}>
          <User size={18} />
          <span>Mi Perfil</span>
        </Link>
        <Link to="/configuracion" className="menu-item" onClick={onClose}>
          <Settings size={18} />
          <span>Configuración</span>
        </Link>
        <button onClick={handleLogout} className="menu-item logout">
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  )
}

export default UserMenu

