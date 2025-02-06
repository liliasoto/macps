"use client"

import  React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Bar from "./bar.tsx"
import "../styles/seeOrgStyles.css"

// Datos de ejemplo
const organismosIniciales = [
  { id: 1, nombre: "CACEI", descripcion: "Consejo de Acreditación de la Enseñanza de la Ingeniería" },
  {
    id: 2,
    nombre: "ANPADEH",
    descripcion: "Acreditadora Nacional de Programas de Arquitectura y Disciplinas del Espacio Habitable",
  },
  { id: 3, nombre: "CONAIC", descripcion: "Consejo Nacional de Acreditación en Informática y Computación" },
  { id: 4, nombre: "CACECA", descripcion: "Consejo de Acreditación en Ciencias Administrativas Contables y Afines" },
  { id: 5, nombre: "CONAET", descripcion: "Consejo Nacional para la Calidad de la Educación Turística" },
]

const SeeOrganism: React.FC = () => {
  const [organismos, setOrganismos] = useState(organismosIniciales)
  const [selectedOrganism, setSelectedOrganism] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleSelectOrganism = (id: number) => {
    setSelectedOrganism(id === selectedOrganism ? null : id)
  }

  const handleModificar = () => {
    if (selectedOrganism) {
      navigate(`/organismos/configurar/${selectedOrganism}`)
    }
  }

  const handleEliminar = () => {
    if (selectedOrganism && window.confirm("¿Estás seguro de que quieres eliminar este organismo?")) {
      setOrganismos(organismos.filter((org) => org.id !== selectedOrganism))
      setSelectedOrganism(null)
    }
  }

  const handleAgregarNuevo = () => {
    navigate("/organismos/agregar")
  }

  return (
    <div className="main-container">
      <Bar />
      <main className="see-org-content">
        <h1>Organismos certificadores</h1>
        <div className="org-table-container">
          <table className="org-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {organismos.map((organismo) => (
                <tr
                  key={organismo.id}
                  onClick={() => handleSelectOrganism(organismo.id)}
                  className={selectedOrganism === organismo.id ? "selected" : ""}
                >
                  <td>{organismo.nombre}</td>
                  <td>{organismo.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="org-actions">
          <button className="btn-primary" onClick={handleModificar} disabled={!selectedOrganism}>
            Modificar
          </button>
          <button className="btn-secondary" onClick={handleEliminar} disabled={!selectedOrganism}>
            Eliminar
          </button>
        </div>
        <button className="btn-add" onClick={handleAgregarNuevo}>
          Agregar nuevo organismo
        </button>
      </main>
    </div>
  )
}

export default SeeOrganism

