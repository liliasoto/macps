import React from "react"
import Bar from "./bar.tsx"
import "../styles/catalogs.css"

const ejesData = [
  { id: 1, nombre: "Personal académico", descripcion: "Evalúa la calidad y suficiencia del personal docente" },
  {
    id: 2,
    nombre: "Estudiantes",
    descripcion: "Analiza los procesos de admisión, permanencia y egreso de los estudiantes",
  },
  {
    id: 3,
    nombre: "Plan de estudios",
    descripcion: "Examina la estructura, contenido y actualización del plan de estudios",
  },
  {
    id: 4,
    nombre: "Evaluación del aprendizaje",
    descripcion: "Valora los métodos y criterios de evaluación del aprendizaje",
  },
  {
    id: 5,
    nombre: "Formación integral",
    descripcion: "Evalúa las actividades complementarias que contribuyen a la formación integral del estudiante",
  },
]

const CatAxles: React.FC = () => {
  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de ejes</h1>
        <div className="catalog-actions">
          <button className="catalog-button">Agregar eje</button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {ejesData.map((eje) => (
              <tr key={eje.id}>
                <td>{eje.id}</td>
                <td>{eje.nombre}</td>
                <td>{eje.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CatAxles

