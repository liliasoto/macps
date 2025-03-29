"use client"

import React from "react"
import { useState } from "react"
import Bar from "./bar.tsx"
import OrganismModal from "./modals/OrganismModal.tsx"
import "../styles/catalogs.css"

const organismosData = [
  { id: 1, nombre: "CACEI", descripcion: "Consejo de Acreditación de la Enseñanza de la Ingeniería" },
  {
    id: 2,
    nombre: "ANPADEH",
    descripcion: "Acreditadora Nacional de Programas de Arquitectura y Disciplinas del Espacio Habitable",
  },
  { id: 3, nombre: "CONAIC", descripcion: "Consejo Nacional de Acreditación en Informática y Computación" },
  { id: 4, nombre: "CACECA", descripcion: "Consejo de Acreditación en Ciencias Administrativas Contables y Afines" },
  { id: 5, nombre: "CONAET", descripcion: "Consejo Nacional para la Calidad de la Educación Turística" },
]

const CatOrganisms: React.FC = () => {
  const [organismos, setOrganismos] = useState(organismosData)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrganism, setSelectedOrganism] = useState<{ id: number; nombre: string; descripcion: string } | null>(
    null,
  )

  const handleOpenModal = (organism: { id: number; nombre: string; descripcion: string } | null = null) => {
    setSelectedOrganism(organism)
    setIsModalOpen(true)
  }

  const handleSaveOrganism = (organismData: { nombre: string; descripcion: string }) => {
    if (selectedOrganism) {
      // Editar organismo existente
      setOrganismos(organismos.map((org) => (org.id === selectedOrganism.id ? { ...org, ...organismData } : org)))
    } else {
      // Agregar nuevo organismo
      const newOrganism = {
        id: organismos.length > 0 ? Math.max(...organismos.map((org) => org.id)) + 1 : 1,
        ...organismData,
      }
      setOrganismos([...organismos, newOrganism])
    }
  }

  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de organismos</h1>
        <div className="catalog-actions">
          <button className="catalog-button" onClick={() => handleOpenModal()}>
            Agregar organismo
          </button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {organismos.map((organismo) => (
              <tr key={organismo.id}>
                <td>{organismo.id}</td>
                <td>{organismo.nombre}</td>
                <td>{organismo.descripcion}</td>
                <td>
                  <button className="action-button edit" onClick={() => handleOpenModal(organismo)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OrganismModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveOrganism}
        initialData={selectedOrganism || undefined}
      />
    </div>
  )
}

export default CatOrganisms

