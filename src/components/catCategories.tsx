import React from "react"
import Bar from "./bar.tsx"
import "../styles/catalogs.css"

const categoriasData = [
  { id: 1, nombre: "Perfil de egreso", eje: "Plan de estudios" },
  { id: 2, nombre: "Proceso de enseñanza aprendizaje", eje: "Evaluación del aprendizaje" },
  { id: 3, nombre: "Ingreso", eje: "Estudiantes" },
  { id: 4, nombre: "Trayectoria escolar", eje: "Estudiantes" },
  { id: 5, nombre: "Egreso", eje: "Estudiantes" },
]

const CatCategories: React.FC = () => {
  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de categorías</h1>
        <div className="catalog-actions">
          <button className="catalog-button">Agregar categoría</button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Eje</th>
            </tr>
          </thead>
          <tbody>
            {categoriasData.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{categoria.eje}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CatCategories

