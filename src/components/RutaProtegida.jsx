// components/RutaProtegida.jsx
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const RutaProtegida = ({ children, requireAdmin = false }) => {
  const { usuario, cargando, esAdmin } = useAuthContext();

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere ser admin pero no lo es, redirigir a inicio
  if (requireAdmin && !esAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutaProtegida;