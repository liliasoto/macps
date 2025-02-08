"use client"

import React from "react"
import { useState } from "react"
import Bar from "./bar.tsx"
import { ChevronDown, ChevronUp, Save } from "lucide-react"
import "../styles/configProcessStyles.css"

// Datos de ejemplo
const procesos = [
  { id: 1, nombre: "Certificación CACEI 2023 - Ingeniería en Sistemas Computacionales" },
  { id: 2, nombre: "Acreditación ANPADEH 2023 - Arquitectura" },
  { id: 3, nombre: "Certificación CONAIC 2024 - Ingeniería en Informática" },
]

const categorias = [
  "Liderazgo Institucional",
  "Gestión del Programa",
  "Infraestructura y Equipamiento",
  "Personal Académico",
  "Estudiantes y Egresados",
]

const indicadores = [
  "Misión y Visión",
  "Plan de Estudios",
  "Laboratorios y Talleres",
  "Perfil del Profesorado",
  "Tasa de Egreso",
  "Vinculación con el Sector Productivo",
  "Investigación y Desarrollo",
  "Servicios de Apoyo al Estudiante",
]

const departamentos = [
  "Dirección Académica",
  "Coordinación de Carrera",
  "Servicios Escolares",
  "Vinculación",
  "Investigación y Posgrado",
]

const ConfigProcess: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState<string>("")
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})
  const [categoriasResp, setCategoriasResp] = useState<{ [key: string]: string }>({})
  const [indicadoresResp, setIndicadoresResp] = useState<{ [key: string]: string }>({})

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCategoriaChange = (categoria: string, departamento: string) => {
    setCategoriasResp((prev) => ({ ...prev, [categoria]: departamento }))
  }

  const handleIndicadorChange = (indicador: string, departamento: string) => {
    setIndicadoresResp((prev) => ({ ...prev, [indicador]: departamento }))
  }

  const handleSave = () => {
    console.log("Guardando configuración:", { categoriasResp, indicadoresResp })
    // Aquí iría la lógica para guardar la configuración
    alert("Configuración guardada exitosamente")
  }

  return (
    <div className="main-container">
      <Bar />
      <main className="config-process-content">
        <h1>Configurar proceso de certificación</h1>
        <select className="process-select" value={selectedProcess} onChange={(e) => setSelectedProcess(e.target.value)}>
          <option value="">Seleccione un proceso</option>
          {procesos.map((proceso) => (
            <option key={proceso.id} value={proceso.id.toString()}>
              {proceso.nombre}
            </option>
          ))}
        </select>

        {selectedProcess && (
          <>
            <section className="config-section">
              <h2 onClick={() => toggleSection("categorias")}>
                Categorías
                {expandedSections["categorias"] ? <ChevronUp /> : <ChevronDown />}
              </h2>
              {expandedSections["categorias"] && (
                <div className="config-items">
                  {categorias.map((categoria) => (
                    <div key={categoria} className="config-item">
                      <span>{categoria}</span>
                      <select
                        value={categoriasResp[categoria] || ""}
                        onChange={(e) => handleCategoriaChange(categoria, e.target.value)}
                        className="department-select"
                      >
                        <option value="">Seleccione departamento</option>
                        {departamentos.map((depto) => (
                          <option key={depto} value={depto}>
                            {depto}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="config-section">
              <h2 onClick={() => toggleSection("indicadores")}>
                Indicadores
                {expandedSections["indicadores"] ? <ChevronUp /> : <ChevronDown />}
              </h2>
              {expandedSections["indicadores"] && (
                <div className="config-items">
                  {indicadores.map((indicador) => (
                    <div key={indicador} className="config-item">
                      <span>{indicador}</span>
                      <select
                        value={indicadoresResp[indicador] || ""}
                        onChange={(e) => handleIndicadorChange(indicador, e.target.value)}
                        className="department-select"
                      >
                        <option value="">Seleccione departamento</option>
                        {departamentos.map((depto) => (
                          <option key={depto} value={depto}>
                            {depto}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <button onClick={handleSave} className="save-button">
                Guardar configuración <Save className="mr-2 h-4 w-4" />
            </button>
          </>
        )}
      </main>
    </div>
  )
}

export default ConfigProcess

