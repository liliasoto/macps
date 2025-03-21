"use client"

import React from "react"
import { useState } from "react"
import Bar from "./bar.tsx"
import DepartmentModal from "./modals/DepartmentModal.tsx"
import "../styles/catalogs.css"

const departamentosData = [
  { id: 1, nombre: "Sistemas y Computación", jefe: "Dr. Juan Pérez" },
  { id: 2, nombre: "Arquitectura y Diseño", jefe: "Arq. María González" },
  { id: 3, nombre: "Ingeniería Civil", jefe: "Ing. Carlos Rodríguez" },
  { id: 4, nombre: "Ingeniería Industrial", jefe: "Dra. Ana Martínez" },
  { id: 5, nombre: "Ciencias Económico-Administrativas", jefe: "Mtro. Luis Sánchez" },
]

const CatDepartments: React.FC = () => {
  const [departamentos, setDepartamentos] = useState(departamentosData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<{
    id: number
    nombre: string
    jefe: string
  } | null>(null)

  const handleOpenModal = (department: { id: number; nombre: string; jefe: string } | null = null) => {
    setSelectedDepartment(department)
    setIsModalOpen(true)
  }

  const handleSaveDepartment = (departmentData: {
    nombre: string
    jefe: string
  }) => {
    if (selectedDepartment) {
      // Editar departamento existente
      setDepartamentos(
        departamentos.map((dep) => (dep.id === selectedDepartment.id ? { ...dep, ...departmentData } : dep)),
      )
    } else {
      // Agregar nuevo departamento
      const newDepartment = {
        id: departamentos.length > 0 ? Math.max(...departamentos.map((dep) => dep.id)) + 1 : 1,
        ...departmentData,
      }
      setDepartamentos([...departamentos, newDepartment])
    }
  }

  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de Departamentos</h1>
        <div className="catalog-actions">
          <button className="catalog-button" onClick={() => handleOpenModal()}>
            Agregar Departamento
          </button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Jefe de Departamento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {departamentos.map((departamento) => (
              <tr key={departamento.id}>
                <td>{departamento.id}</td>
                <td>{departamento.nombre}</td>
                <td>{departamento.jefe}</td>
                <td>
                  <button
                    className="action-button edit"
                    onClick={() =>
                      handleOpenModal({
                        id: departamento.id,
                        nombre: departamento.nombre,
                        jefe: departamento.jefe,
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

      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDepartment}
        initialData={selectedDepartment || undefined}
      />
    </div>
  )
}

export default CatDepartments

