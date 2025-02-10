import React from "react"
import Bar from "./bar.tsx"
import "../styles/catalogs.css"

const carrerasData = [
  { id: 1, nombre: "Ingeniería en Sistemas Computacionales", departamento: "Sistemas y Computación" },
  { id: 2, nombre: "Arquitectura", departamento: "Arquitectura y Diseño" },
  { id: 3, nombre: "Ingeniería Civil", departamento: "Ingeniería Civil" },
  { id: 4, nombre: "Ingeniería Industrial", departamento: "Ingeniería Industrial" },
  { id: 5, nombre: "Licenciatura en Administración", departamento: "Ciencias Económico-Administrativas" },
]

const CatCareers: React.FC = () => {
  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de carreras</h1>
        <div className="catalog-actions">
          <button className="catalog-button">Agregar carrera</button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Departamento</th>
            </tr>
          </thead>
          <tbody>
            {carrerasData.map((carrera) => (
              <tr key={carrera.id}>
                <td>{carrera.id}</td>
                <td>{carrera.nombre}</td>
                <td>{carrera.departamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CatCareers

