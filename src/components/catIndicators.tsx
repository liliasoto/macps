import React from "react"
import Bar from "./bar.tsx"
import "../styles/catalogs.css"

const indicadoresData = [
  {
    id: 1,
    nombre: "Tasa de retención",
    categoria: "Trayectoria escolar",
    descripcion: "Porcentaje de estudiantes que permanecen en el programa",
  },
  {
    id: 2,
    nombre: "Eficiencia terminal",
    categoria: "Egreso",
    descripcion: "Porcentaje de estudiantes que concluyen el programa en el tiempo establecido",
  },
  {
    id: 3,
    nombre: "Índice de reprobación",
    categoria: "Proceso de enseñanza aprendizaje",
    descripcion: "Porcentaje de estudiantes que no aprueban las asignaturas",
  },
  {
    id: 4,
    nombre: "Satisfacción de empleadores",
    categoria: "Perfil de egreso",
    descripcion: "Nivel de satisfacción de los empleadores con los egresados",
  },
  {
    id: 5,
    nombre: "Tasa de titulación",
    categoria: "Egreso",
    descripcion: "Porcentaje de egresados que obtienen su título",
  },
]

const CatIndicators: React.FC = () => {
  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de indicadores</h1>
        <div className="catalog-actions">
          <button className="catalog-button">Agregar indicador</button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {indicadoresData.map((indicador) => (
              <tr key={indicador.id}>
                <td>{indicador.id}</td>
                <td>{indicador.nombre}</td>
                <td>{indicador.categoria}</td>
                <td>{indicador.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CatIndicators

