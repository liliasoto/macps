"use client"
import { useState } from "react"
import React from "react"

import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext.tsx"
import logo from "../images/logob.png"
import "../styles/loginStyles.css"
import { AlertCircle, Loader } from "lucide-react"

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const success = await login(username, password)

      if (success) {
        navigate("/main")
      } else {
        setError("Usuario o contraseña incorrectos")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intenta de nuevo.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="contenedorprin">
      <div className="contenedorlogo">
        <img src={logo || "/placeholder.svg"} alt="Logo" />
        <h1>MACPS</h1>
      </div>
      <form className="credenciales" onSubmit={handleLogin}>
        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader size={16} className="spinner" />
              Iniciando sesión...
            </>
          ) : (
            "Iniciar sesión"
          )}
        </button>
        <Link to="/forgot-password">
          <p>Olvidé mi contraseña</p>
        </Link>
      </form>
    </div>
  )
}

export default Login

