"use client"

import React from "react"
import { useState } from "react"
import Bar from "./bar.tsx"
import CareerModal from "./modals/CareerModal.tsx"
import "../styles/catalogs.css"

const carrerasData = [
  {
    id: 1,
    nombre: "Ingeniería en Sistemas Computacionales",
    departamento: "Sistemas y Computación",
    departamentoId: 1,
  },
  { id: 2, nombre: "Arquitectura", departamento: "Arquitectura y Diseño", departamentoId: 2 },
  { id: 3, nombre: "Ingeniería Civil", departamento: "Ingeniería Civil", departamentoId: 3 },
  { id: 4, nombre: "Ingeniería Industrial", departamento: "Ingeniería Industrial", departamentoId: 4 },
  {
    id: 5,
    nombre: "Licenciatura en Administración",
    departamento: "Ciencias Económico-Administrativas",
    departamentoId: 5,
  },
]

const CatCareers: React.FC = () => {
  const [carreras, setCarreras] = useState(carrerasData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState<{
    id: number
    nombre: string
    departamentoId: number
  } | null>(null)

  const handleOpenModal = (career: { id: number; nombre: string; departamentoId: number } | null = null) => {
    setSelectedCareer(career)
    setIsModalOpen(true)
  }

  const handleSaveCareer = (careerData: {
    nombre: string
    departamentoId: number
  }) => {
    // Obtener el nombre del departamento basado en el ID
    const departamentosData = [
      { id: 1, nombre: "Sistemas y Computación" },
      { id: 2, nombre: "Arquitectura y Diseño" },
      { id: 3, nombre: "Ingeniería Civil" },
      { id: 4, nombre: "Ingeniería Industrial" },
      { id: 5, nombre: "Ciencias Económico-Administrativas" },
    ]

    const departamentoName = departamentosData.find((dep) => dep.id === careerData.departamentoId)?.nombre || ""

    if (selectedCareer) {
      // Editar carrera existente
      setCarreras(
        carreras.map((car) =>
          car.id === selectedCareer.id
            ? {
                ...car,
                nombre: careerData.nombre,
                departamentoId: careerData.departamentoId,
                departamento: departamentoName,
              }
            : car,
        ),
      )
    } else {
      // Agregar nueva carrera
      const newCareer = {
        id: carreras.length > 0 ? Math.max(...carreras.map((car) => car.id)) + 1 : 1,
        nombre: careerData.nombre,
        departamentoId: careerData.departamentoId,
        departamento: departamentoName,
      }
      setCarreras([...carreras, newCareer])
    }
  }

  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de Carreras</h1>
        <div className="catalog-actions">
          <button className="catalog-button" onClick={() => handleOpenModal()}>
            Agregar Carrera
          </button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Departamento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carreras.map((carrera) => (
              <tr key={carrera.id}>
                <td>{carrera.id}</td>
                <td>{carrera.nombre}</td>
                <td>{carrera.departamento}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() =>
                      handleOpenModal({
                        id: carrera.id,
                        nombre: carrera.nombre,
                        departamentoId: carrera.departamentoId,
                      })
                    }
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CareerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCareer}
        initialData={selectedCareer || undefined}
      />
    </div>
  )
}

export default CatCareers

