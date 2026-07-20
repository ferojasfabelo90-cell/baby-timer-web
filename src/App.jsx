import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import OlvidePassword from './pages/OlvidePassword';
import RestablecerPassword from './pages/RestablecerPassword';
import Bebes from './pages/Bebes';
import Bienvenida from './pages/Bienvenida';
import NuevoBebe from './pages/NuevoBebe';
import BebeDetalle from './pages/BebeDetalle';
import GestionTareas from './pages/GestionTareas';
import NuevaTarea from './pages/NuevaTarea';
import EditarTarea from './pages/EditarTarea';
import Bitacora from './pages/Bitacora';
import NuevoEvento from './pages/NuevoEvento';
import InvitarCuidador from './pages/InvitarCuidador';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-shell">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/olvide-password" element={<OlvidePassword />} />
            <Route path="/restablecer" element={<RestablecerPassword />} />
            <Route
              path="/bienvenida"
              element={
                <ProtectedRoute>
                  <Bienvenida />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bebes"
              element={
                <ProtectedRoute>
                  <Bebes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bebes/nuevo"
              element={
                <ProtectedRoute>
                  <NuevoBebe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bebes/:bebeId"
              element={
                <ProtectedRoute>
                  <BebeDetalle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bebes/:bebeId/tareas"
              element={
                <ProtectedRoute>
                  <GestionTareas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bebes/:bebeId/tareas/nueva"
              element={
                <ProtectedRoute>
                  <NuevaTarea />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bebes/:bebeId/tareas/:tareaId/editar"
              element={
                <ProtectedRoute>
                  <EditarTarea />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bebes/:bebeId/bitacora"
              element={
                <ProtectedRoute>
                  <Bitacora />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bebes/:bebeId/bitacora/nuevo"
              element={
                <ProtectedRoute>
                  <NuevoEvento />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bebes/:bebeId/invitar"
              element={
                <ProtectedRoute>
                  <InvitarCuidador />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/bebes" replace />} />
            <Route path="*" element={<Navigate to="/bebes" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
