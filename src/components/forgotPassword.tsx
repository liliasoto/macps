import React from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/'); // Regresa a la pantalla de login
  };

  return (
    <div className="contenedorprin">
      <h2>Recuperar contraseña</h2>
      <p>Ingresa tu correo electrónico para restablecer tu contraseña.</p>
      <input type="email" placeholder="Correo electrónico" />
      <button>Enviar enlace</button>
      <button onClick={handleBack}>Volver</button>
    </div>
  );
}

export default ForgotPassword;
