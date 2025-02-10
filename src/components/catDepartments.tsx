import React from "react"
import Bar from "./bar.tsx"
import "../styles/catalogs.css"

const departamentosData = [
  { id: 1, nombre: "Sistemas y Computación", jefe: "Dr. Juan Pérez" },
  { id: 2, nombre: "Arquitectura y Diseño", jefe: "Arq. María González" },
  { id: 3, nombre: "Ingeniería Civil", jefe: "Ing. Carlos Rodríguez" },
  { id: 4, nombre: "Ingeniería Industrial", jefe: "Dra. Ana Martínez" },
  { id: 5, nombre: "Ciencias Económico-Administrativas", jefe: "Mtro. Luis Sánchez" },
]

const CatDepartments: React.FC = () => {
  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de departamentos</h1>
        <div className="catalog-actions">
          <button className="catalog-button">Agregar departamento</button>
        </div>
        <table className="catalog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Jefe de Departamento</th>
            </tr>
          </thead>
          <tbody>
            {departamentosData.map((departamento) => (
              <tr key={departamento.id}>
                <td>{departamento.id}</td>
                <td>{departamento.nombre}</td>
                <td>{departamento.jefe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CatDepartments

