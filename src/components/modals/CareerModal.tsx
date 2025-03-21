"use client"

import React from "react"
import { useState, useEffect } from "react"
import Modal from "../ui/Modal.tsx"

// Datos de ejemplo para los departamentos
const departamentosData = [
  { id: 1, nombre: "Sistemas y Computación" },
  { id: 2, nombre: "Arquitectura y Diseño" },
  { id: 3, nombre: "Ingeniería Civil" },
  { id: 4, nombre: "Ingeniería Industrial" },
  { id: 5, nombre: "Ciencias Económico-Administrativas" },
]

interface CareerModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (career: { nombre: string; departamentoId: number }) => void
  initialData?: { nombre: string; departamentoId: number }
}

const CareerModal: React.FC<CareerModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    departamentoId: initialData?.departamentoId || 0,
  })

  // Resetear el formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nombre: initialData?.nombre || "",
        departamentoId: initialData?.departamentoId || 0,
      })
    }
  }, [isOpen, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "departamentoId" ? Number.parseInt(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar Carrera" : "Agregar Carrera"}>
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
            placeholder="Ej. Ingeniería en Sistemas Computacionales"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="departamentoId" className="required">
            Departamento
          </label>
          <select
            id="departamentoId"
            name="departamentoId"
            value={formData.departamentoId}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un departamento</option>
            {departamentosData.map((departamento) => (
              <option key={departamento.id} value={departamento.id}>
                {departamento.nombre}
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

export default CareerModal

