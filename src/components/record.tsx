import React from "react"
import { useState } from "react"
import Bar from "./bar.tsx"
import "../styles/recordStyles.css"

// Datos de ejemplo
const carreras = [
  "Ingeniería en Sistemas Computacionales",
  "Arquitectura",
  "Ingeniería Civil",
  "Ingeniería Industrial",
  "Ingeniería Eléctrica",
]

const procesosCertificacion = [
  {
    id: 1,
    carrera: "Ingeniería en Sistemas Computacionales",
    fechaInicio: "2022-01-01",
    fechaFin: "2022-12-31",
    organismo: "CACEI",
  },
  { id: 2, carrera: "Arquitectura", fechaInicio: "2021-06-01", fechaFin: "2022-05-31", organismo: "ANPADEH" },
  { id: 3, carrera: "Ingeniería Civil", fechaInicio: "2023-03-01", fechaFin: "2024-02-29", organismo: "CACEI" },
  { id: 4, carrera: "Ingeniería Industrial", fechaInicio: "2022-09-01", fechaFin: "2023-08-31", organismo: "CACEI" },
  {
    id: 5,
    carrera: "Ingeniería en Sistemas Computacionales",
    fechaInicio: "2020-01-01",
    fechaFin: "2020-12-31",
    organismo: "CONAIC",
  },
]

const Record: React.FC = () => {
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("")

  const procesosFiltrados = carreraSeleccionada
    ? procesosCertificacion.filter((proceso) => proceso.carrera === carreraSeleccionada)
    : procesosCertificacion

  const handleMostrar = (id: number) => {
    // Aquí iría la lógica para mostrar los detalles del proceso
    console.log(`Mostrando detalles del proceso ${id}`)
  }

  const handleGenerarPDF = (id: number) => {
    // Aquí iría la lógica para generar el PDF del proceso
    console.log(`Generando PDF del proceso ${id}`)
  }

  return (
    <div className="main-container">
      <Bar />
      <main className="record-content">
        <h1>Historial de procesos de certificación</h1>
        <div className="filter-section">
          <label htmlFor="carrera-select">Filtrar por carrera:</label>
          <select
            id="carrera-select"
            value={carreraSeleccionada}
            onChange={(e) => setCarreraSeleccionada(e.target.value)}
          >
            <option value="">Todas las carreras</option>
            {carreras.map((carrera, index) => (
              <option key={index} value={carrera}>
                {carrera}
              </option>
            ))}
          </select>
        </div>
        <div className="table-container">
          <table className="record-table">
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Organismo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {procesosFiltrados.map((proceso) => (
                <tr key={proceso.id}>
                  <td>{`${proceso.fechaInicio} - ${proceso.fechaFin}`}</td>
                  <td>{proceso.organismo}</td>
                  <td>
                    <button className="btn-primary" onClick={() => handleMostrar(proceso.id)}>
                      Mostrar
                    </button>
                    <button className="btn-secondary" onClick={() => handleGenerarPDF(proceso.id)}>
                      Generar PDF
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

export default Record

