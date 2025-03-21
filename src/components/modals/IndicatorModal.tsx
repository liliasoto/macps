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

interface IndicatorModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (indicator: { nombre: string; categoriaId: number; descripcion: string }) => void
  initialData?: { nombre: string; categoriaId: number; descripcion: string }
}

const IndicatorModal: React.FC<IndicatorModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    categoriaId: initialData?.categoriaId || 0,
    descripcion: initialData?.descripcion || "",
  })

  // Resetear el formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombre: initialData?.nombre || "",
        categoriaId: initialData?.categoriaId || 0,
        descripcion: initialData?.descripcion || "",
      })
    }
  }, [isOpen, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar Indicador" : "Agregar Indicador"}>
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
            placeholder="Ej. Tasa de retención"
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
          <label htmlFor="descripcion" className="required">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Ej. Porcentaje de estudiantes que permanecen en el programa"
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

export default IndicatorModal

