import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Bar from "./bar.tsx"
import "../styles/createProcessStyles.css"

// Datos de ejemplo
const carreras = [
  "Ingeniería en Sistemas Computacionales",
  "Arquitectura",
  "Ingeniería Civil",
  "Ingeniería Industrial",
  "Ingeniería Eléctrica",
]

const organismosCertificadores = ["CACEI", "ANPADEH", "CONAIC", "CACECA", "CONAET"]

const CreateProcess: React.FC = () => {
  const [carrera, setCarrera] = useState("")
  const [organismo, setOrganismo] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate("/certificaciones/asignar-responsables", { state: { carrera, organismo, fechaInicio, fechaFin } })
  }

  const handleCancel = () => {
    setCarrera("")
    setOrganismo("")
    setFechaInicio("")
    setFechaFin("")
    navigate("/main")
  }

  return (
    <div className="main-container">
      <Bar />
      <main className="create-process-content">
        <h1>Crear proceso de certificación</h1>
        <form onSubmit={handleSubmit} className="create-process-form">
          <div className="form-group2">
            <label htmlFor="carrera">Carrera</label>
            <select id="carrera" value={carrera} onChange={(e) => setCarrera(e.target.value)} required>
              <option value="">Seleccione una carrera</option>
              {carreras.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group2">
            <label htmlFor="organismo">Organismo</label>
            <select id="organismo" value={organismo} onChange={(e) => setOrganismo(e.target.value)} required>
              <option value="">Seleccione un organismo certificador</option>
              {organismosCertificadores.map((o, index) => (
                <option key={index} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group2">
            <label htmlFor="periodo">Periodo</label>
            <div className="date-inputs">
              <input
                type="date"
                id="fechaInicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
              <input
                type="date"
                id="fechaFin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                min={fechaInicio || new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Siguiente
            </button>
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CreateProcess

