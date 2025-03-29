"use client"

import React from "react"
import { useState, useEffect } from "react"
import Bar from "./bar.tsx"
import "../styles/userStyles.css"
import { X } from "lucide-react"

const departamentos = [
  "Sistemas y computación",
  "Arquitectura",
  "Ciencias básicas",
  "Ingeniería industrial",
  "Ingeniería eléctrica",
]

const roles = ["Administrador", "Profesor", "Coordinador", "Estudiante"]

const usuariosIniciales = [
  {
    id: 1,
    nombre: "Lilia",
    apellidoPaterno: "Soto",
    apellidoMaterno: "Llamas",
    usuario: "liliasoll",
    rol: "Administrador",
    departamento: "Sistemas y computación",
  },
  {
    id: 2,
    nombre: "Juan",
    apellidoPaterno: "Pérez",
    apellidoMaterno: "García",
    usuario: "juanpg",
    rol: "Profesor",
    departamento: "Arquitectura",
  },
  {
    id: 3,
    nombre: "María",
    apellidoPaterno: "López",
    apellidoMaterno: "Hernández",
    usuario: "marialh",
    rol: "Coordinador",
    departamento: "Ciencias básicas",
  },
  {
    id: 4,
    nombre: "Carlos",
    apellidoPaterno: "Ramírez",
    apellidoMaterno: "Sánchez",
    usuario: "carlosrs",
    rol: "Profesor",
    departamento: "Sistemas y computación",
  },
  {
    id: 5,
    nombre: "Ana",
    apellidoPaterno: "Martínez",
    apellidoMaterno: "Rodríguez",
    usuario: "anamr",
    rol: "Administrador",
    departamento: "Ingeniería industrial",
  },
]

interface Usuario {
  id: number
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  usuario: string
  rol: string
  departamento: string
}

const Users: React.FC = () => {
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("")
  const [usuarios, setUsuarios] = useState(usuariosIniciales)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null)

  useEffect(() => {
    if (departamentoSeleccionado) {
      const usuariosFiltrados = usuariosIniciales.filter((usuario) => usuario.departamento === departamentoSeleccionado)
      setUsuarios(usuariosFiltrados)
    } else {
      setUsuarios(usuariosIniciales)
    }
  }, [departamentoSeleccionado])

  const handleAddUser = () => {
    setModalMode("add")
    setCurrentUser(null)
    setShowModal(true)
  }

  const handleEditUser = (user: Usuario) => {
    setModalMode("edit")
    setCurrentUser(user)
    setShowModal(true)
  }

  const handleDeleteUser = (userId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      setUsuarios(usuarios.filter((user) => user.id !== userId))
    }
  }

  const handleSaveUser = (user: Usuario) => {
    if (modalMode === "add") {
      setUsuarios([...usuarios, { ...user, id: usuarios.length + 1 }])
    } else {
      setUsuarios(usuarios.map((u) => (u.id === user.id ? user : u)))
    }
    setShowModal(false)
  }

  return (
    <div className="main-container">
      <Bar />
      <div className="catalog-container">
        <h1 className="catalog-title">Gestión de usuarios</h1>
        <div className="users-controls">
          <select
            name="Departamentos"
            value={departamentoSeleccionado}
            onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
            className="department-select"
          >
            <option value="">Todos los departamentos</option>
            {departamentos.map((depto, index) => (
              <option key={index} value={depto}>
                {depto}
              </option>
            ))}
          </select>
        </div>
        <div className="catalog-actions">
          <button className="catalog-button" onClick={handleAddUser}>
            Agregar usuario
          </button>
        </div>
        <div className="users-table-container">
          <table className="catalog-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Departamento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{`${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`}</td>
                  <td>{usuario.usuario}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.departamento}</td>
                  <td className="actions-cell">
                    <button className="action-button edit" onClick={() => handleEditUser(usuario)}>
                      Editar
                    </button>
                    <button className="action-button delete" onClick={() => handleDeleteUser(usuario.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <UserModal mode={modalMode} user={currentUser} onSave={handleSaveUser} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

interface UserModalProps {
  mode: "add" | "edit"
  user: Usuario | null
  onSave: (user: Usuario) => void
  onClose: () => void
}

const UserModal: React.FC<UserModalProps> = ({ mode, user, onSave, onClose }) => {
  const [formData, setFormData] = useState<Usuario>(
    user || {
      id: 0,
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      usuario: "",
      rol: "",
      departamento: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{mode === "add" ? "Nuevo Usuario" : "Editar Usuario"}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-content">
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre" className="required">
                Nombre
              </label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="apellidoPaterno" className="required">
                Apellido Paterno
              </label>
              <input
                type="text"
                id="apellidoPaterno"
                name="apellidoPaterno"
                value={formData.apellidoPaterno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellidoMaterno">Apellido Materno</label>
              <input
                type="text"
                id="apellidoMaterno"
                name="apellidoMaterno"
                value={formData.apellidoMaterno}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="usuario" className="required">
                Usuario
              </label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                required
              />
            </div>
            {mode === "add" && (
              <div className="form-group">
                <label htmlFor="password" className="required">
                  Contraseña
                </label>
                <input type="password" id="password" name="password" onChange={handleChange} required />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="departamento" className="required">
                Departamento
              </label>
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un departamento</option>
                {departamentos.map((depto, index) => (
                  <option key={index} value={depto}>
                    {depto}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="rol" className="required">
                Rol
              </label>
              <select id="rol" name="rol" value={formData.rol} onChange={handleChange} required>
                <option value="">Seleccione un rol</option>
                {roles.map((rol, index) => (
                  <option key={index} value={rol}>
                    {rol}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Users

