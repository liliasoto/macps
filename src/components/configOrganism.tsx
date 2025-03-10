"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Bar from "./bar.tsx"
import EditableSection from "./editableSection.tsx"
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
    questions: false,
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

  const [selectedEjeForQuestion, setSelectedEjeForQuestion] = useState("")
  const [selectedCategoriaForQuestion, setSelectedCategoriaForQuestion] = useState("")
  const [selectedIndicadorForQuestion, setSelectedIndicadorForQuestion] = useState("")
  const [selectedEstandarForQuestion, setSelectedEstandarForQuestion] = useState("")
  const [questions, setQuestions] = useState([
    { id: 1, text: "", responseType: "", attachmentRequired: false, validUntil: "", linkedToProcess: false },
  ])

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        text: "",
        responseType: "",
        attachmentRequired: false,
        validUntil: "",
        linkedToProcess: false,
      },
    ])
  }

  const handleQuestionChange = (id, field, value) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const handleSaveQuestions = () => {
    console.log("Preguntas guardadas:", questions)
    // Aquí iría la lógica para guardar las preguntas en el backend
  }

  return (
    <div className="main-container">
      <Bar />
      <main className="config-org-content">
        <h1>Configurar organismo</h1>
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
            <div className="config-section questions-section">
              <h2 onClick={() => toggleSection("questions")}>
                Preguntas
                {expandedSections.questions ? <ChevronUp /> : <ChevronDown />}
              </h2>
              {expandedSections.questions && (
                <div className="questions-content">
                  <div className="question-selects">
                    <select
                      value={selectedEjeForQuestion}
                      onChange={(e) => setSelectedEjeForQuestion(e.target.value)}
                      className="question-select"
                    >
                      <option value="">Seleccione un eje</option>
                      {selectedOrganism?.ejes.map((eje) => (
                        <option key={eje} value={eje}>
                          {eje}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedCategoriaForQuestion}
                      onChange={(e) => setSelectedCategoriaForQuestion(e.target.value)}
                      className="question-select"
                    >
                      <option value="">Seleccione una categoría</option>
                      {selectedOrganism?.categorias[selectedEjeForQuestion]?.map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedIndicadorForQuestion}
                      onChange={(e) => setSelectedIndicadorForQuestion(e.target.value)}
                      className="question-select"
                    >
                      <option value="">Seleccione un indicador</option>
                      {selectedOrganism?.indicadores[selectedCategoriaForQuestion]?.map((indicador) => (
                        <option key={indicador} value={indicador}>
                          {indicador}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedEstandarForQuestion}
                      onChange={(e) => setSelectedEstandarForQuestion(e.target.value)}
                      className="question-select"
                    >
                      <option value="">Seleccione un estándar</option>
                      {selectedOrganism?.estandares[selectedCategoriaForQuestion]?.map((estandar) => (
                        <option key={estandar} value={estandar}>
                          {estandar}
                        </option>
                      ))}
                    </select>
                  </div>
                  {questions.map((question, index) => (
                    <div key={question.id} className="question-form">
                      <div className="question-number">{index + 1}.-</div>
                      <textarea
                        value={question.text}
                        onChange={(e) => handleQuestionChange(question.id, "text", e.target.value)}
                        placeholder="Escriba la pregunta aquí..."
                        className="question-textarea"
                      />
                      <div className="response-type">
                        <p>Tipo de respuesta:</p>
                        <div className="response-options">
                          {["Opción múltiple", "Texto", "Tabla", "Cargar archivo"].map((type) => (
                            <label key={type} className="response-option">
                              <input
                                type="radio"
                                name={`responseType-${question.id}`}
                                value={type}
                                checked={question.responseType === type}
                                onChange={(e) => handleQuestionChange(question.id, "responseType", e.target.value)}
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="attachment-option">
                        <label>
                          <input
                            type="checkbox"
                            checked={question.attachmentRequired}
                            onChange={(e) => handleQuestionChange(question.id, "attachmentRequired", e.target.checked)}
                          />
                          Agregar carga de archivos
                        </label>
                      </div>
                      <div className="validity-date">
                        <label>
                          Vigencia:
                          <input
                            type="date"
                            value={question.validUntil}
                            onChange={(e) => handleQuestionChange(question.id, "validUntil", e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </label>
                      </div>
                      <div className="linked-to-process">
                        <p>Vinculada a proceso:</p>
                        <label>
                          <input
                            type="radio"
                            name={`linkedToProcess-${question.id}`}
                            value="true"
                            checked={question.linkedToProcess}
                            onChange={(e) =>
                              handleQuestionChange(question.id, "linkedToProcess", e.target.value === "true")
                            }
                          />
                          Sí
                        </label>
                        <label>
                          <input
                            type="radio"
                            name={`linkedToProcess-${question.id}`}
                            value="false"
                            checked={!question.linkedToProcess}
                            onChange={(e) =>
                              handleQuestionChange(question.id, "linkedToProcess", e.target.value === "true")
                            }
                          />
                          No
                        </label>
                      </div>
                    </div>
                  ))}
                  <button onClick={handleAddQuestion} className="btn-secondary">
                    Agregar otra pregunta
                  </button>
                  <button onClick={handleSaveQuestions} className="btn-primary">
                    Guardar preguntas
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default ConfigOrganism

