import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/main.tsx';
import Login from './components/login.tsx';
import ForgotPassword from './components/forgotPassword.tsx';
import Users from './components/users.tsx';
import CreateProcess from './components/createProcess.tsx';
import CpResp from './components/cpResp.tsx';
import Record from './components/record.tsx';
import SeeOrganism from './components/seeOrganism.tsx';
import ConfigOrganism from './components/configOrganism.tsx';
import Evidence from './components/evidence.tsx';
import ConfigProcess from './components/configProcess.tsx';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/catalogos/usuarios" element={<Users/>}/>
          <Route path="/certificaciones/crear" element={<CreateProcess/>}/>
          <Route path="/certificaciones/asignar-responsables" element={<CpResp/>}/>
          <Route path="/certificaciones/historial" element={<Record/>}/>
          <Route path="/organismos/ver" element={<SeeOrganism/>}/>
          <Route path="/organismos/configurar" element={<ConfigOrganism/>}/>
          <Route path="/organismos/evidencias" element={<Evidence/>}/>
          <Route path="/certificaciones/configurar" element={<ConfigProcess/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
