import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getToken, saveToken, clearToken } from '../api/client';
import { login as loginRequest, register as registerRequest, getUsuarioActual } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  // Al montar la app, si hay un token guardado, intentamos recuperar
  // los datos del usuario para restaurar la sesión.
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setCargandoSesion(false);
      return;
    }
    getUsuarioActual()
      .then(setUsuario)
      .catch(() => clearToken())
      .finally(() => setCargandoSesion(false));
  }, []);

  const login = useCallback(async (credenciales) => {
    const { token } = await loginRequest(credenciales);
    saveToken(token);
    const usuarioActual = await getUsuarioActual();
    setUsuario(usuarioActual);
    return usuarioActual;
  }, []);

  const register = useCallback(async (datos) => {
    await registerRequest(datos);
    // El backend de registro no devuelve token: iniciamos sesión aparte.
    return login({ email: datos.email, password: datos.password });
  }, [login]);

  const logout = useCallback(() => {
    clearToken();
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, cargandoSesion, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  return ctx;
}
