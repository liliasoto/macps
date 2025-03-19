import React from "react"
import logo from "../images/logob.png"
import "../styles/mainStyles.css"
import Bar from "./bar.tsx"

const Main: React.FC = () => {
  return (
    <div className="main-container">
      <Bar />
      <main className="main-content">
        <div className="hero-section">
          <div className="hero-text">
            <h1>MACPS</h1>
            <h2>Management Academy Certification Program System</h2>
            <p>
              Simplificamos la gestión, organización y seguimiento de todos los requisitos necesarios para la
              certificación de programas universitarios, asegurando un proceso fluido y exitoso para tu institución.
            </p>
          </div>
          <div className="hero-image">
            <img src={logo || "/placeholder.svg"} alt="MACPS Logo" className="hero-logo" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Main

