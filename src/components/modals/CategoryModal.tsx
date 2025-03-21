"use client"

import React from "react"
import { useState, useEffect } from "react"
import Modal from "../ui/Modal.tsx"

// Datos de ejemplo para los ejes
const ejesData = [
  { id: 1, nombre: "Personal académico" },
  { id: 2, nombre: "Estudiantes" },
  { id: 3, nombre: "Plan de estudios" },
  { id: 4, nombre: "Evaluación del aprendizaje" },
  { id: 5, nombre: "Formación integral" },
]

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (category: { nombre: string; ejeId: number }) => void
  initialData?: { nombre: string; ejeId: number }
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    ejeId: initialData?.ejeId || 0,
  })

  // Resetear el formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombre: initialData?.nombre || "",
        ejeId: initialData?.ejeId || 0,
      })
    }
  }, [isOpen, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "ejeId" ? Number.parseInt(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar Categoría" : "Agregar Categoría"}>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre" className="required">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Perfil de egreso"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ejeId" className="required">
            Eje
          </label>
          <select id="ejeId" name="ejeId" value={formData.ejeId} onChange={handleChange} required>
            <option value="">Seleccione un eje</option>
            {ejesData.map((eje) => (
              <option key={eje.id} value={eje.id}>
                {eje.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CategoryModal

