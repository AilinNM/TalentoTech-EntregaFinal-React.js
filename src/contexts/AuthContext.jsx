import { createContext, useContext, useState, useEffect } from 'react';

const USUARIOS_FAKE = [
  { 
    id: 1, 
    usuario: 'admin', 
    contrasenia: '1234', 
    rol: 'admin',
    nombre: 'Administrador'
  },
  { 
    id: 2, 
    usuario: 'maria', 
    contrasenia: '1234', 
    rol: 'usuario',
    nombre: 'María López'
  }
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Auto-login al cargar la app (verificar localStorage)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Extraer nombre de usuario del token (fake-token-admin)
      const nombreUsuario = token.replace('fake-token-', '');
      const usuarioEncontrado = USUARIOS_FAKE.find(
        u => u.usuario === nombreUsuario
      );
      
      if (usuarioEncontrado) {
        setUsuario(usuarioEncontrado);
      } else {
        // Token inválido, limpiar
        localStorage.removeItem('authToken');
      }
    }
    
    setCargando(false);
  }, []);

  const login = (nombreUsuario, contrasenia) => {
    const usuarioLogin = USUARIOS_FAKE.find(
      u => u.usuario === nombreUsuario && u.contrasenia === contrasenia
    );

    if (usuarioLogin) {
      const token = `fake-token-${nombreUsuario}`;
      localStorage.setItem('authToken', token);
      setUsuario(usuarioLogin);
      return { exito: true, usuario: usuarioLogin };
    }
    
    return { exito: false, mensaje: 'Usuario o contraseña incorrectos' };
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('carrito'); // También limpiamos carrito
    setUsuario(null);
    
    // Redirigir a home después de logout
    if (window.location.pathname === '/admin' || window.location.pathname === '/carrito') {
      window.location.href = '/';
    }
  };

  // Verificar si el usuario es admin
  const esAdmin = usuario?.rol === 'admin';

  return (
    <AuthContext.Provider 
      value={{
        usuario,
        cargando,        
        login,
        logout,
        esAdmin,         
        estaAutenticado: !!usuario
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);