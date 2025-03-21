"use client"

import React from "react"
import { useState } from "react"
import Bar from "./bar.tsx"
import CategoryModal from "./modals/CategoryModal.tsx"
import "../styles/catalogs.css"

const categoriasData = [
  { id: 1, nombre: "Perfil de egreso", eje: "Plan de estudios", ejeId: 3 },
  { id: 2, nombre: "Proceso de enseñanza aprendizaje", eje: "Evaluación del aprendizaje", ejeId: 4 },
  { id: 3, nombre: "Ingreso", eje: "Estudiantes", ejeId: 2 },
  { id: 4, nombre: "Trayectoria escolar", eje: "Estudiantes", ejeId: 2 },
  { id: 5, nombre: "Egreso", eje: "Estudiantes", ejeId: 2 },
]

const CatCategories: React.FC = () => {
  const [categorias, setCategorias] = useState(categoriasData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<{ id: number; nombre: string; ejeId: number } | null>(null)

  const handleOpenModal = (category: { id: number; nombre: string; ejeId: number } | null = null) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleSaveCategory = (categoryData: { nombre: string; ejeId: number }) => {
    // Obtener el nombre del eje basado en el ID
    const ejesData = [
      { id: 1, nombre: "Personal académico" },
      { id: 2, nombre: "Estudiantes" },
      { id: 3, nombre: "Plan de estudios" },
      { id: 4, nombre: "Evaluación del aprendizaje" },
      { id: 5, nombre: "Formación integral" },
    ]

    const ejeName = ejesData.find((eje) => eje.id === categoryData.ejeId)?.nombre || ""

    if (selectedCategory) {
      // Editar categoría existente
      setCategorias(
        categorias.map((cat) =>
          cat.id === selectedCategory.id
            ? { ...cat, nombre: categoryData.nombre, ejeId: categoryData.ejeId, eje: ejeName }
            : cat,
        ),
      )
    } else {
      // Agregar nueva categoría
      const newCategory = {
        id: categorias.length > 0 ? Math.max(...categorias.map((cat) => cat.id)) + 1 : 1,
        nombre: categoryData.nombre,
        ejeId: categoryData.ejeId,
        eje: ejeName,
      }
      setCategorias([...categorias, newCategory])
    }
  }

  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de Categorías</h1>
        <div className="catalog-actions">
          <button className="catalog-button" onClick={() => handleOpenModal()}>
            Agregar Categoría
          </button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Eje</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{categoria.eje}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() =>
                      handleOpenModal({
                        id: categoria.id,
                        nombre: categoria.nombre,
                        ejeId: categoria.ejeId,
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

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        initialData={selectedCategory || undefined}
      />
    </div>
  )
}

export default CatCategories

