"use client"

import React from "react"
import { useState } from "react"
import Modal from "../ui/Modal.tsx"

interface DepartmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (department: { nombre: string; jefe: string }) => void
  initialData?: { nombre: string; jefe: string }
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    jefe: initialData?.jefe || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Editar Departamento" : "Agregar Departamento"}>
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
            placeholder="Ej. Sistemas y Computación"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="jefe" className="required">
            Jefe de Departamento
          </label>
          <input
            type="text"
            id="jefe"
            name="jefe"
            value={formData.jefe}
            onChange={handleChange}
            placeholder="Ej. Dr. Juan Pérez"
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

export default DepartmentModal

