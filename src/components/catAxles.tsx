"use client"

import React from "react"
import { useState } from "react"
import Bar from "./bar.tsx"
import AxleModal from "./modals/AxleModal.tsx"
import "../styles/catalogs.css"

const ejesData = [
  { id: 1, nombre: "Personal académico", descripcion: "Evalúa la calidad y suficiencia del personal docente" },
  {
    id: 2,
    nombre: "Estudiantes",
    descripcion: "Analiza los procesos de admisión, permanencia y egreso de los estudiantes",
  },
  {
    id: 3,
    nombre: "Plan de estudios",
    descripcion: "Examina la estructura, contenido y actualización del plan de estudios",
  },
  {
    id: 4,
    nombre: "Evaluación del aprendizaje",
    descripcion: "Valora los métodos y criterios de evaluación del aprendizaje",
  },
  {
    id: 5,
    nombre: "Formación integral",
    descripcion: "Evalúa las actividades complementarias que contribuyen a la formación integral del estudiante",
  },
]

const CatAxles: React.FC = () => {
  const [ejes, setEjes] = useState(ejesData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAxle, setSelectedAxle] = useState<{ id: number; nombre: string; descripcion: string } | null>(null)

  const handleOpenModal = (axle: { id: number; nombre: string; descripcion: string } | null = null) => {
    setSelectedAxle(axle)
    setIsModalOpen(true)
  }

  const handleSaveAxle = (axleData: { nombre: string; descripcion: string }) => {
    if (selectedAxle) {
      // Editar eje existente
      setEjes(ejes.map((eje) => (eje.id === selectedAxle.id ? { ...eje, ...axleData } : eje)))
    } else {
      // Agregar nuevo eje
      const newAxle = {
        id: ejes.length > 0 ? Math.max(...ejes.map((eje) => eje.id)) + 1 : 1,
        ...axleData,
      }
      setEjes([...ejes, newAxle])
    }
  }

  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de ejes</h1>
        <div className="catalog-actions">
          <button className="catalog-button" onClick={() => handleOpenModal()}>
            Agregar eje
          </button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ejes.map((eje) => (
              <tr key={eje.id}>
                <td>{eje.id}</td>
                <td>{eje.nombre}</td>
                <td>{eje.descripcion}</td>
                <td>
                  <button className="action-button edit" onClick={() => handleOpenModal(eje)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AxleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAxle}
        initialData={selectedAxle || undefined}
      />
    </div>
  )
}

export default CatAxles

