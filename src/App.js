
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from './components/main.tsx';
import React from 'react';
import logo from './images/logomacpspng.png';

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <div className="contenedorprin">
                <div className="contenedorlogo">
                  <img src={logo} alt="Logo"></img>
                  <h1>MACPS</h1>
                </div>
                <div className="credenciales">
                  <input type="text" placeholder="Usuario"></input>
                  <input type="password" placeholder="Contraseña"></input>
                  <Link to="/main">
                    <button>Iniciar sesión</button>
                  </Link>
                  <Link>
                    <p>Olvidé mi contraseña</p>
                  </Link>
                </div>  
              </div>
            </>
          } />
          <Route path="/main" element={<Main/>}/>
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
