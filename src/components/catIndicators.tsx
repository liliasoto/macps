"use client"

import React from "react"
import { useState } from "react"
import Bar from "./bar.tsx"
import IndicatorModal from "./modals/IndicatorModal.tsx"
import "../styles/catalogs.css"

const indicadoresData = [
  {
    id: 1,
    nombre: "Tasa de retención",
    categoria: "Trayectoria escolar",
    categoriaId: 4,
    descripcion: "Porcentaje de estudiantes que permanecen en el programa",
  },
  {
    id: 2,
    nombre: "Eficiencia terminal",
    categoria: "Egreso",
    categoriaId: 5,
    descripcion: "Porcentaje de estudiantes que concluyen el programa en el tiempo establecido",
  },
  {
    id: 3,
    nombre: "Índice de reprobación",
    categoria: "Proceso de enseñanza aprendizaje",
    categoriaId: 2,
    descripcion: "Porcentaje de estudiantes que no aprueban las asignaturas",
  },
  {
    id: 4,
    nombre: "Satisfacción de empleadores",
    categoria: "Perfil de egreso",
    categoriaId: 1,
    descripcion: "Nivel de satisfacción de los empleadores con los egresados",
  },
  {
    id: 5,
    nombre: "Tasa de titulación",
    categoria: "Egreso",
    categoriaId: 5,
    descripcion: "Porcentaje de egresados que obtienen su título",
  },
]

const CatIndicators: React.FC = () => {
  const [indicadores, setIndicadores] = useState(indicadoresData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIndicator, setSelectedIndicator] = useState<{
    id: number
    nombre: string
    categoriaId: number
    descripcion: string
  } | null>(null)

  const handleOpenModal = (indicator: { id: number; nombre: string; categoriaId: number; descripcion: string } | null = null) => {
    setSelectedIndicator(indicator)
    setIsModalOpen(true)
  }

  const handleSaveIndicator = (indicatorData: {
    nombre: string
    categoriaId: number
    descripcion: string
  }) => {
    // Obtener el nombre de la categoría basado en el ID
    const categoriasData = [
      { id: 1, nombre: "Perfil de egreso" },
      { id: 2, nombre: "Proceso de enseñanza aprendizaje" },
      { id: 3, nombre: "Ingreso" },
      { id: 4, nombre: "Trayectoria escolar" },
      { id: 5, nombre: "Egreso" },
    ]

    const categoriaName = categoriasData.find((cat) => cat.id === indicatorData.categoriaId)?.nombre || ""

    if (selectedIndicator) {
      // Editar indicador existente
      setIndicadores(
        indicadores.map((ind) =>
          ind.id === selectedIndicator.id
            ? {
                ...ind,
                nombre: indicatorData.nombre,
                categoriaId: indicatorData.categoriaId,
                categoria: categoriaName,
                descripcion: indicatorData.descripcion,
              }
            : ind,
        ),
      )
    } else {
      // Agregar nuevo indicador
      const newIndicator = {
        id: indicadores.length > 0 ? Math.max(...indicadores.map((ind) => ind.id)) + 1 : 1,
        nombre: indicatorData.nombre,
        categoriaId: indicatorData.categoriaId,
        categoria: categoriaName,
        descripcion: indicatorData.descripcion,
      }
      setIndicadores([...indicadores, newIndicator])
    }
  }

  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de indicadores</h1>
        <div className="catalog-actions">
          <button className="catalog-button" onClick={() => handleOpenModal()}>
            Agregar indicador
          </button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {indicadores.map((indicador) => (
              <tr key={indicador.id}>
                <td>{indicador.id}</td>
                <td>{indicador.nombre}</td>
                <td>{indicador.categoria}</td>
                <td>{indicador.descripcion}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() =>
                      handleOpenModal({
                        id: indicador.id,
                        nombre: indicador.nombre,
                        categoriaId: indicador.categoriaId,
                        descripcion: indicador.descripcion,
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

      <IndicatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveIndicator}
        initialData={selectedIndicator || undefined}
      />
    </div>
  )
}

export default CatIndicators

