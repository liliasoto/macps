import React from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Bar from "./bar.tsx"
import "../styles/cpRespStyles.css"

// Datos de ejemplo
const categorias = [
  "Liderazgo Institucional",
  "Gestión del Programa",
  "Infraestructura y Equipamiento",
  "Personal Académico",
  "Estudiantes y Egresados",
]

const indicadores = [
  "Misión y Visión",
  "Plan de Estudios",
  "Laboratorios y Talleres",
  "Perfil del Profesorado",
  "Tasa de Egreso",
  "Vinculación con el Sector Productivo",
  "Investigación y Desarrollo",
  "Servicios de Apoyo al Estudiante",
]

const departamentos = [
  "Dirección Académica",
  "Coordinación de Carrera",
  "Servicios Escolares",
  "Vinculación",
  "Investigación y Posgrado",
]

const CpResp: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { carrera, organismo, fechaInicio, fechaFin } = location.state || {}

  const [categoriasResp, setCategoriasResp] = useState<{ [key: string]: string }>({})
  const [indicadoresResp, setIndicadoresResp] = useState<{ [key: string]: string }>({})
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleCategoriaChange = (categoria: string, departamento: string) => {
    setCategoriasResp((prev) => ({ ...prev, [categoria]: departamento }))
  }

  const handleIndicadorChange = (indicador: string, departamento: string) => {
    setIndicadoresResp((prev) => ({ ...prev, [indicador]: departamento }))
  }

  const handleTerminar = () => {
    setShowConfirmation(true)
  }

  const handleConfirmGuardar = () => {
    // Aquí iría la lógica para guardar el proceso
    alert("Proceso guardado con éxito")
    navigate("/main")
  }

  const handleCancelar = () => {
    navigate(-1)
  }

  return (
    <div className="main-container">
      <Bar />
      <main className="cp-resp-content">
        <h1>Asignación de responsables del proceso</h1>
        <section className="process-info">
          <p>
            <strong>Carrera:</strong> {carrera}
          </p>
          <p>
            <strong>Organismo:</strong> {organismo}
          </p>
          <p>
            <strong>Periodo:</strong> {fechaInicio} - {fechaFin}
          </p>
        </section>
        <section className="categorias-section">
          <h2>Categorías</h2>
          {categorias.map((categoria) => (
            <div key={categoria} className="categoria-item">
              <label>{categoria}</label>
              <select
                value={categoriasResp[categoria] || ""}
                onChange={(e) => handleCategoriaChange(categoria, e.target.value)}
              >
                <option value="">Seleccione un departamento</option>
                {departamentos.map((depto) => (
                  <option key={depto} value={depto}>
                    {depto}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </section>
        <section className="indicadores-section">
          <h2>Indicadores</h2>
          {indicadores.map((indicador) => (
            <div key={indicador} className="indicador-item">
              <label>{indicador}</label>
              <select
                value={indicadoresResp[indicador] || ""}
                onChange={(e) => handleIndicadorChange(indicador, e.target.value)}
              >
                <option value="">Seleccione un departamento</option>
                {departamentos.map((depto) => (
                  <option key={depto} value={depto}>
                    {depto}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </section>
        <div className="form-actions">
          <button className="btn-primary" onClick={handleTerminar}>
            Terminar
          </button>
          <button className="btn-secondary" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
        {showConfirmation && (
          <div className="modal-overlay">
            <div className="modal">
              <p>¿Desea concluir la configuración del proceso actual y crear el proceso de certificación?</p>
              <div className="modal-actions">
                <button className="btn-primary" onClick={handleConfirmGuardar}>
                  Guardar
                </button>
                <button className="btn-secondary" onClick={() => setShowConfirmation(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default CpResp

