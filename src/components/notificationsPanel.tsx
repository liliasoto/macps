"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import { Bell, X, Check, Clock } from "lucide-react"
import "../styles/dropdownPanels.css"

// Tipos para las notificaciones
interface Notification {
  id: number
  message: string
  type: "warning" | "info" | "success" | "error"
  date: string
  read: boolean
}

// Datos de ejemplo para las notificaciones
const sampleNotifications: Notification[] = [
  {
    id: 1,
    message: 'El documento "Informe de Autoevaluación" está a punto de expirar. Recomendamos actualizarlo.',
    type: "warning",
    date: "2023-11-15T10:30:00",
    read: false,
  },
  {
    id: 2,
    message: "Se ha asignado un nuevo indicador para el departamento de Sistemas y Computación.",
    type: "info",
    date: "2023-11-14T14:45:00",
    read: false,
  },
  {
    id: 3,
    message: 'La evidencia "Plan de Estudios 2023" ha sido aprobada.',
    type: "success",
    date: "2023-11-12T09:15:00",
    read: true,
  },
  {
    id: 4,
    message: "Se requiere su atención en el proceso de certificación CACEI.",
    type: "info",
    date: "2023-11-10T16:20:00",
    read: true,
  },
  {
    id: 5,
    message: 'La fecha límite para el estándar "Tasa de Egreso" ha sido actualizada.',
    type: "warning",
    date: "2023-11-08T11:05:00",
    read: true,
  },
]

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
  const [unreadCount, setUnreadCount] = useState<number>(0)
  const panelRef = useRef<HTMLDivElement>(null)

  // Calcular el número de notificaciones no leídas
  useEffect(() => {
    const count = notifications.filter((notification) => !notification.read).length
    setUnreadCount(count)
  }, [notifications])

  // Cerrar el panel al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Marcar una notificación como leída
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  // Formatear la fecha para mostrarla de manera amigable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Hoy"
    } else if (diffDays === 1) {
      return "Ayer"
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`
    } else {
      return date.toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" })
    }
  }

  // Obtener el icono según el tipo de notificación
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <Clock className="notification-icon warning" />
      case "success":
        return <Check className="notification-icon success" />
      case "error":
        return <X className="notification-icon error" />
      default:
        return <Bell className="notification-icon info" />
    }
  }

  return (
    <>
      {/* Indicador de notificaciones no leídas */}
      {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}

      {/* Panel de notificaciones */}
      <div ref={panelRef} className={`dropdown-panel notifications-panel ${isOpen ? "active" : ""}`}>
        <div className="panel-header">
          <h3>Notificaciones</h3>
          {unreadCount > 0 && (
            <button className="mark-all-read" onClick={markAllAsRead}>
              Marcar todas como leídas
            </button>
          )}
        </div>

        <div className="panel-content">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <Bell size={48} />
              <p>No tienes notificaciones</p>
            </div>
          ) : (
            <ul className="notifications-list">
              {notifications.map((notification) => (
                <li key={notification.id} className={`notification-item ${notification.read ? "read" : "unread"}`}>
                  <div className="notification-content">
                    {getNotificationIcon(notification.type)}
                    <div className="notification-text">
                      <p>{notification.message}</p>
                      <span className="notification-date">{formatDate(notification.date)}</span>
                    </div>
                  </div>
                  {!notification.read && (
                    <button
                      className="mark-read-button"
                      onClick={() => markAsRead(notification.id)}
                      aria-label="Marcar como leída"
                    >
                      <Check size={16} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel-footer">
          <a href="#" className="view-all-link">
            Ver todas las notificaciones
          </a>
        </div>
      </div>
    </>
  )
}

export default NotificationsPanel

