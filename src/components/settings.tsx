"use client"

import React from "react"
import { useState } from "react"
import { Save, Bell, Moon, Sun, Lock, Eye, EyeOff } from "lucide-react"
import Bar from "./bar.tsx"
import "../styles/settingsStyles.css"

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("cuenta")
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark")
    }
    return false
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sistema: true,
    procesos: true,
    evidencias: true,
    usuarios: false,
    reportes: true,
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para cambiar la contraseña
    alert("Contraseña actualizada correctamente")
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar las preferencias de notificaciones
    alert("Preferencias de notificaciones guardadas correctamente")
  }

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDarkMode(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDarkMode(true)
    }
  }

  return (
    <div className="main-container">
      <Bar />
      <main className="settings-content">
        <h1>Configuración</h1>

        <div className="settings-container">
          <div className="settings-sidebar">
            <button
              className={`settings-tab ${activeTab === "cuenta" ? "active" : ""}`}
              onClick={() => setActiveTab("cuenta")}
            >
              <Lock size={18} />
              <span>Cuenta y Seguridad</span>
            </button>
            <button
              className={`settings-tab ${activeTab === "notificaciones" ? "active" : ""}`}
              onClick={() => setActiveTab("notificaciones")}
            >
              <Bell size={18} />
              <span>Notificaciones</span>
            </button>
            <button
              className={`settings-tab ${activeTab === "apariencia" ? "active" : ""}`}
              onClick={() => setActiveTab("apariencia")}
            >
              {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              <span>Apariencia</span>
            </button>
          </div>

          <div className="settings-panel">
            {activeTab === "cuenta" && (
              <div className="settings-section">
                <h2>Cambiar Contraseña</h2>
                <form onSubmit={handlePasswordSubmit} className="settings-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Contraseña Actual</label>
                    <div className="password-input-container">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        id="currentPassword"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">Nueva Contraseña</label>
                    <div className="password-input-container">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                    <div className="password-input-container">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="settings-save-button">
                    <Save size={16} />
                    Guardar Cambios
                  </button>
                </form>

                <div className="settings-info">
                  <h3>Información de Seguridad</h3>
                  <p>
                    Tu contraseña debe tener al menos 8 caracteres e incluir una combinación de letras, números y
                    caracteres especiales.
                  </p>
                  <p>Por seguridad, te recomendamos cambiar tu contraseña regularmente.</p>
                </div>
              </div>
            )}

            {activeTab === "notificaciones" && (
              <div className="settings-section">
                <h2>Preferencias de Notificaciones</h2>
                <form onSubmit={handleNotificationsSubmit} className="settings-form">
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="email"
                        checked={notificationSettings.email}
                        onChange={handleNotificationChange}
                      />
                      <span>Recibir notificaciones por correo electrónico</span>
                    </label>
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="sistema"
                        checked={notificationSettings.sistema}
                        onChange={handleNotificationChange}
                      />
                      <span>Recibir notificaciones del sistema</span>
                    </label>
                  </div>

                  <h3>Notificarme sobre:</h3>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="procesos"
                        checked={notificationSettings.procesos}
                        onChange={handleNotificationChange}
                      />
                      <span>Actualizaciones de procesos de certificación</span>
                    </label>
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="evidencias"
                        checked={notificationSettings.evidencias}
                        onChange={handleNotificationChange}
                      />
                      <span>Cambios en evidencias</span>
                    </label>
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="usuarios"
                        checked={notificationSettings.usuarios}
                        onChange={handleNotificationChange}
                      />
                      <span>Cambios en usuarios y permisos</span>
                    </label>
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="reportes"
                        checked={notificationSettings.reportes}
                        onChange={handleNotificationChange}
                      />
                      <span>Generación de reportes</span>
                    </label>
                  </div>

                  <button type="submit" className="settings-save-button">
                    <Save size={16} />
                    Guardar Preferencias
                  </button>
                </form>
              </div>
            )}

            {activeTab === "apariencia" && (
              <div className="settings-section">
                <h2>Apariencia</h2>

                <div className="theme-selector">
                  <h3>Tema</h3>
                  <div className="theme-options">
                    <button
                      className={`theme-option ${!isDarkMode ? "active" : ""}`}
                      onClick={() => {
                        if (isDarkMode) toggleDarkMode()
                      }}
                    >
                      <Sun size={24} />
                      <span>Claro</span>
                    </button>

                    <button
                      className={`theme-option ${isDarkMode ? "active" : ""}`}
                      onClick={() => {
                        if (!isDarkMode) toggleDarkMode()
                      }}
                    >
                      <Moon size={24} />
                      <span>Oscuro</span>
                    </button>
                  </div>

                  <p className="theme-description">
                    El tema oscuro reduce la fatiga visual en entornos con poca luz y puede ahorrar batería en
                    dispositivos con pantallas OLED.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings

