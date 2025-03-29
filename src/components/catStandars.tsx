"use client"

import React from "react"
import { useState } from "react"
import Bar from "./bar.tsx"
import StandardModal from "./modals/StandardModal.tsx"
import "../styles/catalogs.css"

const estandaresData = [
  { id: 1, nombre: "Tasa de retención mínima", valor: "70%", categoria: "Trayectoria escolar", categoriaId: 4 },
  { id: 2, nombre: "Eficiencia terminal mínima", valor: "50%", categoria: "Egreso", categoriaId: 5 },
  {
    id: 3,
    nombre: "Índice de reprobación máximo",
    valor: "30%",
    categoria: "Proceso de enseñanza aprendizaje",
    categoriaId: 2,
  },
  { id: 4, nombre: "Satisfacción de empleadores mínima", valor: "80%", categoria: "Perfil de egreso", categoriaId: 1 },
  { id: 5, nombre: "Tasa de titulación mínima", valor: "40%", categoria: "Egreso", categoriaId: 5 },
]

const CatStandars: React.FC = () => {
  const [estandares, setEstandares] = useState(estandaresData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStandard, setSelectedStandard] = useState<{
    id: number
    nombre: string
    categoriaId: number
    valor: string
  } | null>(null)

  const handleOpenModal = (standard: { id: number; nombre: string; categoriaId: number; valor: string } | null = null) => {
    setSelectedStandard(standard)
    setIsModalOpen(true)
  }

  const handleSaveStandard = (standardData: {
    nombre: string
    categoriaId: number
    valor: string
  }) => {
    // Obtener el nombre de la categoría basado en el ID
    const categoriasData = [
      { id: 1, nombre: "Perfil de egreso" },
      { id: 2, nombre: "Proceso de enseñanza aprendizaje" },
      { id: 3, nombre: "Ingreso" },
      { id: 4, nombre: "Trayectoria escolar" },
      { id: 5, nombre: "Egreso" },
    ]

    const categoriaName = categoriasData.find((cat) => cat.id === standardData.categoriaId)?.nombre || ""

    if (selectedStandard) {
      // Editar estándar existente
      setEstandares(
        estandares.map((std) =>
          std.id === selectedStandard.id
            ? {
                ...std,
                nombre: standardData.nombre,
                categoriaId: standardData.categoriaId,
                categoria: categoriaName,
                valor: standardData.valor,
              }
            : std,
        ),
      )
    } else {
      // Agregar nuevo estándar
      const newStandard = {
        id: estandares.length > 0 ? Math.max(...estandares.map((std) => std.id)) + 1 : 1,
        nombre: standardData.nombre,
        categoriaId: standardData.categoriaId,
        categoria: categoriaName,
        valor: standardData.valor,
      }
      setEstandares([...estandares, newStandard])
    }
  }

  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de estándares</h1>
        <div className="catalog-actions">
          <button className="catalog-button" onClick={() => handleOpenModal()}>
            Agregar estándar
          </button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estandares.map((estandar) => (
              <tr key={estandar.id}>
                <td>{estandar.id}</td>
                <td>{estandar.nombre}</td>
                <td>{estandar.valor}</td>
                <td>{estandar.categoria}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() =>
                      handleOpenModal({
                        id: estandar.id,
                        nombre: estandar.nombre,
                        categoriaId: estandar.categoriaId,
                        valor: estandar.valor,
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

      <StandardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStandard}
        initialData={selectedStandard || undefined}
      />
    </div>
  )
}

export default CatStandars

