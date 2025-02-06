"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Bar from "./bar.tsx"
import EditableSection from "./EditableSection.tsx"
import { ChevronDown, ChevronUp } from "lucide-react"
import "../styles/configStyles.css"

// Datos de ejemplo
const organismosIniciales = [
  {
    id: 1,
    nombre: "CACEI",
    ejes: ["Eje 1", "Eje 2"],
    categorias: { "Eje 1": ["Categoría 1", "Categoría 2"], "Eje 2": ["Categoría 3"] },
    indicadores: { "Categoría 1": ["Indicador 1", "Indicador 2"], "Categoría 2": ["Indicador 3"] },
    estandares: { "Categoría 1": ["Estándar 1", "Estándar 2"], "Categoría 2": ["Estándar 3"] },
  },
  {
    id: 2,
    nombre: "ANPADEH",
    ejes: ["Eje A", "Eje B"],
    categorias: { "Eje A": ["Categoría A", "Categoría B"], "Eje B": ["Categoría C"] },
    indicadores: { "Categoría A": ["Indicador A", "Indicador B"], "Categoría B": ["Indicador C"] },
    estandares: { "Categoría A": ["Estándar A", "Estándar B"], "Categoría B": ["Estándar C"] },
  },
]

const ConfigOrganism: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedOrganismId, setSelectedOrganismId] = useState<number | null>(id ? Number.parseInt(id) : null)
  const [selectedOrganism, setSelectedOrganism] = useState(
    organismosIniciales.find((org) => org.id === selectedOrganismId) || null,
  )
  const [expandedSections, setExpandedSections] = useState({
    ejes: false,
    categorias: false,
    indicadores: false,
    estandares: false,
  })
  const [selectedEje, setSelectedEje] = useState<string | null>(null)
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null)

  useEffect(() => {
    if (selectedOrganismId) {
      const organism = organismosIniciales.find((org) => org.id === selectedOrganismId)
      setSelectedOrganism(organism || null)
      if (organism) {
        setSelectedEje(organism.ejes[0] || null)
        setSelectedCategoria(organism.categorias[organism.ejes[0]]?.[0] || null)
      }
    }
  }, [selectedOrganismId])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSave = (section: string, items: string[]) => {
    if (!selectedOrganism) return

    const updatedOrganism = { ...selectedOrganism }

    switch (section) {
      case "ejes":
        updatedOrganism.ejes = items
        break
      case "categorias":
        if (selectedEje) {
          updatedOrganism.categorias[selectedEje] = items
        }
        break
      case "indicadores":
      case "estandares":
        if (selectedCategoria) {
          updatedOrganism[section][selectedCategoria] = items
        }
        break
    }

    setSelectedOrganism(updatedOrganism)
    alert("Guardado exitoso")
  }

  return (
    <div className="main-container">
      <Bar />
      <main className="config-org-content">
        <h1>Configurar Organismo</h1>
        <select
          value={selectedOrganismId || ""}
          onChange={(e) => setSelectedOrganismId(Number(e.target.value))}
          className="organism-select"
        >
          <option value="">Seleccione un organismo</option>
          {organismosIniciales.map((org) => (
            <option key={org.id} value={org.id}>
              {org.nombre}
            </option>
          ))}
        </select>

        {selectedOrganism && (
          <>
            <div className="config-section">
              <h2 onClick={() => toggleSection("ejes")}>
                Ejes
                {expandedSections.ejes ? <ChevronUp /> : <ChevronDown />}
              </h2>
              {expandedSections.ejes && (
                <EditableSection
                  items={selectedOrganism.ejes}
                  onSave={(items) => handleSave("ejes", items)}
                  onCancel={() => toggleSection("ejes")}
                />
              )}
            </div>

            <div className="config-section">
              <h2 onClick={() => toggleSection("categorias")}>
                Categorías
                {expandedSections.categorias ? <ChevronUp /> : <ChevronDown />}
              </h2>
              {expandedSections.categorias && (
                <>
                  <select
                    value={selectedEje || ""}
                    onChange={(e) => setSelectedEje(e.target.value)}
                    className="sub-select"
                  >
                    {selectedOrganism.ejes.map((eje) => (
                      <option key={eje} value={eje}>
                        {eje}
                      </option>
                    ))}
                  </select>
                  {selectedEje && (
                    <EditableSection
                      items={selectedOrganism.categorias[selectedEje] || []}
                      onSave={(items) => handleSave("categorias", items)}
                      onCancel={() => toggleSection("categorias")}
                    />
                  )}
                </>
              )}
            </div>

            <div className="config-section">
              <h2 onClick={() => toggleSection("indicadores")}>
                Indicadores
                {expandedSections.indicadores ? <ChevronUp /> : <ChevronDown />}
              </h2>
              {expandedSections.indicadores && (
                <>
                  <select
                    value={selectedCategoria || ""}
                    onChange={(e) => setSelectedCategoria(e.target.value)}
                    className="sub-select"
                  >
                    {Object.keys(selectedOrganism.categorias)
                      .flatMap((eje) => selectedOrganism.categorias[eje])
                      .map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                  </select>
                  {selectedCategoria && (
                    <EditableSection
                      items={selectedOrganism.indicadores[selectedCategoria] || []}
                      onSave={(items) => handleSave("indicadores", items)}
                      onCancel={() => toggleSection("indicadores")}
                    />
                  )}
                </>
              )}
            </div>

            <div className="config-section">
              <h2 onClick={() => toggleSection("estandares")}>
                Estándares
                {expandedSections.estandares ? <ChevronUp /> : <ChevronDown />}
              </h2>
              {expandedSections.estandares && (
                <>
                  <select
                    value={selectedCategoria || ""}
                    onChange={(e) => setSelectedCategoria(e.target.value)}
                    className="sub-select"
                  >
                    {Object.keys(selectedOrganism.categorias)
                      .flatMap((eje) => selectedOrganism.categorias[eje])
                      .map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                  </select>
                  {selectedCategoria && (
                    <EditableSection
                      items={selectedOrganism.estandares[selectedCategoria] || []}
                      onSave={(items) => handleSave("estandares", items)}
                      onCancel={() => toggleSection("estandares")}
                    />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default ConfigOrganism

