import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logob.png';
import '../styles/loginStyles.css'; 

function Login() {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate('/main');
  };

  return (
    <div className="contenedorprin">
      <div className="contenedorlogo">
        <img src={logo} alt="Logo" />
        <h1>MACPS</h1>
      </div>
      <div className="credenciales">
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button onClick={handleButton}>Iniciar sesión</button>
        <Link to="/forgot-password">
          <p>Olvidé mi contraseña</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
