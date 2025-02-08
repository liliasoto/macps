import React from "react"
import { useState, useEffect } from "react"
import Bar from "./bar.tsx"
import "../styles/userStyles.css"
import { Eye, EyeOff } from 'lucide-react';

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
    contraseña: "123",
    rol: "Administrador",
    departamento: "Sistemas y computación",
  },
  {
    id: 2,
    nombre: "Juan",
    apellidoPaterno: "Pérez",
    apellidoMaterno: "García",
    usuario: "juanpg",
    contraseña: "123",
    rol: "Profesor",
    departamento: "Arquitectura",
  },
  {
    id: 3,
    nombre: "María",
    apellidoPaterno: "López",
    apellidoMaterno: "Hernández",
    usuario: "marialh",
    contraseña: "123",
    rol: "Coordinador",
    departamento: "Ciencias básicas",
  },
  {
    id: 4,
    nombre: "Carlos",
    apellidoPaterno: "Ramírez",
    apellidoMaterno: "Sánchez",
    usuario: "carlosrs",
    contraseña: "123",
    rol: "Profesor",
    departamento: "Sistemas y computación",
  },
  {
    id: 5,
    nombre: "Ana",
    apellidoPaterno: "Martínez",
    apellidoMaterno: "Rodríguez",
    usuario: "anamr",
    contraseña: "123",
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
  contraseña: string
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
      <main className="users-main-content">
        <h1>Gestión de usuarios</h1>
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
        <div className="users-table-container">
          <table className="users-table">
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
                  <td>
                    <div className="actions-cell">
                      <button className="action-button edit" onClick={() => handleEditUser(usuario)}>
                        Editar
                      </button>
                      <button className="action-button delete" onClick={() => handleDeleteUser(usuario.id)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="new-user-button" onClick={handleAddUser}>
          Nuevo usuario
        </button>
      </main>
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
      contraseña: "",
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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === "add" ? "Nuevo usuario" : "Editar usuario"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre*</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="apellidoPaterno">Apellido paterno*</label>
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
            <label htmlFor="apellidoMaterno">Apellido materno</label>
            <input
              type="text"
              id="apellidoMaterno"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="usuario">Usuario*</label>
            <input type="text" id="usuario" name="usuario" value={formData.usuario} onChange={handleChange} required />
          </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña*</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
                <input 
                    type={showPassword ? "text" : "password"} 
                    id="contraseña" 
                    name="contraseña" 
                    value={formData.contraseña}
                    onChange={handleChange} 
                    required
                    style={{ paddingRight: '35px' }} // Espacio para el ícono
                />
                <span 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={{
                    position: 'absolute',
                    right: '10px',
                    cursor: 'pointer'
                    }}
                >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </span>
              </div>
            </div>
          <div className="form-group">
            <label htmlFor="departamento">Departamento*</label>
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
            <label htmlFor="rol">Rol*</label>
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
            <button type="submit" className="save-button">
              Guardar
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Users

