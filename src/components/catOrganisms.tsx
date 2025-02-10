import React from "react"
import Bar from "./bar.tsx"
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
  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de organismos</h1>
        <div className="catalog-actions">
          <button className="catalog-button">Agregar organismo</button>
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
            {organismosData.map((organismo) => (
              <tr key={organismo.id}>
                <td>{organismo.id}</td>
                <td>{organismo.nombre}</td>
                <td>{organismo.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CatOrganisms

