"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../images/logoblanco.png"
import { Bell, User, ChevronDown, Menu } from "lucide-react"
import NotificationsPanel from "./notificationsPanel.tsx"
import UserMenu from "./userMenu.tsx"
import { useAuth } from "../context/authContext.tsx"
import "../styles/mainStyles.css"

const Bar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null)
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirigir al login si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const handleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  const handleMobileSubmenu = (menu: string) => {
    setMobileSubmenuOpen(mobileSubmenuOpen === menu ? null : menu)
  }

  const toggleNotificationsPanel = () => {
    setNotificationsPanelOpen(!notificationsPanelOpen)
    if (userMenuOpen) setUserMenuOpen(false)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
    if (notificationsPanelOpen) setNotificationsPanelOpen(false)
  }

  // Cerrar el menú desplegable al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  return (
    <>
      <nav className="main-nav">
        <div className="nav-content">
          <div className="nav-left">
            <Link to="/main" className="logo-link">
              <img src={logo || "/placeholder.svg"} alt="MACPS Logo" className="nav-logo" />
            </Link>
            <div className="nav-links-container" ref={dropdownRef}>
              <ul className="nav-links">
                <li className="dropdown">
                  <button
                    onClick={() => handleDropdown("catalogos")}
                    className={`dropdown-toggle ${activeDropdown === "catalogos" ? "active" : ""}`}
                  >
                    Catálogos <ChevronDown size={16} className={activeDropdown === "catalogos" ? "rotate" : ""} />
                  </button>
                  <div className={`dropdown-menu ${activeDropdown === "catalogos" ? "active" : ""}`}>
                    <p>
                      <Link to="/catalogos/organismos">Organismos</Link>
                    </p>
                    <p>
                      <Link to="/catalogos/ejes">Ejes</Link>
                    </p>
                    <p>
                      <Link to="/catalogos/categorias">Categorías</Link>
                    </p>
                    <p>
                      <Link to="/catalogos/indicadores">Indicadores</Link>
                    </p>
                    <p>
                      <Link to="/catalogos/estandares">Estándares</Link>
                    </p>
                    <p>
                      <Link to="/catalogos/carreras">Carreras</Link>
                    </p>
                    <p>
                      <Link to="/catalogos/departamentos">Departamentos</Link>
                    </p>
                    <p>
                      <Link to="/catalogos/usuarios">Usuarios</Link>
                    </p>
                  </div>
                </li>
                <li className="dropdown">
                  <button
                    onClick={() => handleDropdown("organismos")}
                    className={`dropdown-toggle ${activeDropdown === "organismos" ? "active" : ""}`}
                  >
                    Organismos <ChevronDown size={16} className={activeDropdown === "organismos" ? "rotate" : ""} />
                  </button>
                  <div className={`dropdown-menu ${activeDropdown === "organismos" ? "active" : ""}`}>
                    <p>
                      <Link to="/organismos/ver">Ver organismo</Link>
                    </p>
                    <p>
                      <Link to="/organismos/configurar">Configurar organismo</Link>
                    </p>
                    <p>
                      <Link to="/organismos/evidencias">Registro de evidencias</Link>
                    </p>
                  </div>
                </li>
                <li className="dropdown">
                  <button
                    onClick={() => handleDropdown("certificaciones")}
                    className={`dropdown-toggle ${activeDropdown === "certificaciones" ? "active" : ""}`}
                  >
                    Certificaciones{" "}
                    <ChevronDown size={16} className={activeDropdown === "certificaciones" ? "rotate" : ""} />
                  </button>
                  <div className={`dropdown-menu ${activeDropdown === "certificaciones" ? "active" : ""}`}>
                    <p>
                      <Link to="/certificaciones/crear">Crear proceso</Link>
                    </p>
                    <p>
                      <Link to="/certificaciones/configurar">Configurar proceso</Link>
                    </p>
                    <p>
                      <Link to="/certificaciones/historial">Historial</Link>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-right">
            <div className="icon-container" ref={notificationsRef}>
              <button className="icon-button" onClick={toggleNotificationsPanel}>
                <Bell size={24} />
              </button>
              <NotificationsPanel isOpen={notificationsPanelOpen} onClose={() => setNotificationsPanelOpen(false)} />
            </div>
            <div className="icon-container" ref={userMenuRef}>
              <button className="icon-button" onClick={toggleUserMenu}>
                <User size={24} />
              </button>
              <UserMenu isOpen={userMenuOpen} onClose={() => setUserMenuOpen(false)} />
            </div>
            <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? "active" : ""}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <img src={logo || "/placeholder.svg"} alt="MACPS Logo" className="mobile-menu-logo" />
            <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
              &times;
            </button>
          </div>
          <ul className="mobile-menu-links">
            <li>
              <div className="mobile-menu-item" onClick={() => handleMobileSubmenu("catalogos")}>
                <span>Catálogos</span>
                <ChevronDown size={16} className={mobileSubmenuOpen === "catalogos" ? "rotate" : ""} />
              </div>
              <ul className={`mobile-submenu ${mobileSubmenuOpen === "catalogos" ? "active" : ""}`}>
                <li>
                  <Link to="/catalogos/organismos" onClick={() => setMobileMenuOpen(false)}>
                    Organismos
                  </Link>
                </li>
                <li>
                  <Link to="/catalogos/ejes" onClick={() => setMobileMenuOpen(false)}>
                    Ejes
                  </Link>
                </li>
                <li>
                  <Link to="/catalogos/categorias" onClick={() => setMobileMenuOpen(false)}>
                    Categorías
                  </Link>
                </li>
                <li>
                  <Link to="/catalogos/indicadores" onClick={() => setMobileMenuOpen(false)}>
                    Indicadores
                  </Link>
                </li>
                <li>
                  <Link to="/catalogos/estandares" onClick={() => setMobileMenuOpen(false)}>
                    Estándares
                  </Link>
                </li>
                <li>
                  <Link to="/catalogos/carreras" onClick={() => setMobileMenuOpen(false)}>
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link to="/catalogos/departamentos" onClick={() => setMobileMenuOpen(false)}>
                    Departamentos
                  </Link>
                </li>
                <li>
                  <Link to="/catalogos/usuarios" onClick={() => setMobileMenuOpen(false)}>
                    Usuarios
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div className="mobile-menu-item" onClick={() => handleMobileSubmenu("organismos")}>
                <span>Organismos</span>
                <ChevronDown size={16} className={mobileSubmenuOpen === "organismos" ? "rotate" : ""} />
              </div>
              <ul className={`mobile-submenu ${mobileSubmenuOpen === "organismos" ? "active" : ""}`}>
                <li>
                  <Link to="/organismos/ver" onClick={() => setMobileMenuOpen(false)}>
                    Ver organismo
                  </Link>
                </li>
                <li>
                  <Link to="/organismos/configurar" onClick={() => setMobileMenuOpen(false)}>
                    Configurar organismo
                  </Link>
                </li>
                <li>
                  <Link to="/organismos/evidencias" onClick={() => setMobileMenuOpen(false)}>
                    Registro de evidencias
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <div className="mobile-menu-item" onClick={() => handleMobileSubmenu("certificaciones")}>
                <span>Certificaciones</span>
                <ChevronDown size={16} className={mobileSubmenuOpen === "certificaciones" ? "rotate" : ""} />
              </div>
              <ul className={`mobile-submenu ${mobileSubmenuOpen === "certificaciones" ? "active" : ""}`}>
                <li>
                  <Link to="/certificaciones/crear" onClick={() => setMobileMenuOpen(false)}>
                    Crear proceso
                  </Link>
                </li>
                <li>
                  <Link to="/certificaciones/configurar" onClick={() => setMobileMenuOpen(false)}>
                    Configurar proceso
                  </Link>
                </li>
                <li>
                  <Link to="/certificaciones/historial" onClick={() => setMobileMenuOpen(false)}>
                    Historial
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Bar

