import React from "react"
import logo from "../images/logomacpspng.png"
import "../styles/mainStyles.css"
import Bar from "./bar.tsx"

const Main: React.FC = () => {

  return (
    <div className="main-container">
      <Bar></Bar>
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

