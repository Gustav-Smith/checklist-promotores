import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RotaProtegida from './components/RotaProtegida';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Visitas from './pages/Visitas';
import Checklist from './pages/Checklist';
import Industrias from './pages/Industrias';
import Supermercados from './pages/Supermercados';
import Usuarios from './pages/Usuarios';
import NovaVisita from './pages/NovaVisita';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <RotaProtegida><Dashboard /></RotaProtegida>
          } />
          <Route path="/visitas" element={
            <RotaProtegida><Visitas /></RotaProtegida>
          } />
           <Route path="/visitas/nova" element={
            <RotaProtegida><NovaVisita /></RotaProtegida>
             } />
          <Route path="/visitas/:visitaId/checklist" element={
            <RotaProtegida><Checklist /></RotaProtegida>
          } />
          <Route path="/industrias" element={
            <RotaProtegida><Industrias /></RotaProtegida>
          } />
          <Route path="/supermercados" element={
            <RotaProtegida><Supermercados /></RotaProtegida>
          } />
          <Route path="/usuarios" element={
            <RotaProtegida><Usuarios /></RotaProtegida>
           } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);