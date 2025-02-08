"use client"

import React from "react"
import Bar from "./bar.tsx"
import { Check, X, Eye, RefreshCw } from "lucide-react"
import "../styles/evidenceStyles.css"

// Datos de ejemplo para las evidencias
const evidencias = [
  { id: 1, descripcion: "Promoción de la carrera", estatus: true },
  { id: 2, descripcion: "Resultados de estudio", estatus: false },
  { id: 3, descripcion: "Estadísticas de deserción", estatus: true },
  { id: 4, descripcion: "Informe de prácticas profesionales", estatus: false },
  { id: 5, descripcion: "Encuesta de satisfacción estudiantil", estatus: true },
]

const Evidence: React.FC = () => {
  const handleMostrar = (id: number) => {
    console.log(`Mostrando evidencia ${id}`)
    // Aquí iría la lógica para mostrar la evidencia
  }

  const handleActualizar = (id: number) => {
    console.log(`Actualizando evidencia ${id}`)
    // Aquí iría la lógica para actualizar la evidencia
  }

  return (
    <div className="main-container">
      <Bar />
      <main className="evidence-content">
        <h1>Evidencias no vinculadas a proceso</h1>
        <div className="table-container">
          <table className="evidence-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {evidencias.map((evidencia) => (
                <tr key={evidencia.id}>
                  <td>{evidencia.descripcion}</td>
                  <td className="status-cell">
                    {evidencia.estatus ? <Check className="status-icon check" /> : <X className="status-icon x" />}
                  </td>
                  <td className="actions-cell">
                    <button className="action-button show" onClick={() => handleMostrar(evidencia.id)}>
                      <Eye size={16} />
                      <span>Mostrar</span>
                    </button>
                    <button className="action-button update" onClick={() => handleActualizar(evidencia.id)}>
                      <RefreshCw size={16} />
                      <span>Actualizar</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default Evidence

