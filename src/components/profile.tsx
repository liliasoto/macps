"use client"

import React from "react"
import { useState } from "react"
import { Camera, Mail, Building, UserCircle, Briefcase, Calendar, MapPin, Edit } from "lucide-react"
import Bar from "./bar.tsx"
import "../styles/profileStyles.css"

// Datos de ejemplo para el usuario
const userData = {
  id: 1,
  nombre: "Lilia Soto",
  apellidoPaterno: "Soto",
  apellidoMaterno: "Llamas",
  email: "liliasoll@example.com",
  usuario: "liliasoll",
  rol: "Administrador",
  departamento: "Sistemas y computación",
  fechaRegistro: "2022-05-15",
  ubicacion: "Campus Principal",
  avatar: null, // URL de la imagen de avatar, null para usar el icono por defecto
  bio: "Coordinadora de procesos de certificación con más de 8 años de experiencia en acreditación académica. Especialista en gestión de evidencias y documentación para organismos certificadores.",
}

// Datos de ejemplo para actividades recientes
const actividadesRecientes = [
  {
    id: 1,
    tipo: "Proceso",
    descripcion: "Inició proceso de certificación CACEI para Ingeniería en Sistemas Computacionales",
    fecha: "2023-11-20",
  },
  {
    id: 2,
    tipo: "Evidencia",
    descripcion: "Subió 5 nuevas evidencias para el proceso ANPADEH - Arquitectura",
    fecha: "2023-11-18",
  },
  {
    id: 3,
    tipo: "Configuración",
    descripcion: "Actualizó la configuración del organismo CONAIC",
    fecha: "2023-11-15",
  },
  {
    id: 4,
    tipo: "Usuario",
    descripcion: "Agregó 3 nuevos usuarios al sistema",
    fecha: "2023-11-10",
  },
]

// Datos de ejemplo para procesos asignados
const procesosAsignados = [
  {
    id: 1,
    nombre: "Certificación CACEI 2023",
    carrera: "Ingeniería en Sistemas Computacionales",
    progreso: 75,
    fechaLimite: "2023-12-31",
  },
  {
    id: 2,
    nombre: "Acreditación ANPADEH 2023",
    carrera: "Arquitectura",
    progreso: 40,
    fechaLimite: "2024-03-15",
  },
  {
    id: 3,
    nombre: "Certificación CONAIC 2024",
    carrera: "Ingeniería en Informática",
    progreso: 10,
    fechaLimite: "2024-06-30",
  },
]

const Profile: React.FC = () => {
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [bio, setBio] = useState(userData.bio)

  const handleSaveBio = () => {
    // Aquí iría la lógica para guardar la bio en el backend
    setIsEditingBio(false)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-MX", options)
  }

  return (
    <div className="main-container">
      <Bar />
      <main className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {userData.avatar ? (
                <img src={userData.avatar || "/placeholder.svg"} alt={userData.nombre} />
              ) : (
                <UserCircle size={80} />
              )}
              <button className="avatar-upload-button">
                <Camera size={16} />
              </button>
            </div>
          </div>
          <div className="profile-info">
            <h1>{userData.nombre}</h1>
            <div className="profile-details">
              <div className="profile-detail">
                <Mail size={16} />
                <span>{userData.email}</span>
              </div>
              <div className="profile-detail">
                <Building size={16} />
                <span>{userData.departamento}</span>
              </div>
              <div className="profile-detail">
                <Briefcase size={16} />
                <span>{userData.rol}</span>
              </div>
              <div className="profile-detail">
                <Calendar size={16} />
                <span>Miembro desde {formatDate(userData.fechaRegistro)}</span>
              </div>
              <div className="profile-detail">
                <MapPin size={16} />
                <span>{userData.ubicacion}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-sections">
          <div className="profile-section">
            <div className="section-header">
              <h2>Biografía</h2>
              <button className="edit-button" onClick={() => setIsEditingBio(!isEditingBio)}>
                <Edit size={16} />
                {isEditingBio ? "Cancelar" : "Editar"}
              </button>
            </div>
            {isEditingBio ? (
              <div className="bio-edit">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  placeholder="Escribe una breve descripción sobre ti..."
                />
                <button className="save-button" onClick={handleSaveBio}>
                  Guardar
                </button>
              </div>
            ) : (
              <p className="bio-text">{bio}</p>
            )}
          </div>

          <div className="profile-section">
            <h2>Procesos Asignados</h2>
            <div className="procesos-list">
              {procesosAsignados.map((proceso) => (
                <div key={proceso.id} className="proceso-card">
                  <div className="proceso-info">
                    <h3>{proceso.nombre}</h3>
                    <p>{proceso.carrera}</p>
                    <div className="proceso-meta">
                      <span>Fecha límite: {formatDate(proceso.fechaLimite)}</span>
                    </div>
                  </div>
                  <div className="proceso-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${proceso.progreso}%` }}></div>
                    </div>
                    <span className="progress-text">{proceso.progreso}% completado</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h2>Actividad Reciente</h2>
            <div className="actividades-list">
              {actividadesRecientes.map((actividad) => (
                <div key={actividad.id} className="actividad-item">
                  <div className="actividad-fecha">{formatDate(actividad.fecha)}</div>
                  <div className="actividad-content">
                    <div className={`actividad-tipo ${actividad.tipo.toLowerCase()}`}>{actividad.tipo}</div>
                    <p className="actividad-descripcion">{actividad.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile

