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
import CatOrganisms from './components/catOrganisms.tsx';
import CatAxles from './components/catAxles.tsx';
import CatCategories from './components/catCategories.tsx';
import CatIndicators from './components/catIndicators.tsx';
import CatStandars from './components/catStandars.tsx';
import CatCareers from './components/catCareers.tsx';
import CatDepartments from './components/catDepartments.tsx';


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
          <Route path="/catalogos/organismos" element={<CatOrganisms/>}/>
          <Route path="/catalogos/ejes" element={<CatAxles/>}/>
          <Route path="/catalogos/categorias" element={<CatCategories/>}/>
          <Route path="/catalogos/indicadores" element={<CatIndicators/>}/>
          <Route path="/catalogos/estandares" element={<CatStandars/>}/>
          <Route path="/catalogos/carreras" element={<CatCareers/>}/>
          <Route path="/catalogos/departamentos" element={<CatDepartments/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
