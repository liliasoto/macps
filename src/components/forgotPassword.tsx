"use client"

import React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Send, CheckCircle, AlertCircle, Loader } from "lucide-react"
import logo from "../images/logob.png"
import "../styles/loginStyles.css"
import "../styles/forgotPasswordStyles.css"

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Por favor ingresa tu correo electrónico")
      return
    }

    // Validación básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un correo electrónico válido")
      return
    }

    setIsLoading(true)
    setError("")

    // Simular una petición a la API
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="contenedorprin">
      <div className="contenedorlogo">
        <img src={logo || "/placeholder.svg"} alt="Logo" />
        <h1>MACPS</h1>
      </div>

      <div className="credenciales">
        {!isSubmitted ? (
          <>
            <h2 className="forgot-password-title">Recuperar contraseña</h2>
            <p>
              Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
            </p>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />

              <button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader size={16} className="spinner" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Enviar instrucciones
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <CheckCircle size={48} className="success-icon" />
            <h2>Correo enviado</h2>
            <p>
              Hemos enviado instrucciones para restablecer tu contraseña a <strong>{email}</strong>. Por favor revisa tu
              bandeja de entrada.
            </p>
          </div>
        )}

        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  )
}

export default ForgotPassword

