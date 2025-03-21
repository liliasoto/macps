"use client"

import React from "react"
import { useState, useEffect } from "react"
import Modal from "../ui/Modal.tsx"

// Datos de ejemplo para las categorías
const categoriasData = [
  { id: 1, nombre: "Perfil de egreso", eje: "Plan de estudios" },
  { id: 2, nombre: "Proceso de enseñanza aprendizaje", eje: "Evaluación del aprendizaje" },
  { id: 3, nombre: "Ingreso", eje: "Estudiantes" },
  { id: 4, nombre: "Trayectoria escolar", eje: "Estudiantes" },
  { id: 5, nombre: "Egreso", eje: "Estudiantes" },
]

interface StandardModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (standard: { nombre: string; categoriaId: number; valor: string }) => void
  initialData?: { nombre: string; categoriaId: number; valor: string }
}

const StandardModal: React.FC<StandardModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    categoriaId: initialData?.categoriaId || 0,
    valor: initialData?.valor || "",
  })

  // Resetear el formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombre: initialData?.nombre || "",
        categoriaId: initialData?.categoriaId || 0,
        valor: initialData?.valor || "",
      })
    }
  }, [isOpen, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categoriaId" ? Number.parseInt(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar Estándar" : "Agregar Estándar"}>
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
            placeholder="Ej. Tasa de retención mínima"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoriaId" className="required">
            Categoría
          </label>
          <select id="categoriaId" name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
            <option value="">Seleccione una categoría</option>
            {categoriasData.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre} ({categoria.eje})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="valor" className="required">
            Valor
          </label>
          <input
            type="text"
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            placeholder="Ej. 70%"
            required
          />
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

export default StandardModal

