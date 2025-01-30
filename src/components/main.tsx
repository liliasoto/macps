import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../images/logomacpspng.png"
import { Bell, User, ChevronDown } from "lucide-react"
import "../styles/mainStyles.css"

const Main: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu)
  }

  return (
    <div className="main-container">
      <nav className="main-nav">
        <div className="nav-content">
          <div className="nav-left">
            <Link to="/" className="logo-link">
              <img src={logo || "/placeholder.svg"} alt="MACPS Logo" className="nav-logo" />
            </Link>
            <ul className="nav-links">
              <li className="dropdown">
                <button onClick={() => handleDropdown("catalogos")} className="dropdown-toggle">
                  Catálogos <ChevronDown size={16} />
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
                <button onClick={() => handleDropdown("organismos")} className="dropdown-toggle">
                  Organismos <ChevronDown size={16} />
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
                <button onClick={() => handleDropdown("certificaciones")} className="dropdown-toggle">
                  Certificaciones <ChevronDown size={16} />
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
          <div className="nav-right">
            <button className="icon-button">
              <Bell size={24} />
            </button>
            <button className="icon-button">
              <User size={24} />
            </button>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-text">
            <h1>MACPS</h1>
            <h2>Management Academy Certification Program System</h2>
            <p>
              Simplificamos la gestión, organización y seguimiento de todos los requisitos necesarios para la
              certificación de programas universitarios, asegurando un proceso fluido y exitoso para tu institución.
            </p>
            <button className="cta-button">Comienza ahora</button>
          </div>
          <div className="hero-image">
            <img src={logo || "/placeholder.svg"} alt="MACPS Logo" className="hero-logo" />
          </div>
        </div>
      </main>
      <div className="geometric-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <div className="background-animation">
        <div className="moving-shape"></div>
      </div>
    </div>
  )
}

export default Main

