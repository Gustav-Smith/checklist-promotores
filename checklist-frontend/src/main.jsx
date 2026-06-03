import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Visitas from './pages/Visitas';
import Checklist from './pages/Checklist';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/visitas" element={<Visitas />} />
          <Route path="/visitas/:visitaId/checklist" element={<Checklist />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);