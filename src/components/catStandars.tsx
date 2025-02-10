import React from "react"
import Bar from "./bar.tsx"
import "../styles/catalogs.css"

const estandaresData = [
  { id: 1, nombre: "Tasa de retención mínima", valor: "70%", categoria: "Trayectoria escolar" },
  { id: 2, nombre: "Eficiencia terminal mínima", valor: "50%", categoria: "Egreso" },
  { id: 3, nombre: "Índice de reprobación máximo", valor: "30%", categoria: "Proceso de enseñanza aprendizaje" },
  { id: 4, nombre: "Satisfacción de empleadores mínima", valor: "80%", categoria: "Perfil de egreso" },
  { id: 5, nombre: "Tasa de titulación mínima", valor: "40%", categoria: "Egreso" },
]

const CatStandars: React.FC = () => {
  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de estándares</h1>
        <div className="catalog-actions">
          <button className="catalog-button">Agregar estándar</button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {estandaresData.map((estandar) => (
              <tr key={estandar.id}>
                <td>{estandar.id}</td>
                <td>{estandar.nombre}</td>
                <td>{estandar.valor}</td>
                <td>{estandar.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CatStandars

