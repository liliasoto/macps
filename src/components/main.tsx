import React from "react";
import { BrowserRouter as  Routes, Link } from 'react-router-dom';


export default function Main(){
    
    return(
        <div>
           <div className="barramenu">
                <div className="menuizq">
                  <img/>
                  <Link to="/catalogos">
                    <button className="opmenu">Catálogos</button>
                  </Link>
                  <Link to="/organismos">
                    <button className="opmenu">Organismos</button>
                  </Link>
                  <Link to="/certificaciones">
                    <button className="opmenu">Certificaciones</button>
                  </Link>
                </div>
                <div className="menuder">
                  <Link to="/notificaciones">
                    <img/>
                  </Link>
                  <Link to="/perfil">
                    <img/>
                  </Link>
                </div>
              </div>
        </div>
    );
}